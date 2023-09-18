using scada_back.Context;
using Microsoft.EntityFrameworkCore;
using scada_back.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// @EVERYONE ovde dodajete servise
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<ITagService, TagService>();
builder.Services.AddTransient<IAlarmService, AlarmService>();
builder.Services.AddTransient<IRTUService, RTUService>();
builder.Services.AddTransient<ISystemService, SystemService>();
builder.Services.AddTransient<IStartService, StartService>();
builder.Services.AddTransient<IServiceProvider, ServiceProvider>();
builder.Services.AddTransient<ITrendingService, TrendingService>();

var configuration = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json")
    .Build();

var connectionString = builder.Configuration.GetConnectionString("Tim6ScadaConnection");
builder.Services.AddDbContext<ScadaDbContext>(x => x
    .UseSqlServer(connectionString)
    .EnableSensitiveDataLogging()); 
builder.Services.AddCors(feature =>
    feature.AddPolicy(
        "CorsPolicy",
        apiPolicy => apiPolicy
            //.AllowAnyOrigin()
            //.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .SetIsOriginAllowed(host => true)
            .AllowCredentials()
    )
);

//builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

//using var scope = app.Services.CreateScope();
//var userService = scope.ServiceProvider.GetRequiredService<IUserService>();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
//app.UseEndpoints(endpoints => endpoints.MapControllers());

app.UseRouting();
app.UseCors("CorsPolicy");

app.Run();
