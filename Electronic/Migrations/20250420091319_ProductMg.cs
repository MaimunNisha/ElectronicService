using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Electronic.Migrations
{
    /// <inheritdoc />
    public partial class ProductMg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductMsts",
                columns: table => new
                {
                    P_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    P_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    P_Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    P_IsApproved = table.Column<bool>(type: "bit", nullable: false),
                    P_CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductMsts", x => x.P_Id);
                    table.ForeignKey(
                        name: "FK_ProductMsts_ProductCategoryMsts_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "ProductCategoryMsts",
                        principalColumn: "C_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductMsts_CategoryId",
                table: "ProductMsts",
                column: "CategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductMsts");
        }
    }
}
