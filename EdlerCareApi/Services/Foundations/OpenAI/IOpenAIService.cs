namespace EdlerCareApi.Services.Foundations.OpenAI
{
    public interface IOpenAIService
    {
        Task<string> GetOpenAIResult(string prompt);
    }
}
