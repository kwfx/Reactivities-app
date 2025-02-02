using Application.Activities;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            var connectionString = configuration.GetConnectionString("Default") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
            services.AddDbContext<DataContext>(
                opt => opt.UseMySql(connectionString, new MySqlServerVersion("8.0.35"))
            );
            services.AddCors(opts => opts.AddPolicy(
                    "CorsPolicy",
                    policy => policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:5208")
                )
            );
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(ListActivities.Handler).Assembly));
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            return services;
        }
    }
}