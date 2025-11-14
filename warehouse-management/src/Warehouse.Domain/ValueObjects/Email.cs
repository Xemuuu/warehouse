namespace Warehouse.Domain.ValueObjects;

public sealed class Email : IEquatable<Email>
{
    public string Value { get; }

    private Email(string value)
    {
        Value = value;
    }

    public static Email Create(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            throw new ArgumentException("Email cannot be empty", nameof(email));

        if (!IsValidEmail(email))
            throw new ArgumentException("Invalid email format", nameof(email));

        return new Email(email.ToLowerInvariant().Trim());
    }

    private static bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }

    public bool Equals(Email? other) => 
        other is not null && Value == other.Value;

    public override bool Equals(object? obj) => 
        obj is Email email && Equals(email);

    public override int GetHashCode() => Value.GetHashCode();

    public override string ToString() => Value;

    public static implicit operator string(Email email) => email.Value;
}
