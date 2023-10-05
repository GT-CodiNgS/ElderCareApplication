using EdlerCareApi.Models.UserProfiles;
using Microsoft.EntityFrameworkCore;

namespace EdlerCareApi.Brokers
{
    public partial class StorageBroker : IStorageBroker
    {
        public DbSet<UserProfile> Users { get; set; }

        public IQueryable<UserProfile> SelectAllUserProfiles() => this.Users.AsQueryable();

        public async ValueTask<UserProfile> InsertUserProfileAsync(UserProfile User) =>
            await InsertAsync(User);

        public async ValueTask<UserProfile> SelectUserProfileByIdAsync(Guid UserId) =>
            await SelectAsync<UserProfile>(UserId);

        public async ValueTask<UserProfile> UpdateUserProfileAsync(UserProfile User) =>
            await UpdateAsync(User);
    }
}
