using EdlerCareApi.Brokers;
using EdlerCareApi.Models.Post;
using EdlerCareApi.Services.Foundations.Posts;
using Moq;
using Tynamix.ObjectFiller;

namespace ElderCare.Test.Unit.Services.Foundations.Posts
{
    public partial class PostServiceTest
    {
        private readonly Mock<IStorageBroker> storageBrokerMock;
        private readonly IPostService postService;

        public PostServiceTest()
        {
            this.storageBrokerMock = new Mock<IStorageBroker>();
            this.postService = new PostService(
                               storageBroker: this.storageBrokerMock.Object);
        }

        private static DateTimeOffset GetRandomDateTime() =>
            new DateTimeRange(earliestDate: new DateTime()).GetValue();

        private static Post CreateRandomPost() =>
            CreatePostFiller(dateTime: GetRandomDateTime()).Create();

        private static IQueryable<Post> CreateRandomPosts() =>
            CreateRandomPosts(count: GetRandomNumber());

        private static int GetRandomNumber() => new IntRange(min: 2, max: 10).GetValue();

        private static IQueryable<Post> CreateRandomPosts(int count) =>
            CreatePostFiller(dateTime: GetRandomDateTime()).Create(count).AsQueryable();

        private static Filler<Post> CreatePostFiller(DateTimeOffset dateTime)
        {
            var filler = new Filler<Post>();

            filler.Setup()
               .OnType<DateTimeOffset>().Use(dateTime);

            return filler;
        }
    }
}
