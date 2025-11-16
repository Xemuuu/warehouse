using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Warehouse.Application.Common.Models;
using Warehouse.Application.Products.Common;
using Warehouse.Application.Products.Queries.GetProducts;
using Warehouse.Application.Products.Queries.GetProductById;
using Warehouse.Application.Products.Queries.GetProductInventory;

namespace Warehouse.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductsController : ControllerBase
{
    private readonly ISender _sender;

    public ProductsController(ISender sender)
    {
        _sender = sender;
    }

    /// <summary>
    /// Pobiera listę produktów z filtrowaniem i paginacją
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<PagedResult<ProductListItemDto>>> GetProducts(
        [FromQuery] string? search = null,
        [FromQuery] int? categoryId = null,
        [FromQuery] string? color = null,
        [FromQuery] decimal? minPrice = null,
        [FromQuery] decimal? maxPrice = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        [FromQuery] string orderBy = "name")
    {
        var query = new GetProductsQuery(
            search,
            categoryId,
            color,
            minPrice,
            maxPrice,
            page,
            pageSize,
            orderBy
        );

        var result = await _sender.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Pobiera szczegóły produktu wraz ze stanami w lokalizacjach
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDetailsDto>> GetProductById(int id)
    {
        var query = new GetProductByIdQuery(id);
        var result = await _sender.Send(query);
        return Ok(result);
    }

    /// <summary>
    /// Pobiera stany produktu we wszystkich lokalizacjach
    /// </summary>
    [HttpGet("{id}/inventory")]
    public async Task<ActionResult<IReadOnlyList<ProductInventoryDto>>> GetProductInventory(int id)
    {
        var query = new GetProductInventoryQuery(id);
        var result = await _sender.Send(query);
        return Ok(result);
    }
}
