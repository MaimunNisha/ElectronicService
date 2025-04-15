using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Electronic.Migrations
{
    /// <inheritdoc />
    public partial class ProductCategoryMsts_mg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductCategoryMsts",
                columns: table => new
                {
                    P_C_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    P_C_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    P_C_Status = table.Column<bool>(type: "bit", nullable: false),
                    P_C_Order = table.Column<int>(type: "int", nullable: false),
                    P_C_Entery_Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductCategoryMsts", x => x.P_C_Id);
                });

            migrationBuilder.CreateTable(
                name: "SubProductCategoryMsts",
                columns: table => new
                {
                    Sub_P_C_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Main_P_C_Id = table.Column<int>(type: "int", nullable: false),
                    Sub_P_C_Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sub_P_C_Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sub_P_C_Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sub_P_C_Oder = table.Column<int>(type: "int", nullable: false),
                    Sub_P_C_Status = table.Column<bool>(type: "bit", nullable: false),
                    Sub_P_C_Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubProductCategoryMsts", x => x.Sub_P_C_Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductCategoryMsts");

            migrationBuilder.DropTable(
                name: "SubProductCategoryMsts");
        }
    }
}
