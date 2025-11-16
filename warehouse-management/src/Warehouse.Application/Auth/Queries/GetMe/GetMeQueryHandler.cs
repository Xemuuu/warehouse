using MediatR;
using Microsoft.EntityFrameworkCore;
using Warehouse.Application.Abstractions.Persistence;
using Warehouse.Application.Auth.Common;
using Warehouse.Application.Common.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Warehouse.Application.Auth.Queries.GetMe;

public class GetMeQueryHandler : IRequestHandler<GetMeQuery, AuthResponse>
{
    private readonly IWarehouseDbContext _dbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public GetMeQueryHandler(
        IWarehouseDbContext dbContext,
        IHttpContextAccessor httpContextAccessor)
    {
        _dbContext = dbContext;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<AuthResponse> Handle(GetMeQuery request, CancellationToken cancellationToken)
    {
        // Pobierz userId z tokenu (claims)
        var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        
        if (userIdClaim == null || !Guid.TryParse(userIdClaim, out var userId))
            throw new UnauthorizedAccessException("Invalid token");

        // Pobierz użytkownika z bazy
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.UserId == userId && u.IsActive, cancellationToken);

        if (user == null)
            throw new UnauthorizedAccessException("User not found");

        // Pobierz dane pracownika
        var employeeInfo = await _dbContext.Database
            .SqlQueryRaw<EmployeeValidationResult>(
                "SELECT * FROM application.validate_employee_registration({0})", 
                user.Email.Value
            )
            .FirstOrDefaultAsync(cancellationToken);

        return new AuthResponse(
            user.UserId,
            user.Email,
            user.Role.ToString(),
            employeeInfo?.FirstName ?? "Unknown",
            employeeInfo?.LastName ?? "User",
            string.Empty // Nie zwracamy nowego tokenu
        );
    }
}
