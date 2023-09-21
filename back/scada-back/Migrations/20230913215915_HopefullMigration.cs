using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace scada_back.Migrations
{
    /// <inheritdoc />
    public partial class HopefullMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Drivers");

            migrationBuilder.DropColumn(
                name: "address",
                table: "RealTimeUnits");

            migrationBuilder.DropColumn(
                name: "address",
                table: "DigitalOutputs");

            migrationBuilder.DropColumn(
                name: "address",
                table: "DigitalInputs");

            migrationBuilder.DropColumn(
                name: "driver",
                table: "DigitalInputs");

            migrationBuilder.DropColumn(
                name: "address",
                table: "AnalogOutputs");

            migrationBuilder.DropColumn(
                name: "address",
                table: "AnalogInputs");

            migrationBuilder.DropColumn(
                name: "driver",
                table: "AnalogInputs");

            migrationBuilder.RenameColumn(
                name: "low_limit",
                table: "RealTimeUnits",
                newName: "min_value");

            migrationBuilder.RenameColumn(
                name: "high_limit",
                table: "RealTimeUnits",
                newName: "max_value");

            migrationBuilder.RenameColumn(
                name: "function",
                table: "DigitalInputs",
                newName: "AddressId");

            migrationBuilder.RenameColumn(
                name: "function",
                table: "AnalogInputs",
                newName: "AddressId");

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "RealTimeUnits",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "generate_time",
                table: "RealTimeUnits",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "DigitalOutputs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AddressId",
                table: "AnalogOutputs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    driver = table.Column<int>(type: "int", nullable: false),
                    function = table.Column<int>(type: "int", nullable: true),
                    generate_time = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "AnalogOutputValues",
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
                    table.PrimaryKey("PK_AnalogOutputValues", x => x.id);
                    table.ForeignKey(
                        name: "FK_AnalogOutputValues_AnalogOutputs_TagId",
                        column: x => x.TagId,
                        principalTable: "AnalogOutputs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DigitalOutputValues",
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
                    table.PrimaryKey("PK_DigitalOutputValues", x => x.id);
                    table.ForeignKey(
                        name: "FK_DigitalOutputValues_DigitalOutputs_TagId",
                        column: x => x.TagId,
                        principalTable: "DigitalOutputs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RealTimeUnits_AddressId",
                table: "RealTimeUnits",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_DigitalOutputs_AddressId",
                table: "DigitalOutputs",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_DigitalInputs_AddressId",
                table: "DigitalInputs",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_AnalogOutputs_AddressId",
                table: "AnalogOutputs",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_AnalogInputs_AddressId",
                table: "AnalogInputs",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_AnalogOutputValues_TagId",
                table: "AnalogOutputValues",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_DigitalOutputValues_TagId",
                table: "DigitalOutputValues",
                column: "TagId");

            migrationBuilder.AddForeignKey(
                name: "FK_AnalogInputs_Addresses_AddressId",
                table: "AnalogInputs",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AnalogOutputs_Addresses_AddressId",
                table: "AnalogOutputs",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DigitalInputs_Addresses_AddressId",
                table: "DigitalInputs",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DigitalOutputs_Addresses_AddressId",
                table: "DigitalOutputs",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RealTimeUnits_Addresses_AddressId",
                table: "RealTimeUnits",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnalogInputs_Addresses_AddressId",
                table: "AnalogInputs");

            migrationBuilder.DropForeignKey(
                name: "FK_AnalogOutputs_Addresses_AddressId",
                table: "AnalogOutputs");

            migrationBuilder.DropForeignKey(
                name: "FK_DigitalInputs_Addresses_AddressId",
                table: "DigitalInputs");

            migrationBuilder.DropForeignKey(
                name: "FK_DigitalOutputs_Addresses_AddressId",
                table: "DigitalOutputs");

            migrationBuilder.DropForeignKey(
                name: "FK_RealTimeUnits_Addresses_AddressId",
                table: "RealTimeUnits");

            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "AnalogOutputValues");

            migrationBuilder.DropTable(
                name: "DigitalOutputValues");

            migrationBuilder.DropIndex(
                name: "IX_RealTimeUnits_AddressId",
                table: "RealTimeUnits");

            migrationBuilder.DropIndex(
                name: "IX_DigitalOutputs_AddressId",
                table: "DigitalOutputs");

            migrationBuilder.DropIndex(
                name: "IX_DigitalInputs_AddressId",
                table: "DigitalInputs");

            migrationBuilder.DropIndex(
                name: "IX_AnalogOutputs_AddressId",
                table: "AnalogOutputs");

            migrationBuilder.DropIndex(
                name: "IX_AnalogInputs_AddressId",
                table: "AnalogInputs");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "RealTimeUnits");

            migrationBuilder.DropColumn(
                name: "generate_time",
                table: "RealTimeUnits");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "DigitalOutputs");

            migrationBuilder.DropColumn(
                name: "AddressId",
                table: "AnalogOutputs");

            migrationBuilder.RenameColumn(
                name: "min_value",
                table: "RealTimeUnits",
                newName: "low_limit");

            migrationBuilder.RenameColumn(
                name: "max_value",
                table: "RealTimeUnits",
                newName: "high_limit");

            migrationBuilder.RenameColumn(
                name: "AddressId",
                table: "DigitalInputs",
                newName: "function");

            migrationBuilder.RenameColumn(
                name: "AddressId",
                table: "AnalogInputs",
                newName: "function");

            migrationBuilder.AddColumn<string>(
                name: "address",
                table: "RealTimeUnits",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "address",
                table: "DigitalOutputs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "address",
                table: "DigitalInputs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "driver",
                table: "DigitalInputs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "address",
                table: "AnalogOutputs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "address",
                table: "AnalogInputs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "driver",
                table: "AnalogInputs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Drivers",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drivers", x => x.id);
                });
        }
    }
}
