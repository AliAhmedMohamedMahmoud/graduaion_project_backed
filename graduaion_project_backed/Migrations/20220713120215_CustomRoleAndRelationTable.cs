using Microsoft.EntityFrameworkCore.Migrations;

namespace graduaion_project_backed.Migrations
{
    public partial class CustomRoleAndRelationTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MyProperty",
                table: "AspNetRoles");

            migrationBuilder.CreateTable(
                name: "Controllers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Controllers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Premssions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Premssions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PremissionRoleControllers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    controllerId = table.Column<int>(type: "int", nullable: false),
                    Premission = table.Column<int>(type: "int", nullable: false),
                    CustomRoleId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PremissionRoleControllers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PremissionRoleControllers_AspNetRoles_CustomRoleId",
                        column: x => x.CustomRoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PremissionRoleControllers_Controllers_controllerId",
                        column: x => x.controllerId,
                        principalTable: "Controllers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PremissionRoleControllers_Premssions_Premission",
                        column: x => x.Premission,
                        principalTable: "Premssions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PremissionRoleControllers_controllerId",
                table: "PremissionRoleControllers",
                column: "controllerId");

            migrationBuilder.CreateIndex(
                name: "IX_PremissionRoleControllers_CustomRoleId",
                table: "PremissionRoleControllers",
                column: "CustomRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_PremissionRoleControllers_Premission",
                table: "PremissionRoleControllers",
                column: "Premission");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PremissionRoleControllers");

            migrationBuilder.DropTable(
                name: "Controllers");

            migrationBuilder.DropTable(
                name: "Premssions");

            migrationBuilder.AddColumn<string>(
                name: "MyProperty",
                table: "AspNetRoles",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
