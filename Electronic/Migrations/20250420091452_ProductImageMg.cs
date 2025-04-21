using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Electronic.Migrations
{
    /// <inheritdoc />
    public partial class ProductImageMg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductImageMsts",
                columns: table => new
                {
                    ImageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductImageMsts", x => x.ImageId);
                    table.ForeignKey(
                        name: "FK_ProductImageMsts_ProductMsts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "ProductMsts",
                        principalColumn: "P_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductImageMsts_ProductId",
                table: "ProductImageMsts",
                column: "ProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductImageMsts");
        }
    }
}
