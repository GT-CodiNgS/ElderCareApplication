using EdlerCareApi.Models.UserProfiles;
using FluentAssertions;
using Moq;

namespace ElderCare.Test.Unit.Services.Foundations.UserProfiles
{
    public partial class UserProfilesServicesTest
    {
        [Fact]
        public async Task ShouldAddUserProfileAsync()
        {
            // given
            UserProfile randomUserProfile = CreateRandomUserProfile();
            UserProfile inputUserProfile = randomUserProfile;
            UserProfile storageUserProfile = randomUserProfile;
            UserProfile expectedUserProfile = storageUserProfile;

            this.storageBrokerMock.Setup(broker =>
                                      broker.InsertUserProfileAsync(inputUserProfile))
                    .ReturnsAsync(storageUserProfile);

            // when
            UserProfile actualUserProfile =
                await this.userProfileService.AddUserProfileAsync(inputUserProfile);

            // then
            actualUserProfile.Should().BeEquivalentTo(expectedUserProfile);

            this.storageBrokerMock.Verify(broker =>
                broker.InsertUserProfileAsync(inputUserProfile),
                    Times.Once);

            this.storageBrokerMock.VerifyNoOtherCalls();
        }
    }
}
