namespace EdlerCareApi.Services.Foundations.Email
{
    public interface IEmailService
    {
        Task SendEmailAsync(string toName, string toAddress, string subject, string body);
    }
}
