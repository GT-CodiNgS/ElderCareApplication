using EdlerCareApi.Brokers;
using EdlerCareApi.Models.UserProfiles;
using EdlerCareApi.Services.Foundations.Users;
using Moq;
using Tynamix.ObjectFiller;

namespace ElderCare.Test.Unit.Services.Foundations.UserProfiles
{
    public partial class UserProfilesServicesTest
    {
        private readonly Mock<IStorageBroker> storageBrokerMock;
        private readonly IUserProfileService userProfileService;

        public UserProfilesServicesTest()
        {
            this.storageBrokerMock = new Mock<IStorageBroker>();
            this.userProfileService = new UserProfileService(
                httpContextAccessor: null,
                storageBroker: this.storageBrokerMock.Object);
        }

        private static DateTimeOffset GetRandomDateTime() =>
            new DateTimeRange(earliestDate: new DateTime()).GetValue();

        private static UserProfile CreateRandomUserProfile() =>
            CreateUserProfileFiller(dateTime: GetRandomDateTime()).Create();

        private static IQueryable<UserProfile> CreateRandomUserProfiles() =>
            CreateRandomUserProfiles(count: GetRandomNumber());

        private static int GetRandomNumber() => new IntRange(min: 2, max: 10).GetValue();

        private static IQueryable<UserProfile> CreateRandomUserProfiles(int count) =>
            CreateUserProfileFiller(dateTime: GetRandomDateTime()).Create(count).AsQueryable();

        private static Filler<UserProfile> CreateUserProfileFiller(DateTimeOffset dateTime)
        {
            var filler = new Filler<UserProfile>();

            filler.Setup()
               .OnType<DateTimeOffset>().Use(dateTime);

            return filler;
        }
    }
}
