using EdlerCareApi.Models.Post;
using FluentAssertions;
using Moq;

namespace ElderCare.Test.Unit.Services.Foundations.Posts
{
    public partial class PostServiceTest
    {
        [Fact]
        public void ShouldRetrieveAllPosts()
        {
            // given
            IQueryable<Post> randomPosts = CreateRandomPosts();
            IQueryable<Post> storagePosts = randomPosts;
            IQueryable<Post> expectedPosts = storagePosts;

            this.storageBrokerMock.Setup(broker =>
                           broker.SelectAllPosts())
                    .Returns(storagePosts);

            // when
            IQueryable<Post> actualPosts =
                this.postService.RetriveAllActivePosts();

            // then
            actualPosts.Should().BeEquivalentTo(expectedPosts);

            this.storageBrokerMock.Verify(broker =>
                           broker.SelectAllPosts(),
                                              Times.Once);

            this.storageBrokerMock.VerifyNoOtherCalls();
        }
    }
}
