using MediatR;
using Warehouse.Application.Auth.Common;

namespace Warehouse.Application.Auth.Queries.GetMe;

public record GetMeQuery : IRequest<AuthResponse>;
