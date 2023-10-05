using EdlerCareApi.Models.Post;

namespace EdlerCareApi.Brokers
{
    public partial interface IStorageBroker
    {
        ValueTask<Post> InsertPostAsync(Post post);
        ValueTask<Post> SelectPostByIdAsync(Guid postId);
        ValueTask<Post> UpdatePostAsync(Post post);
        IQueryable<Post> SelectAllPosts();
    }
}
