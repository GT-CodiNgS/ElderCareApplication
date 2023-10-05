using EdlerCareApi.Brokers;
using EdlerCareApi.Models.UserProfiles;
using System.Security.Claims;

namespace EdlerCareApi.Services.Foundations.Users
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IStorageBroker storageBroker;
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserProfileService(IStorageBroker storageBroker)
        {
            this.storageBroker = storageBroker;
            this.httpContextAccessor = httpContextAccessor;
        }

        public async ValueTask<UserProfile> AddUserProfileAsync(UserProfile user)
        {
            try
            {
                return await this.storageBroker.InsertUserProfileAsync(user);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async ValueTask<UserProfile> ModifyUserProfileAsync(UserProfile user)
        {
            try
            {
                return await this.storageBroker.UpdateUserProfileAsync(user);

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async ValueTask<UserProfile> RemoveUserProfileAsync(UserProfile user)
        {
            try
            {
                return await this.storageBroker.UpdateUserProfileAsync(user);

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async ValueTask<UserProfile> RetrieveUserProfileByIdAsync(Guid userId)
        {
            try
            {
                return await this.storageBroker.SelectUserProfileByIdAsync(userId);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IQueryable<UserProfile> RetriveAllActiveUserProfiles()
        {
            try
            {
                return this.storageBroker.SelectAllUserProfiles();

            }
            catch (Exception)
            {

                throw;
            }
        }

        public string GetMyName()
        {
            var result = string.Empty;
            if (httpContextAccessor.HttpContext != null)
            {
                result = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
            }
            return result;
        }

    }
}
