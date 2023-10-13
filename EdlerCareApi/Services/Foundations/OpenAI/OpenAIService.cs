
namespace EdlerCareApi.Services.Foundations.OpenAI
{
    public class OpenAIService : IOpenAIService
    {
        private readonly IConfiguration configuration;

        public OpenAIService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<string> GetOpenAIResult(string prompt)
        {
            var api = new OpenAI_API.OpenAIAPI(this.configuration["OpenAI:API_KEY"]);
            var result = await api.Completions.GetCompletion(prompt);
            return result;
        }
    }
}
