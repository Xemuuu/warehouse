using MediatR;
using Microsoft.AspNetCore.Mvc;
using Warehouse.Application.Auth.Commands.Register;
using Warehouse.Application.Auth.Queries.Login;

namespace Warehouse.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ISender _sender;

    public AuthController(ISender sender)
    {
        _sender = sender;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var command = new RegisterCommand(request.Email, request.Password);
        var result = await _sender.Send(command);
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var query = new LoginQuery(request.Email, request.Password);
        var result = await _sender.Send(query);
        return Ok(result);
    }
}
