using EdlerCareApi.Models.UserProfiles;
using FluentAssertions;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElderCare.Test.Unit.Services.Foundations.UserProfiles
{
    public partial class UserProfilesServicesTest
    {
        [Fact]
        public void ShouldRetrieveAllUserProfiles()
        {
            // given
            IQueryable<UserProfile> randomUserProfiles = CreateRandomUserProfiles();
            IQueryable<UserProfile> storageUserProfiles = randomUserProfiles;
            IQueryable<UserProfile> expectedUserProfiles = storageUserProfiles;

            this.storageBrokerMock.Setup(broker =>
                                      broker.SelectAllUserProfiles())
                    .Returns(storageUserProfiles);

            // when
            IQueryable<UserProfile> actualUserProfiles =
                this.userProfileService.RetriveAllActiveUserProfiles();

            // then
            actualUserProfiles.Should().BeEquivalentTo(expectedUserProfiles);

            this.storageBrokerMock.Verify(broker =>
                broker.SelectAllUserProfiles(),
                    Times.Once);

            this.storageBrokerMock.VerifyNoOtherCalls();
        }
    }
}
