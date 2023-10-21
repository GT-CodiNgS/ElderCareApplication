using EdlerCareApi.Brokers;
using EdlerCareApi.Models.Post;
using EdlerCareApi.Models.Post.Exceptions;

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
                post.Id = new Guid();
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
                Post mayBePost = await this.storageBroker.SelectPostByIdAsync(post.Id);

                if (mayBePost == null)
                {
                    throw new PostNotFoundException();
                }

                post.CreatedDate = mayBePost.CreatedDate;
                post.CreatedBy = mayBePost.CreatedBy;
                post.UpdatedDate = DateTime.UtcNow;
                post.IsVerified = mayBePost.IsVerified;
                post.IsDeleted = mayBePost.IsDeleted;
                post.Status = mayBePost.Status;

                return await this.storageBroker.UpdatePostAsync(post);

            }
            catch (Exception)
            {

                throw;
            }
        }

        public async ValueTask<Post> VerifyPostAsync(Guid postId)
        {
            try
            {
                Post verfieddPost = await this.storageBroker.SelectPostByIdAsync(postId);

                if (verfieddPost != null)
                {
                    verfieddPost.IsVerified = true;
                }

                return await this.storageBroker.UpdatePostAsync(verfieddPost);
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
                return this.storageBroker.SelectAllPosts();

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
