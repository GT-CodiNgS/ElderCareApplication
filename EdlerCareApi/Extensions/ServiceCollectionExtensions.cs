using EdlerCareApi.Brokers;
using EdlerCareApi.Services.Foundations.Posts;
using Microsoft.Extensions.Options;

namespace EdlerCareApi.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddConfiguredServiceDependancies(this IServiceCollection services)
        {
            services.AddTransient<IPostService, PostService>();

            return services;
        }

        public static IServiceCollection AddConfiguredBrokerDependancies(this IServiceCollection services)
        {
            services.AddTransient<IStorageBroker, StorageBroker>();

            return services;
        }

        public static IServiceCollection AddConfigureDbContexts(this IServiceCollection services)
        {
            services.AddDbContext<StorageBroker>();
            return services;
        }
    }
}
