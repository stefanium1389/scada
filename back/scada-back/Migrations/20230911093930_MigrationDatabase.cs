using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace scada_back.Migrations
{
    /// <inheritdoc />
    public partial class MigrationDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActivatedAlarms",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AlarmId = table.Column<int>(type: "int", nullable: false),
                    TimeStamp = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivatedAlarms", x => x.id);
                    table.ForeignKey(
                        name: "FK_ActivatedAlarms_Alarms_AlarmId",
                        column: x => x.AlarmId,
                        principalTable: "Alarms",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AnalogInputValues",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TagId = table.Column<int>(type: "int", nullable: false),
                    TimeStamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Value = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnalogInputValues", x => x.id);
                    table.ForeignKey(
                        name: "FK_AnalogInputValues_AnalogInputs_TagId",
                        column: x => x.TagId,
                        principalTable: "AnalogInputs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DigitalInputValues",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TagId = table.Column<int>(type: "int", nullable: false),
                    TimeStamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Value = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DigitalInputValues", x => x.id);
                    table.ForeignKey(
                        name: "FK_DigitalInputValues_DigitalInputs_TagId",
                        column: x => x.TagId,
                        principalTable: "DigitalInputs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActivatedAlarms_AlarmId",
                table: "ActivatedAlarms",
                column: "AlarmId");

            migrationBuilder.CreateIndex(
                name: "IX_AnalogInputValues_TagId",
                table: "AnalogInputValues",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_DigitalInputValues_TagId",
                table: "DigitalInputValues",
                column: "TagId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivatedAlarms");

            migrationBuilder.DropTable(
                name: "AnalogInputValues");

            migrationBuilder.DropTable(
                name: "DigitalInputValues");
        }
    }
}
