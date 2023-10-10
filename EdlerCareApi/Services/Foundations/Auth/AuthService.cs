using EdlerCareApi.Dtos.User;
using EdlerCareApi.Dtos.User.Exceptions;
using EdlerCareApi.Models.RefreshToken;
using EdlerCareApi.Models.UserProfiles;
using EdlerCareApi.Services.Foundations.Users;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace EdlerCareApi.Services.Foundations.Auth
{

    public class AuthService : IAuthService
    {
        private readonly IUserProfileService userProfileService;
        private readonly IConfiguration configuration;

        public AuthService(IUserProfileService userProfileService, IConfiguration configuration)
        {
            this.userProfileService = userProfileService;
            this.configuration = configuration;
        }

        public UserProfile LoginUserAsync(UserDto user)
        {
            try
            {
                IQueryable<UserProfile> userProfiles = this.userProfileService.RetriveAllActiveUserProfiles();

                UserProfile maybeUserProfile =
                    userProfiles.FirstOrDefault(u => u.Username == user.Username && u.Password == user.Password);

                if (maybeUserProfile is null)
                {
                    throw new UserNotFoundException();
                }

                if (!VerifyPasswordHash(user.Password, maybeUserProfile.PasswordHash, maybeUserProfile.PasswordSalt))
                {
                    throw new Exception("Password incorrect.");
                }

                string token = CreateToken(maybeUserProfile);

                return maybeUserProfile;
            }
            catch (Exception e)
            {

                throw new Exception(e.Message);
            }

            throw new NotImplementedException();
        }

        public ValueTask<UserDto> LogoutUserAsync(UserDto user)
        {
            throw new NotImplementedException();
        }

        public ValueTask<UserDto> RefreshTokenAsync(UserDto user)
        {
            throw new NotImplementedException();
        }

        public async ValueTask<UserProfile> RegisterUserAsync(UserProfile userProfile)
        {
            try
            {
                CreatePasswordHash(userProfile.Password, out byte[] passwordHash, out byte[] passwordSalt);
                userProfile.PasswordHash = passwordHash;
                userProfile.PasswordSalt = passwordSalt;
                userProfile.CreatedDate = DateTime.UtcNow;
                userProfile.TokenCreated= DateTime.UtcNow;

                UserProfile addedUserProfile = await this.userProfileService.AddUserProfileAsync(userProfile);
                if (addedUserProfile != null)
                {
                    string token = CreateToken(addedUserProfile);
                    addedUserProfile.Token = token;
                }
                return addedUserProfile;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private string CreateToken(UserProfile user)
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, "Admin"),
                //new Claim(ClaimTypes.Role, "User"),
            };

            //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            //    configuration.GetSection("AppSettings:Token").Value!));
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is my custom Secret key for authentication"));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        //private string CreateToken(UserProfile user)
        //{
        //    string role = user.RoleType.ToString();
        //    List<Claim> claims = new List<Claim>
        //    {
        //        new Claim(ClaimTypes.Name, user.Id.ToString()),
        //        new Claim(ClaimTypes.Role, role)
        //    };

        //    var keyBytes = new byte[64];
        //    using (var rng = RandomNumberGenerator.Create())
        //    {
        //        rng.GetBytes(keyBytes);
        //    }

        //    var key = new SymmetricSecurityKey(keyBytes);


        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        //    var token = new JwtSecurityToken(
        //        claims: claims,
        //        expires: DateTime.Now.AddDays(2),
        //        signingCredentials: creds);

        //    var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        //    return jwt;
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
    }
}
