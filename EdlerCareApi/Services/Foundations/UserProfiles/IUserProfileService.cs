using EdlerCareApi.Models.UserProfiles;

namespace EdlerCareApi.Services.Foundations.Users
{
    public interface IUserProfileService
    {
        ValueTask<UserProfile> AddUserProfileAsync(UserProfile user);
        ValueTask<UserProfile> RetrieveUserProfileByIdAsync(Guid userId);
        ValueTask<UserProfile> ModifyUserProfileAsync(UserProfile user);
        ValueTask<UserProfile> RemoveUserProfileAsync(Guid userProfileId);
        IQueryable<UserProfile> RetriveAllActiveUserProfiles();
        string GetMyName();
        ValueTask<UserProfile> GetLoggedUserId();
        ValueTask<UserProfile> ModifyUserProfileAfterEmailConfirmAsync(UserProfile userProfile);
    }
}
