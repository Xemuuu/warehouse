using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Warehouse.Domain.Aggregates;
using Warehouse.Domain.Enums;
using Warehouse.Domain.ValueObjects;

namespace Warehouse.Infrastructure.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("users", "application");
        
        builder.HasKey(u => u.UserId);
        
        builder.Property(u => u.UserId)
            .HasColumnName("user_id")
            .ValueGeneratedOnAdd();
        
        builder.Property(u => u.EmployeeId)
            .HasColumnName("employee_id")
            .IsRequired(false);
        
        // Value Object Email - konwersja
        builder.Property(u => u.Email)
            .HasColumnName("email")
            .HasMaxLength(255)
            .HasConversion(
                email => email.Value,  // C# → SQL
                value => Email.Create(value)  // SQL → C#
            )
            .IsRequired();
        
        builder.Property(u => u.PasswordHash)
            .HasColumnName("password_hash")
            .HasMaxLength(255)
            .IsRequired();
        
        // Enum Role - konwersja do stringa
        builder.Property(u => u.Role)
            .HasColumnName("role")
            .HasMaxLength(50)
            .HasConversion(
                role => role.ToString(),  // C# → SQL
                value => Enum.Parse<Role>(value)  // SQL → C#
            )
            .IsRequired();
        
        builder.Property(u => u.IsActive)
            .HasColumnName("is_active")
            .HasDefaultValue(true)
            .IsRequired();
        
        builder.Property(u => u.CreatedAt)
            .HasColumnName("created_at")
            .HasDefaultValueSql("CURRENT_TIMESTAMP")
            .IsRequired();
        
        builder.Property(u => u.UpdatedAt)
            .HasColumnName("updated_at")
            .HasDefaultValueSql("CURRENT_TIMESTAMP")
            .IsRequired();
        
        // Indeksy
        builder.HasIndex(u => u.Email)
            .IsUnique()
            .HasDatabaseName("idx_users_email");
        
        builder.HasIndex(u => u.EmployeeId)
            .IsUnique()
            .HasDatabaseName("idx_users_employee_id");
    }
}
