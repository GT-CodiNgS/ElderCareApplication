using EdlerCareApi.Brokers;
using EdlerCareApi.Models.UserProfiles;
using System.Security.Claims;

namespace EdlerCareApi.Services.Foundations.Users
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IStorageBroker storageBroker;
        private readonly IHttpContextAccessor httpContextAccessor;

        public UserProfileService(IStorageBroker storageBroker, IHttpContextAccessor httpContextAccessor)
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

        public async ValueTask<UserProfile> RemoveUserProfileAsync(Guid userProfileId)
        {
            try
            {
                UserProfile removedUser =
                    await this.storageBroker.SelectUserProfileByIdAsync(userProfileId);
                if (removedUser != null)
                {
                    removedUser.IsDeleted = true;
                }
                return await this.storageBroker.UpdateUserProfileAsync(removedUser);

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

        public async ValueTask<UserProfile> GetUserByToken(string token)
        {
            try
            {
                string userId = this.httpContextAccessor.HttpContext?
                    .User?.Claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                        ?.Value;

                //string userId = this.httpContextAccessor.HttpContext?
                //    .User?.Claims?.FirstOrDefault(c => c.Type ==
                //        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name")
                //        ?.Value;

                return await this.storageBroker.SelectUserProfileByIdAsync(new Guid(userId));
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
