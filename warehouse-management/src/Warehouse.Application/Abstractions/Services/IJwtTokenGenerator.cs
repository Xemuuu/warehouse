namespace Warehouse.Application.Abstractions.Services;

public interface IJwtTokenGenerator
{
    string GenerateToken(Guid userId, string email, string role);
}
