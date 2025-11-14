namespace Warehouse.Application.Auth.Common;

public record AuthResponse(
    Guid UserId,
    string Email,
    string Role,
    string FirstName,
    string LastName,
    string Token  // ✅ Dodane - JWT token
);
