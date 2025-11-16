using FluentValidation;

namespace Warehouse.Application.Auth.Commands.Register;

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email jest wymagany")
            .EmailAddress().WithMessage("Niepoprawny format email");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Hasło jest wymagane")
            .MinimumLength(8).WithMessage("Hasło musi mieć minimum 8 znaków")
            .Matches("[A-Z]").WithMessage("Hasło musi zawierać wielką literę")
            .Matches("[a-z]").WithMessage("Hasło musi zawierać małą literę")
            .Matches("[0-9]").WithMessage("Hasło musi zawierać cyfrę");
    }
}
