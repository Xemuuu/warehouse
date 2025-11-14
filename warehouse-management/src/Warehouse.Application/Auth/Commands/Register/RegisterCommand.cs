using MediatR;
using Warehouse.Application.Auth.Common;

namespace Warehouse.Application.Auth.Commands.Register;

public record RegisterCommand(
    string Email,
    string Password
) : IRequest<AuthResponse>;
