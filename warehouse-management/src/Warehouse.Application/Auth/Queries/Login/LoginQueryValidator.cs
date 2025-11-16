using FluentValidation;

namespace Warehouse.Application.Auth.Queries.Login;

public class LoginQueryValidator : AbstractValidator<LoginQuery>
{
    public LoginQueryValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email jest wymagany")
            .EmailAddress().WithMessage("Niepoprawny format email");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Hasło jest wymagane");
    }
}
