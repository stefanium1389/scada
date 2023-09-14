using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace scada_back.Migrations
{
    /// <inheritdoc />
    public partial class DigitalMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "Value",
                table: "DigitalOutputValues",
                type: "bit",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<bool>(
                name: "initial_value",
                table: "DigitalOutputs",
                type: "bit",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "Value",
                table: "DigitalOutputValues",
                type: "float",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<double>(
                name: "initial_value",
                table: "DigitalOutputs",
                type: "float",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit");
        }
    }
}
