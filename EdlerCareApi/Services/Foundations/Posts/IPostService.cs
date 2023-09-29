using EdlerCareApi.Models.Post;

namespace EdlerCareApi.Services.Foundations.Posts
{
    public interface IPostService
    {
        ValueTask<Post> AddPostAsync(Post post);
        ValueTask<Post> RetrievePostByIdAsync(Guid postId);
        ValueTask<Post> ModifyPostAsync(Post post);
        ValueTask<Post> RemovePostAsync(Post post);
        IQueryable<Post> RetriveAllActivePosts();
    }
}
