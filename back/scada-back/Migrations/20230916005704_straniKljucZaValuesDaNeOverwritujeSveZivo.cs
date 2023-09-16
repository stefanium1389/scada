using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace scada_back.Migrations
{
    /// <inheritdoc />
    public partial class straniKljucZaValuesDaNeOverwritujeSveZivo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnalogInputValues_AnalogInputs_TagId",
                table: "AnalogInputValues");

            migrationBuilder.DropForeignKey(
                name: "FK_DigitalInputValues_DigitalInputs_TagId",
                table: "DigitalInputValues");

            migrationBuilder.RenameColumn(
                name: "TagId",
                table: "DigitalInputValues",
                newName: "digital_input_id");

            migrationBuilder.RenameIndex(
                name: "IX_DigitalInputValues_TagId",
                table: "DigitalInputValues",
                newName: "IX_DigitalInputValues_digital_input_id");

            migrationBuilder.RenameColumn(
                name: "TagId",
                table: "AnalogInputValues",
                newName: "analog_input_id");

            migrationBuilder.RenameIndex(
                name: "IX_AnalogInputValues_TagId",
                table: "AnalogInputValues",
                newName: "IX_AnalogInputValues_analog_input_id");

            migrationBuilder.AddForeignKey(
                name: "FK_AnalogInputValues_AnalogInputs_analog_input_id",
                table: "AnalogInputValues",
                column: "analog_input_id",
                principalTable: "AnalogInputs",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DigitalInputValues_DigitalInputs_digital_input_id",
                table: "DigitalInputValues",
                column: "digital_input_id",
                principalTable: "DigitalInputs",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnalogInputValues_AnalogInputs_analog_input_id",
                table: "AnalogInputValues");

            migrationBuilder.DropForeignKey(
                name: "FK_DigitalInputValues_DigitalInputs_digital_input_id",
                table: "DigitalInputValues");

            migrationBuilder.RenameColumn(
                name: "digital_input_id",
                table: "DigitalInputValues",
                newName: "TagId");

            migrationBuilder.RenameIndex(
                name: "IX_DigitalInputValues_digital_input_id",
                table: "DigitalInputValues",
                newName: "IX_DigitalInputValues_TagId");

            migrationBuilder.RenameColumn(
                name: "analog_input_id",
                table: "AnalogInputValues",
                newName: "TagId");

            migrationBuilder.RenameIndex(
                name: "IX_AnalogInputValues_analog_input_id",
                table: "AnalogInputValues",
                newName: "IX_AnalogInputValues_TagId");

            migrationBuilder.AddForeignKey(
                name: "FK_AnalogInputValues_AnalogInputs_TagId",
                table: "AnalogInputValues",
                column: "TagId",
                principalTable: "AnalogInputs",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DigitalInputValues_DigitalInputs_TagId",
                table: "DigitalInputValues",
                column: "TagId",
                principalTable: "DigitalInputs",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
