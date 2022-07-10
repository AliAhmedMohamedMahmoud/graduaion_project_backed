using Microsoft.EntityFrameworkCore.Migrations;

namespace graduaion_project_backed.Migrations
{
    public partial class addstateIdtocity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "stateId",
                table: "Cities",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Cities_stateId",
                table: "Cities",
                column: "stateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cities_States_stateId",
                table: "Cities",
                column: "stateId",
                principalTable: "States",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cities_States_stateId",
                table: "Cities");

            migrationBuilder.DropIndex(
                name: "IX_Cities_stateId",
                table: "Cities");

            migrationBuilder.DropColumn(
                name: "stateId",
                table: "Cities");
        }
    }
}
