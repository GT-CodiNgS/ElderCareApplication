using EdlerCareApi.Brokers;
using EdlerCareApi.Dtos.User.Exceptions;
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

        public async ValueTask<UserProfile> ModifyUserProfileAsync(UserProfile userProfile)
        {
            try
            {
                UserProfile mayBeUserProfile =
                await this.storageBroker.SelectUserProfileByIdAsync(userProfile.Id);
                if (mayBeUserProfile == null)
                {
                    throw new UserNotFoundException();
                }
                userProfile.CreatedDate = mayBeUserProfile.CreatedDate;
                userProfile.CreatedBy = mayBeUserProfile.CreatedBy;
                userProfile.UpdatedDate = DateTime.UtcNow;
                userProfile.IsDeleted = false;
                userProfile.IsVerfied = mayBeUserProfile.IsVerfied;
                return await this.storageBroker.UpdateUserProfileAsync(userProfile);
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

        public async ValueTask<UserProfile> GetLoggedUserId()
        {
            try
            {
                Guid userId = this.storageBroker.GetLoggedUserId();
                if (userId == Guid.Empty)
                {
                    throw new UserNotFoundException();
                }

                return await this.storageBroker.SelectUserProfileByIdAsync(userId);
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
