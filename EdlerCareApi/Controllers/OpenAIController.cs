using EdlerCareApi.Services.Foundations.OpenAI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;

namespace EdlerCareApi.Controllers
{
    [Route("api/[controller]"), AllowAnonymous]
    [ApiController]
    public class OpenAIController : RESTFulController
    {
        private readonly IOpenAIService openAIService;

        public OpenAIController(IOpenAIService openAIService)
        {
            this.openAIService = openAIService;
        }

        [HttpGet]
        public async Task<IActionResult> GetOpenAIResult(string prompt)
        {
            var result = await this.openAIService.GetOpenAIResult(prompt);
            return Ok(result);
        }
    }
}
