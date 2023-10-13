using EdlerCareApi.Models.Post;
using FluentAssertions;
using Moq;

namespace ElderCare.Test.Unit.Services.Foundations.Posts
{
    public partial class PostServiceTest
    {
        [Fact]
        public async void ShouludRemovePostAsync()
        {
            // given
            Post randomPost = CreateRandomPost();
            Post inputPost = randomPost;
            Post storagePost = randomPost;
            Post expectedPost = storagePost;

            this.storageBrokerMock.Setup(broker =>
                           broker.SelectPostByIdAsync(randomPost.Id))
                    .ReturnsAsync(storagePost);

            this.storageBrokerMock.Setup(broker =>
                                      broker.UpdatePostAsync(inputPost))
                    .ReturnsAsync(storagePost);

            //when
            Post actualPost =
                await this.postService.RemovePostAsync(inputPost.Id);

            //then
            actualPost.Should().BeEquivalentTo(expectedPost);

            actualPost.IsDeleted = true;
            this.storageBrokerMock.Verify(broker =>
                broker.SelectPostByIdAsync(inputPost.Id), Times.Once);
        }
    }
}
