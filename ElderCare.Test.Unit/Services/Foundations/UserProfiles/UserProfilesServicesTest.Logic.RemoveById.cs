using EdlerCareApi.Models.UserProfiles;
using FluentAssertions;
using Moq;

namespace ElderCare.Test.Unit.Services.Foundations.UserProfiles
{
    public partial class UserProfilesServicesTest
    {
        [Fact]
        public async Task ShouldRemoveUserProfileAsync()
        {
            // given
            UserProfile randomUserProfile = CreateRandomUserProfile();
            UserProfile inputUserProfile = randomUserProfile;
            UserProfile storageUserProfile = randomUserProfile;
            UserProfile expectedUserProfile = storageUserProfile;

            this.storageBrokerMock.Setup(broker =>
                                      broker.SelectUserProfileByIdAsync(randomUserProfile.Id))
                    .ReturnsAsync(storageUserProfile);

            this.storageBrokerMock.Setup(broker =>
                                                 broker.UpdateUserProfileAsync(inputUserProfile))
                    .ReturnsAsync(storageUserProfile);

            //when
            UserProfile actualUserProfile =
                await this.userProfileService.RemoveUserProfileAsync(inputUserProfile.Id);

            actualUserProfile.IsDeleted = true;

            //then
            actualUserProfile.Should().BeEquivalentTo(expectedUserProfile);

            actualUserProfile.IsDeleted = true;
            this.storageBrokerMock.Verify(broker =>
                           broker.SelectUserProfileByIdAsync(inputUserProfile.Id), Times.Once);
        }
    }
}
