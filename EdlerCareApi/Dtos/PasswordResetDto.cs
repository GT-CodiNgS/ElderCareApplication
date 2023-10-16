namespace EdlerCareApi.Dtos
{
    public class PasswordResetDto
    {
        public string userId { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
