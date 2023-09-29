using System.ComponentModel.DataAnnotations.Schema;

namespace EdlerCareApi.Models
{
    [Table("User", Schema = "public")]
    public class User : IAuditable
    {
        public Guid Id { get; set; }
        public required string firstName { get; set; }
        public required string lastName { get; set; }
        public required string email { get; set; }
        public required string password { get; set; }
        public string? phone { get; set; }
        public string? address { get; set; }
        public string? city { get; set; }
        public bool isDeleted { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset UpdatedDate { get; set; }
        public Guid CreatedBy { get; set; }
        public Guid UpdatedBy { get; set; }
    }
}
