using Npgsql;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/api/test", async () =>
{
    var connString = builder.Configuration.GetConnectionString("DefaultConnection");
    await using var conn = new NpgsqlConnection(connString);
    await conn.OpenAsync();

    await using var cmd = new NpgsqlCommand("SELECT name FROM production.product LIMIT 5;", conn);
    await using var reader = await cmd.ExecuteReaderAsync();

    var products = new List<string>();
    while (await reader.ReadAsync())
    {
        products.Add(reader.GetString(0));
    }

    return Results.Ok(products);
});

app.Run();
