using EdlerCareApi.Models;
using EdlerCareApi.Services.Foundations.Users;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;

namespace EdlerCareApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : RESTFulController
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        public async ValueTask<ActionResult<User>> UserNewUserAsync(User User)
        {
            User addedUser = await this.userService.AddUserAsync(User);
            return Created(addedUser);
        }

        [HttpGet]
        public ActionResult<IQueryable<User>> GetAllUsers()
        {
            IQueryable<User> Users = this.userService.RetriveAllActiveUsers();
            return Ok(Users);
        }

        [HttpGet("{UserId}")]
        public async ValueTask<ActionResult<User>> GetUserByIdAsync(Guid UserId)
        {
            User User = await this.userService.RetrieveUserByIdAsync(UserId);
            return Ok(User);
        }

        [HttpPut("{UserId}")]
        public async ValueTask<ActionResult<User>> ModifyUserAsync(User User)
        {
            User modifiedUser = await this.userService.ModifyUserAsync(User);
            return Ok(modifiedUser);
        }

        [HttpDelete("{UserId}")]
        public async ValueTask<ActionResult<User>> ModifyUserToRemoveAsync(User User)
        {
            User removedUser = await this.userService.RemoveUserAsync(User);
            return Ok(removedUser);
        }
    }
}