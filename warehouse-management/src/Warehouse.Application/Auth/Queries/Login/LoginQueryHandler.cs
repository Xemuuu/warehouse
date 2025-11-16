using MediatR;
using Microsoft.EntityFrameworkCore;
using Warehouse.Application.Abstractions.Persistence;
using Warehouse.Application.Abstractions.Services;
using Warehouse.Application.Auth.Common;
using Warehouse.Application.Common.Models;
using Warehouse.Domain.ValueObjects;
using Warehouse.Domain.Exceptions;

namespace Warehouse.Application.Auth.Queries.Login;

public class LoginQueryHandler : IRequestHandler<LoginQuery, AuthResponse>
{
    private readonly IWarehouseDbContext _dbContext;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public LoginQueryHandler(
        IWarehouseDbContext dbContext,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthResponse> Handle(LoginQuery request, CancellationToken cancellationToken)
    {
        // 1. Walidacja emaila
        var email = Email.Create(request.Email);

        // 2. Pobierz użytkownika
        var user = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Email == email && u.IsActive, cancellationToken);

        if (user == null)
            throw new ValidationException("Email", "Niepoprawny email lub hasło");

        // 3. Weryfikacja hasła
        var isValidPassword = _passwordHasher.Verify(request.Password, user.PasswordHash);

        if (!isValidPassword)
            throw new ValidationException("Password", "Niepoprawny email lub hasło");

        // 4. Pobierz dane pracownika (imię, nazwisko)
        var employeeInfo = await _dbContext.Database
            .SqlQueryRaw<EmployeeValidationResult>(
                "SELECT * FROM application.validate_employee_registration({0})", 
                user.Email.Value
            )
            .FirstOrDefaultAsync(cancellationToken);

        // 5. Generowanie tokenu JWT
        var token = _jwtTokenGenerator.GenerateToken(
            user.UserId,
            user.Email,
            user.Role.ToString()
        );

        // 6. Zwrot odpowiedzi z tokenem
        return new AuthResponse(
            user.UserId,
            user.Email,
            user.Role.ToString(),
            employeeInfo?.FirstName ?? "Unknown",
            employeeInfo?.LastName ?? "User",
            token
        );
    }
}
