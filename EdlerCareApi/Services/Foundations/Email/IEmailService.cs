namespace EdlerCareApi.Services.Foundations.Email
{
    public interface IEmailService
    {
        ValueTask<bool> SendEmailAsync(string toName, string toAddress, string subject, string body);
    }
}
