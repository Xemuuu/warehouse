using Warehouse.Domain.Enums;
using Warehouse.Domain.ValueObjects;

namespace Warehouse.Domain.Aggregates;

public class User
{
    public Guid UserId { get; private set; }
    public int? EmployeeId { get; private set; }
    public Email Email { get; private set; } = null!; // ✅ Dodane null!
    public string PasswordHash { get; private set; } = null!; // ✅ Dodane null!
    public Role Role { get; private set; }
    public bool IsActive { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime UpdatedAt { get; private set; }

    // EF Core - null! mówi kompilatorowi "EF Core wypełni te wartości"
    private User() { }

    private User(
        Guid userId,
        int? employeeId,
        Email email,
        string passwordHash,
        Role role)
    {
        UserId = userId;
        EmployeeId = employeeId;
        Email = email;
        PasswordHash = passwordHash;
        Role = role;
        IsActive = true;
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow;
    }

    public static User Create(
        int? employeeId,
        Email email,
        string passwordHash,
        Role role)
    {
        return new User(
            Guid.NewGuid(),
            employeeId,
            email,
            passwordHash,
            role
        );
    }

    public void UpdatePassword(string newPasswordHash)
    {
        PasswordHash = newPasswordHash;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Deactivate()
    {
        IsActive = false;
        UpdatedAt = DateTime.UtcNow;
    }

    public void Activate()
    {
        IsActive = true;
        UpdatedAt = DateTime.UtcNow;
    }
}
