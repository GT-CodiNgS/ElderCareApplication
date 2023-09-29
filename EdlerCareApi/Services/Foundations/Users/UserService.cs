using EdlerCareApi.Brokers;
using EdlerCareApi.Models;

namespace EdlerCareApi.Services.Foundations.Users
{
    public class UserService:IUserService
    {
        private readonly IStorageBroker storageBroker;

        public UserService(IStorageBroker storageBroker)
        {
            this.storageBroker = storageBroker;
        }

        public async ValueTask<User> AddUserAsync(User user)
        {
            try
            {
                return await this.storageBroker.InsertUserAsync(user);

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async ValueTask<User> ModifyUserAsync(User user)
        {
            try
            {
                return await this.storageBroker.UpdateUserAsync(user);

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async ValueTask<User> RemoveUserAsync(User user)
        {
            try
            {
                return await this.storageBroker.UpdateUserAsync(user);

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async ValueTask<User> RetrieveUserByIdAsync(Guid userId)
        {
            try
            {
                return await this.storageBroker.SelectUserByIdAsync(userId);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IQueryable<User> RetriveAllActiveUsers()
        {
            try
            {
                return this.storageBroker.SelectAllUsers();

            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
