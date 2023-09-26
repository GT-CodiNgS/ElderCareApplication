using EdlerCareApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EdlerCareApi.Brokers
{
    public partial class StorageBroker
    {
        public DbSet<Post> Posts { get; set; }

        public IQueryable<Post> SelectAllPosts() => this.Posts.AsQueryable();

        public async ValueTask<Post> InsertPostAsync(Post post)=>
            await InsertAsync(post);

        public async ValueTask<Post> SelectPostByIdAsync(Guid postId) =>
            await SelectAsync<Post>(postId);

        public async ValueTask<Post> UpdatePostAsync(Post post) =>
            await UpdateAsync(post);
    }
}
