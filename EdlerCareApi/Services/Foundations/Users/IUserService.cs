using EdlerCareApi.Models;

namespace EdlerCareApi.Services.Foundations.Users
{
    public interface IUserService
    {
        ValueTask<User> AddUserAsync(User user);
        ValueTask<User> RetrieveUserByIdAsync(Guid userId);
        ValueTask<User> ModifyUserAsync(User user);
        ValueTask<User> RemoveUserAsync(User user);
        IQueryable<User> RetriveAllActiveUsers();
    }
}
