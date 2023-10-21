using Xeptions;

namespace EdlerCareApi.Models.Post.Exceptions
{
    public class PostNotFoundException : Xeption
    {
        public PostNotFoundException()
            : base(message: "Could not found post with id")
        { }
    }
}
