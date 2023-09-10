using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace scada_back.Migrations
{
    /// <inheritdoc />
    public partial class Migrationn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Alarms_AnalogInputs_TagIdId",
                table: "Alarms");

            migrationBuilder.RenameColumn(
                name: "TagIdId",
                table: "Alarms",
                newName: "TagId");

            migrationBuilder.RenameIndex(
                name: "IX_Alarms_TagIdId",
                table: "Alarms",
                newName: "IX_Alarms_TagId");

            migrationBuilder.AddForeignKey(
                name: "FK_Alarms_AnalogInputs_TagId",
                table: "Alarms",
                column: "TagId",
                principalTable: "AnalogInputs",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Alarms_AnalogInputs_TagId",
                table: "Alarms");

            migrationBuilder.RenameColumn(
                name: "TagId",
                table: "Alarms",
                newName: "TagIdId");

            migrationBuilder.RenameIndex(
                name: "IX_Alarms_TagId",
                table: "Alarms",
                newName: "IX_Alarms_TagIdId");

            migrationBuilder.AddForeignKey(
                name: "FK_Alarms_AnalogInputs_TagIdId",
                table: "Alarms",
                column: "TagIdId",
                principalTable: "AnalogInputs",
                principalColumn: "id");
        }
    }
}
