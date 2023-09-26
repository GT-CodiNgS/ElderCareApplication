using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;

namespace EdlerCareApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : RESTFulController
    {
        [HttpGet]
        public string GetAllUsers()
        {
            return "Hello, Users Here!";
        }
    }
}