using System.ComponentModel.DataAnnotations.Schema;

namespace Warehouse.Application.Common.Models;

public class EmployeeValidationResult
{
    [Column("employee_id")]
    public int EmployeeId { get; set; }
    
    [Column("suggested_role")]
    public string SuggestedRole { get; set; } = string.Empty;
    
    [Column("first_name")]
    public string FirstName { get; set; } = string.Empty;
    
    [Column("last_name")]
    public string LastName { get; set; } = string.Empty;
    
    [Column("job_title")]
    public string JobTitle { get; set; } = string.Empty;
}
