using EdlerCareApi.Models.Post;
using EdlerCareApi.Models.UserProfiles;
using Microsoft.EntityFrameworkCore;

namespace EdlerCareApi.Brokers
{
    public partial class StorageBroker
    {
        private static void SetUserPostReferences(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>().HasKey(Post => Post.Id);

            modelBuilder.Entity<Post>()
                .HasOne(Post => Post.CreatedByName).WithMany()
                .HasForeignKey(Post => Post.CreatedBy).OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Post>()
                .HasOne(Post => Post.UpdatedByName).WithMany()
                .HasForeignKey(Post => Post.UpdatedBy).OnDelete(DeleteBehavior.NoAction);
        }
    }
}
