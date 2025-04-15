using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Electronic.Migrations
{
    /// <inheritdoc />
    public partial class ProductCategoryMst_image_mg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "P_C_Image",
                table: "ProductCategoryMsts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "P_C_Image",
                table: "ProductCategoryMsts");
        }
    }
}
