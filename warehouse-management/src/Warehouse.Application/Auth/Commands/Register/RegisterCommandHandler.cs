using MediatR;
using Microsoft.EntityFrameworkCore;
using Warehouse.Application.Abstractions.Persistence;
using Warehouse.Application.Abstractions.Services;
using Warehouse.Application.Auth.Common;
using Warehouse.Application.Common.Models;
using Warehouse.Domain.Aggregates;
using Warehouse.Domain.Enums;
using Warehouse.Domain.ValueObjects;

namespace Warehouse.Application.Auth.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, AuthResponse>
{
    private readonly IWarehouseDbContext _dbContext;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public RegisterCommandHandler(
        IWarehouseDbContext dbContext,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _dbContext = dbContext;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        // 1. Walidacja emaila (Value Object)
        var email = Email.Create(request.Email);

        // 2. Sprawdź czy użytkownik już istnieje
        var existingUser = await _dbContext.Users
            .FirstOrDefaultAsync(u => u.Email == email, cancellationToken);

        if (existingUser != null)
            throw new InvalidOperationException("User with this email already exists");

        // 3. Wywołanie stored procedure - walidacja pracownika
        var employeeInfo = await _dbContext.Database
            .SqlQueryRaw<EmployeeValidationResult>(
                "SELECT * FROM application.validate_employee_registration({0})", 
                request.Email
            )
            .FirstOrDefaultAsync(cancellationToken);

        if (employeeInfo == null)
            throw new InvalidOperationException("Email not found in employee database. Only employees can register.");

        // 4. Walidacja hasła (Value Object)
        var password = Password.Create(request.Password);

        // 5. Hashowanie hasła
        var passwordHash = _passwordHasher.Hash(password.Value);

        // 6. Parsowanie roli z procedury
        var role = Enum.Parse<Role>(employeeInfo.SuggestedRole);

        // 7. Utworzenie użytkownika
        var user = User.Create(
            employeeInfo.EmployeeId,
            email,
            passwordHash,
            role
        );

        // 8. Zapis do bazy
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync(cancellationToken);

        // 9. Generowanie tokenu JWT
        var token = _jwtTokenGenerator.GenerateToken(
            user.UserId,
            user.Email,
            user.Role.ToString()
        );

        // 10. Zwrot odpowiedzi z tokenem
        return new AuthResponse(
            user.UserId,
            user.Email,
            user.Role.ToString(),
            employeeInfo.FirstName,
            employeeInfo.LastName,
            token
        );
    }
}
