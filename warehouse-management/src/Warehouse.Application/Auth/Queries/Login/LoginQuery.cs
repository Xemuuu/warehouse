using MediatR;
using Warehouse.Application.Auth.Common;

namespace Warehouse.Application.Auth.Queries.Login;

public record LoginQuery(
    string Email,
    string Password
) : IRequest<AuthResponse>;
