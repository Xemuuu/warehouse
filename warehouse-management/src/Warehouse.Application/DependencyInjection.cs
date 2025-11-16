using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Warehouse.Application.Common.Behaviors;

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
            
            // ✅ Rejestracja ValidationBehavior
            config.AddOpenBehavior(typeof(ValidationBehavior<,>));
        });
        
        // FluentValidation
        services.AddValidatorsFromAssembly(assembly);
        
        return services;
    }
}
