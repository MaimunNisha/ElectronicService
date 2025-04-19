using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Electronic.Migrations
{
    /// <inheritdoc />
    public partial class ProductCategory_mg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductCategoryMsts",
                columns: table => new
                {
                    C_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    C_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    C_IsApproved = table.Column<bool>(type: "bit", nullable: false),
                    C_Order = table.Column<int>(type: "int", nullable: false),
                    C_Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    C_CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ParentCategoryId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductCategoryMsts", x => x.C_Id);
                    table.ForeignKey(
                        name: "FK_ProductCategoryMsts_ProductCategoryMsts_ParentCategoryId",
                        column: x => x.ParentCategoryId,
                        principalTable: "ProductCategoryMsts",
                        principalColumn: "C_Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductCategoryMsts_ParentCategoryId",
                table: "ProductCategoryMsts",
                column: "ParentCategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductCategoryMsts");
        }
    }
}
