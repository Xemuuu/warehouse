namespace Warehouse.Domain.ValueObjects;

public sealed class Password
{
    public string Value { get; }

    private Password(string value)
    {
        Value = value;
    }

    public static Password Create(string password)
    {
        if (string.IsNullOrWhiteSpace(password))
            throw new ArgumentException("Password cannot be empty", nameof(password));

        if (password.Length < 8)
            throw new ArgumentException("Password must be at least 8 characters", nameof(password));

        if (!password.Any(char.IsUpper))
            throw new ArgumentException("Password must contain at least one uppercase letter", nameof(password));

        if (!password.Any(char.IsLower))
            throw new ArgumentException("Password must contain at least one lowercase letter", nameof(password));

        if (!password.Any(char.IsDigit))
            throw new ArgumentException("Password must contain at least one digit", nameof(password));

        return new Password(password);
    }

    public override string ToString() => new string('*', Value.Length);
}
