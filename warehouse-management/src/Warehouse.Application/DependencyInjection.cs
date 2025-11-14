using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Warehouse.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        var assembly = typeof(DependencyInjection).Assembly;
        
        // MediatR
        services.AddMediatR(config =>
        {
            config.RegisterServicesFromAssembly(assembly);
        });
        
        // FluentValidation
        services.AddValidatorsFromAssembly(assembly);
        
        return services;
    }
}
