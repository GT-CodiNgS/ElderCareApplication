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

        public async ValueTask<Post> RemovePostAsync(Guid postId)
        {
            try
            {
                Post removedPost = await this.storageBroker.SelectPostByIdAsync(postId);

                if (removedPost != null)
                {
                    removedPost.IsDeleted = true;
                }

                return await this.storageBroker.UpdatePostAsync(removedPost);
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
                return this.storageBroker.SelectAllPosts().Where(u => !u.IsDeleted);

            }
            catch (Exception)
            {

                throw;
            }
        }

        public IQueryable<Post> RetriveAllActivePostsByUserId(Guid userId)
        {
            try
            {
                return this.storageBroker.SelectAllPosts().Where(u => u.CreatedBy == userId);

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
