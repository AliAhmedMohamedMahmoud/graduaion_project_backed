using Microsoft.EntityFrameworkCore.Migrations;

namespace graduaion_project_backed.Migrations
{
    public partial class weight : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WeightSettings",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeafultWeight = table.Column<int>(type: "int", nullable: false),
                    DeafultCost = table.Column<int>(type: "int", nullable: false),
                    ExreaCost = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeightSettings", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WeightSettings");
        }
    }
}
