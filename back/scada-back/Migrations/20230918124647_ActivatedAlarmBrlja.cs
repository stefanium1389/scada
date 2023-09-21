using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace scada_back.Migrations
{
    /// <inheritdoc />
    public partial class ActivatedAlarmBrlja : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateIndex(
                name: "IX_ActivatedAlarms_alarm_id",
                table: "ActivatedAlarms",
                column: "alarm_id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivatedAlarms_Alarms_alarm_id",
                table: "ActivatedAlarms",
                column: "alarm_id",
                principalTable: "Alarms",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivatedAlarms_Alarms_alarm_id",
                table: "ActivatedAlarms");

            migrationBuilder.DropIndex(
                name: "IX_ActivatedAlarms_alarm_id",
                table: "ActivatedAlarms");

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
    }
}
