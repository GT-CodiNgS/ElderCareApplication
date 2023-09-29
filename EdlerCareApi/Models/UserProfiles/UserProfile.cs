using System.ComponentModel.DataAnnotations.Schema;

namespace EdlerCareApi.Models.UserProfiles
{
    [Table("UserProfile", Schema = "public")]
    public class UserProfile : IAuditable
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Phone { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public bool IsDeleted { get; set; } = false;
        public bool IsVerfied { get; set; } = false;
        public string? Username { get; set; }
        public UserProfileRoleType RoleType { get; set; }
        public byte[]? PasswordHash { get; set; }
        public byte[]? PasswordSalt { get; set; }
        public string? RefreshToken { get; set; } = string.Empty;
        [NotMapped]
        public string? Token { get; set; } = string.Empty;
        public DateTime? TokenCreated { get; set; }
        public DateTime? TokenExpires { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public DateTimeOffset UpdatedDate { get; set; } = DateTimeOffset.UtcNow;
        public Guid CreatedBy { get; set; }
        public Guid UpdatedBy { get; set; }
    }
}
