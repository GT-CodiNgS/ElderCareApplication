using Xeptions;

namespace EdlerCareApi.Dtos.User.Exceptions
{
    public class UserNotFoundException : Xeption
    {
        public UserNotFoundException()
            : base(message: "Could not found user with user name and password")
        { }
    }
}
