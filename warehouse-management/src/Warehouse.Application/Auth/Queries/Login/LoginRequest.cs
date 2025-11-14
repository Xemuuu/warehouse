namespace Warehouse.Application.Auth.Queries.Login;

public record LoginRequest(
    string Email,
    string Password
);
