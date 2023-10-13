using EdlerCareApi.Brokers;
using EdlerCareApi.Services.Foundations.Auth;
using EdlerCareApi.Services.Foundations.Posts;
using EdlerCareApi.Services.Foundations.Users;

namespace EdlerCareApi.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddConfiguredServiceDependancies(this IServiceCollection services)
        {
            services.AddTransient<IPostService, PostService>();
            services.AddTransient<IUserProfileService, UserProfileService>();
            services.AddTransient<IAuthService, AuthService>();

            return services;
        }

        public static IServiceCollection AddConfiguredBrokerDependancies(this IServiceCollection services)
        {
            services.AddTransient<IStorageBroker, StorageBroker>();
            services.AddTransient<IUserProfileService, UserProfileService>();
            return services;
        }

        public static IServiceCollection AddConfigureDbContexts(this IServiceCollection services)
        {
            services.AddDbContext<StorageBroker>();
            return services;
        }
    }
}
