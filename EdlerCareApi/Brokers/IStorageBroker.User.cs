using EdlerCareApi.Models;

namespace EdlerCareApi.Brokers
{
    public partial interface IStorageBroker
    {
        ValueTask<User> InsertUserAsync(User user);
        ValueTask<User> SelectUserByIdAsync(Guid UserId);
        ValueTask<User> UpdateUserAsync(User User);
        IQueryable<User> SelectAllUsers();
    }
}
