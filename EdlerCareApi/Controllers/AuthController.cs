using EdlerCareApi.Dtos.User;
using EdlerCareApi.Models.RefreshToken;
using EdlerCareApi.Models.UserProfiles;
using EdlerCareApi.Services.Foundations.Auth;
using EdlerCareApi.Services.Foundations.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RESTFulSense.Controllers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace EdlerCareApi.Controllers
{
    public class AuthController : RESTFulController
    {
        public static UserProfile user = new UserProfile();
        private readonly IConfiguration configuration;
        private readonly IUserProfileService userService;
        private readonly IAuthService authService;

        public AuthController(
            IConfiguration configuration,
            IUserProfileService userService,
            IAuthService authService)
        {
            this.configuration = configuration;
            this.userService = userService;
            this.authService = authService;
        }

        [HttpGet, Authorize]
        public ActionResult<string> GetMe()
        {
            var userName = userService.GetMyName();
            return Ok(userName);
        }

        [HttpPost("register")]
        public async ValueTask<ActionResult<UserProfile>> RegisterUserAsync([FromBody] UserProfile userProfile)
        {
            try
            {
                ValueTask<UserProfile> registeredUser =
                 this.authService.RegisterUserAsync(userProfile);
                var refreshToken = GenerateRefreshToken();
                SetRefreshToken(refreshToken);

                return Created("User registered", registeredUser);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        [HttpPost("login"),AllowAnonymous]
        public async ValueTask<ActionResult<string>> Login([FromBody] UserDto userProfile)
        {
            try
            {
                UserProfile mayBeUserProfile = this.authService.LoginUserAsync(userProfile);
                var refreshToken = GenerateRefreshToken();
                SetRefreshToken(refreshToken);

                return Ok(mayBeUserProfile);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        //[HttpPost("refresh-token")]
        //public async ValueTask<ActionResult<string>> RefreshToken()
        //{
        //    var refreshToken = Request.Cookies["refreshToken"];

        //    if (!user.RefreshToken.Equals(refreshToken))
        //    {
        //        return Unauthorized("Invalid Refresh Token.");
        //    }
        //    else if (user.TokenExpires < DateTime.Now)
        //    {
        //        return Unauthorized("Token expired.");
        //    }

        //    string token = CreateToken(user);
        //    var newRefreshToken = GenerateRefreshToken();
        //    SetRefreshToken(newRefreshToken);

        //    return Ok(token);
        //}

        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };

            return refreshToken;
        }

        private void SetRefreshToken(RefreshToken newRefreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);
        }
    }
}