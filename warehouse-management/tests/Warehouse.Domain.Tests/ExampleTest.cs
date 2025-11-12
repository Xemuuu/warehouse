using FluentAssertions;
using Xunit;

namespace Warehouse.Domain.Tests;

public class ExampleTest
{
    [Fact]
    public void Example_Should_Pass()
    {
        // Arrange
        var expected = true;

        // Act
        var actual = true;

        // Assert
        actual.Should().Be(expected);
    }
}
