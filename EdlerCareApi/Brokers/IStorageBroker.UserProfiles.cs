using EdlerCareApi.Models.UserProfiles;

namespace EdlerCareApi.Brokers
{
    public partial interface IStorageBroker
    {
        ValueTask<UserProfile> InsertUserProfileAsync(UserProfile user);
        ValueTask<UserProfile> SelectUserProfileByIdAsync(Guid UserId);
        ValueTask<UserProfile> UpdateUserProfileAsync(UserProfile User);
        IQueryable<UserProfile> SelectAllUserProfiles();
    }
}
