using EdlerCareApi.Models.UserProfiles;

namespace EdlerCareApi.Services.Foundations.Users
{
    public interface IUserProfileService
    {
        ValueTask<UserProfile> AddUserProfileAsync(UserProfile user);
        ValueTask<UserProfile> RetrieveUserProfileByIdAsync(Guid userId);
        ValueTask<UserProfile> ModifyUserProfileAsync(UserProfile user);
        ValueTask<UserProfile> RemoveUserProfileAsync(UserProfile user);
        IQueryable<UserProfile> RetriveAllActiveUserProfiles();
        string GetMyName();
    }
}
