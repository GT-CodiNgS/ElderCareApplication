using EdlerCareApi.Models.UserProfiles;
using EdlerCareApi.Services.Foundations.Users;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;

namespace EdlerCareApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserProfileController : RESTFulController
    {
        private readonly IUserProfileService userService;

        public UserProfileController(IUserProfileService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        public async ValueTask<ActionResult<UserProfile>> PostUserProfileAsync(UserProfile User)
        {
            UserProfile addedUser = await this.userService.AddUserProfileAsync(User);
            return Created(addedUser);
        }

        [HttpGet]
        public ActionResult<IQueryable<UserProfile>> GetAllUserProfiles()
        {
            IQueryable<UserProfile> Users = this.userService.RetriveAllActiveUserProfiles();
            return Ok(Users);
        }

        [HttpGet("{UserId}")]
        public async ValueTask<ActionResult<UserProfile>> GetUserProfileByIdAsync(Guid UserId)
        {
            UserProfile User = await this.userService.RetrieveUserProfileByIdAsync(UserId);
            return Ok(User);
        }

        [HttpPut("{UserId}")]
        public async ValueTask<ActionResult<UserProfile>> ModifyUserProfileAsync(UserProfile User)
        {
            UserProfile modifiedUser = await this.userService.ModifyUserProfileAsync(User);
            return Ok(modifiedUser);
        }

        [HttpDelete("{userProfileId}")]
        public async ValueTask<ActionResult<UserProfile>> ModifyUserProfileToRemoveAsync(Guid userProfileId)
        {
            UserProfile removedUser = await this.userService.RemoveUserProfileAsync(userProfileId);
            return Ok(removedUser);
        }
    }
}