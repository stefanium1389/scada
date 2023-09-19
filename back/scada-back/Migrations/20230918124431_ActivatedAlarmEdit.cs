using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace scada_back.Migrations
{
    /// <inheritdoc />
    public partial class ActivatedAlarmEdit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivatedAlarms_Alarms_AlarmId",
                table: "ActivatedAlarms");

            migrationBuilder.DropIndex(
                name: "IX_ActivatedAlarms_AlarmId",
                table: "ActivatedAlarms");

            migrationBuilder.RenameColumn(
                name: "AlarmId",
                table: "ActivatedAlarms",
                newName: "alarm_id");

            migrationBuilder.AddColumn<int>(
                name: "AnalogInputId",
                table: "ActivatedAlarms",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ActivatedAlarms_AnalogInputId",
                table: "ActivatedAlarms",
                column: "AnalogInputId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivatedAlarms_Alarms_AnalogInputId",
                table: "ActivatedAlarms",
                column: "AnalogInputId",
                principalTable: "Alarms",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivatedAlarms_Alarms_AnalogInputId",
                table: "ActivatedAlarms");

            migrationBuilder.DropIndex(
                name: "IX_ActivatedAlarms_AnalogInputId",
                table: "ActivatedAlarms");

            migrationBuilder.DropColumn(
                name: "AnalogInputId",
                table: "ActivatedAlarms");

            migrationBuilder.RenameColumn(
                name: "alarm_id",
                table: "ActivatedAlarms",
                newName: "AlarmId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivatedAlarms_AlarmId",
                table: "ActivatedAlarms",
                column: "AlarmId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivatedAlarms_Alarms_AlarmId",
                table: "ActivatedAlarms",
                column: "AlarmId",
                principalTable: "Alarms",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
