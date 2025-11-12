using Npgsql;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("Frontend");

app.MapGet("/api/test", async () =>
{
    var connString = builder.Configuration.GetConnectionString("DefaultConnection");
    await using var conn = new NpgsqlConnection(connString);
    await conn.OpenAsync();

    await using var cmd = new NpgsqlCommand("SELECT name FROM production.product LIMIT 10;", conn);
    await using var reader = await cmd.ExecuteReaderAsync();

    var products = new List<string>();
    while (await reader.ReadAsync())
    {
        products.Add(reader.GetString(0));
    }

    return Results.Ok(products);
});

app.Run();
