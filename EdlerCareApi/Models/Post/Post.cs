using System.ComponentModel.DataAnnotations.Schema;

namespace EdlerCareApi.Models.Post
{
    [Table("Posts", Schema = "public")]
    public class Post : IAuditable
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset UpdatedDate { get; set; }
        public Guid CreatedBy { get; set; }
        public Guid UpdatedBy { get; set; }
    }
}
