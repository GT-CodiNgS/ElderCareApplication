using EdlerCareApi.Dtos.User;
using EdlerCareApi.Models.RefreshToken;
using EdlerCareApi.Models.UserProfiles;

namespace EdlerCareApi.Services.Foundations.Auth
{
    public interface IAuthService
    {
        ValueTask<UserProfile> RegisterUserAsync(UserProfile userProfile);
        string LoginUserAsync(UserDto user);
        ValueTask<UserDto> LogoutUserAsync(UserDto user);
        ValueTask<UserDto> RefreshTokenAsync(UserDto user);
    }
}
