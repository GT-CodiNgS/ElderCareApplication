using EdlerCareApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EdlerCareApi.Brokers
{
    public partial class StorageBroker:IStorageBroker
    {
        public DbSet<User> Users { get; set; }

        public IQueryable<User> SelectAllUsers() => this.Users.AsQueryable();

        public async ValueTask<User> InsertUserAsync(User User) =>
            await InsertAsync(User);

        public async ValueTask<User> SelectUserByIdAsync(Guid UserId) =>
            await SelectAsync<User>(UserId);

        public async ValueTask<User> UpdateUserAsync(User User) =>
            await UpdateAsync(User);
    }
}
