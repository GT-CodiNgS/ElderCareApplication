using EdlerCareApi.Brokers;
using EdlerCareApi.Models.Post;

namespace EdlerCareApi.Services.Foundations.Posts
{
    public class PostService : IPostService
    {
        private readonly IStorageBroker storageBroker;

        public PostService(IStorageBroker storageBroker)
        {
            this.storageBroker = storageBroker;
        }

        public async ValueTask<Post> AddPostAsync(Post post)
        {
            try
            {
                return await this.storageBroker.InsertPostAsync(post);

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async ValueTask<Post> ModifyPostAsync(Post post)
        {
            try
            {
                return await this.storageBroker.UpdatePostAsync(post);

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async ValueTask<Post> RemovePostAsync(Post post)
        {
            try
            {
                return await this.storageBroker.UpdatePostAsync(post);

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async ValueTask<Post> RetrievePostByIdAsync(Guid postId)
        {
            try
            {
                return await this.storageBroker.SelectPostByIdAsync(postId);    
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IQueryable<Post> RetriveAllActivePosts()
        {
            try
            {
                return this.storageBroker.SelectAllPosts();

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
