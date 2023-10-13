using EdlerCareApi.Models.UserProfiles;
using FluentAssertions;
using Moq;

namespace ElderCare.Test.Unit.Services.Foundations.UserProfiles
{
    public partial class UserProfilesServicesTest
    {
        [Fact]
        public async Task ShouldEditUserProfileAsync()
        {
            // given
            UserProfile randomUserProfile = CreateRandomUserProfile();
            UserProfile inputUserProfile = randomUserProfile;
            UserProfile storageUserProfile = randomUserProfile;
            UserProfile expectedUserProfile = storageUserProfile;

            this.storageBrokerMock.Setup(broker =>
                           broker.UpdateUserProfileAsync(inputUserProfile))
                    .ReturnsAsync(storageUserProfile);

            // when
            UserProfile actualUserProfile =
                await this.userProfileService.ModifyUserProfileAsync(inputUserProfile);

            // then
            actualUserProfile.Should().BeEquivalentTo(expectedUserProfile);

            this.storageBrokerMock.Verify(broker =>
                           broker.UpdateUserProfileAsync(inputUserProfile),
                                               Times.Once);

            this.storageBrokerMock.VerifyNoOtherCalls();
        }
        
    }
}
