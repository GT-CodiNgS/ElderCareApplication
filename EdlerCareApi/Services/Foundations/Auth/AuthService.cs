using EdlerCareApi.Brokers;
using EdlerCareApi.Dtos;
using EdlerCareApi.Dtos.User;
using EdlerCareApi.Dtos.User.Exceptions;
using EdlerCareApi.Models.RefreshToken;
using EdlerCareApi.Models.UserProfiles;
using EdlerCareApi.Services.Foundations.Email;
using EdlerCareApi.Services.Foundations.Users;
using Microsoft.Extensions.Options;
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
        private readonly IEmailService emailService;
        private readonly IConfiguration configuration;
        private readonly EmailSettings _emailSettings;
        private readonly IStorageBroker storageBroker;

        public AuthService(
            IUserProfileService userProfileService,
            IConfiguration configuration,
            IEmailService emailService,
            IOptions<EmailSettings> emailSettings,
            IStorageBroker storageBroker)
        {
            this.userProfileService = userProfileService;
            this.emailService = emailService;
            this.configuration = configuration;
            this.storageBroker = storageBroker;
            _emailSettings = emailSettings.Value;
        }

        public UserProfile LoginUserAsync(UserDto user)
        {
            try
            {
                IQueryable<UserProfile> userProfiles = this.userProfileService.RetriveAllActiveUserProfiles();

                UserProfile maybeUserProfile =
                    userProfiles.FirstOrDefault(u => 
                    u.Username == user.Username && !u.IsDeleted && u.IsVerfied);

                if (maybeUserProfile is null)
                {
                    throw new UserNotFoundException();
                }

                if (!VerifyPasswordHash(user.Password, maybeUserProfile.PasswordHash, maybeUserProfile.PasswordSalt))
                {
                    throw new Exception("Password incorrect.");
                }

                string token = CreateToken(maybeUserProfile);
                maybeUserProfile.PasswordHash = null;
                maybeUserProfile.PasswordSalt = null;
                maybeUserProfile.Token = token;

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

        public bool PasswordChange(PasswordResetDto passwordResetDto)
        {
            try
            {
                UserProfile maybeUserProfile =
                    this.storageBroker.SelectUserProfileByIdAsync(new Guid(passwordResetDto.userId)).Result;

                if (maybeUserProfile is null)
                {
                    return false;
                    throw new UserNotFoundException();
                }

                if (!VerifyPasswordHash(passwordResetDto.Password, maybeUserProfile.PasswordHash, maybeUserProfile.PasswordSalt))
                {
                    return false;
                    throw new Exception("Password incorrect.");
                }

                CreatePasswordHash(passwordResetDto.ConfirmPassword, out byte[] passwordHash, out byte[] passwordSalt);
                maybeUserProfile.PasswordHash = passwordHash;
                maybeUserProfile.PasswordSalt = passwordSalt;
                maybeUserProfile.UpdatedDate = DateTime.UtcNow;
                maybeUserProfile.TokenCreated = DateTime.UtcNow;

                ValueTask<UserProfile> updatedUserProfile
                    = this.storageBroker.UpdateUserProfileAsync(maybeUserProfile);

                return true;
            }
            catch (Exception e)
            {

                throw;
            }
        }

        public async ValueTask<UserProfile> RegisterUserAsync(UserProfile userProfile)
        {
            try
            {
                CreatePasswordHash(userProfile.Password, out byte[] passwordHash, out byte[] passwordSalt);
                userProfile.PasswordHash = passwordHash;
                userProfile.PasswordSalt = passwordSalt;
                userProfile.CreatedDate = DateTime.UtcNow;
                userProfile.TokenCreated = DateTime.UtcNow;

                UserProfile addedUserProfile = await this.userProfileService.AddUserProfileAsync(userProfile);
                if (addedUserProfile != null)
                {
                    string token = CreateToken(addedUserProfile);
                    addedUserProfile.Token = token;
                    string apiUrl = _emailSettings.ApiUrl;

                    var confirmationLink = $"{apiUrl}/confirm?userId={addedUserProfile.Id}";

                    var emailBody = $"Please confirm your email by <a href='{confirmationLink}'>clicking here</a>.";

                    bool isEmailSent = await this.emailService.SendEmailAsync(
                        addedUserProfile.Username,
                        addedUserProfile.Email,
                        "Confirm your email",
                        emailBody);

                    if (isEmailSent)
                    {
                        addedUserProfile.IsEmailSent = true;
                        addedUserProfile =
                            await this.userProfileService.ModifyUserProfileAsync(addedUserProfile);
                    }
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
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, "User"),
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

        public ValueTask<UserDto> RefreshTokenAsync(UserDto user)
        {
            throw new NotImplementedException();
        }

        public bool ForgotPassword(string email)
        {
            IQueryable<UserProfile> userProfiles = this.userProfileService.RetriveAllActiveUserProfiles();

            UserProfile maybeUserProfile =
                userProfiles.FirstOrDefault(u => u.Email == email);

            if (maybeUserProfile != null)
            {
                string randomPassword = Guid.NewGuid().ToString().Substring(0, 8);
                CreatePasswordHash(randomPassword, out byte[] passwordHash, out byte[] passwordSalt);

                maybeUserProfile.PasswordHash = passwordHash;
                maybeUserProfile.PasswordSalt = passwordSalt;
                maybeUserProfile.UpdatedDate = DateTime.UtcNow;

                ValueTask<UserProfile> updatedUserProfile
                    = this.storageBroker.UpdateUserProfileAsync(maybeUserProfile);

                if (updatedUserProfile != null)
                {
                    string apiUrl = _emailSettings.ApiUrl;

                    var emailBody = $"Your new password is {randomPassword}.";

                    bool isEmailSent = this.emailService.SendEmailAsync(
                         maybeUserProfile.Username,
                         maybeUserProfile.Email,
                         "Forgot Password",
                         emailBody).Result;

                    if (isEmailSent)
                    {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}
