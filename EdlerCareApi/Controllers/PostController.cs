using EdlerCareApi.Models.Post;
using EdlerCareApi.Services.Foundations.Posts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;

namespace EdlerCareApi.Controllers
{
    [Route("api/[controller]"), Authorize]
    [ApiController]
    public class PostController : RESTFulController
    {
        private readonly IPostService postService;

        public PostController(IPostService postService)
        {
            this.postService = postService;
        }

        [HttpPost]
        public async ValueTask<ActionResult<Post>> PostNewPostAsync(Post post)
        {
            Post addedPost = await this.postService.AddPostAsync(post);
            return Created(addedPost);
        }

        [HttpGet,AllowAnonymous]
        public ActionResult<IQueryable<Post>> GetAllPosts()
        {
            IQueryable<Post> posts = this.postService.RetriveAllActivePosts()
                .Where(u => !u.IsDeleted && u.IsVerified);
            return Ok(posts);
        }

        [HttpGet("admin")]
        public ActionResult<IQueryable<Post>> GetAllPostsForAmin()
        {
            IQueryable<Post> posts = this.postService.RetriveAllActivePosts();
            return Ok(posts);
        }

        [HttpGet("{postId}")]
        public async ValueTask<ActionResult<Post>> GetPostByIdAsync(Guid postId)
        {
            Post post = await this.postService.RetrievePostByIdAsync(postId);
            return Ok(post);
        }

        [HttpPut]
        public async ValueTask<ActionResult<Post>> ModifyPostAsync(Post post)
        {
            Post modifiedPost = await this.postService.ModifyPostAsync(post);
            return Ok(modifiedPost);
        }

        [HttpPut("verify/{postId}")]
        public async ValueTask<ActionResult<Post>> ModifyPostToVerifyAsync(Guid postId)
        {
            Post modifiedPost = await this.postService.VerifyPostAsync(postId);
            return Ok(modifiedPost);
        }

        [HttpDelete("{postId}")]
        public async ValueTask<ActionResult<Post>> ModifyPostToRemoveAsync(Guid postId)
        {
            Post removedPost = await this.postService.RemovePostAsync(postId);
            return Ok(removedPost);
        }

        [HttpGet("user/{userId}")]
        public ActionResult<IQueryable<Post>> GetAllPostsByUserId(Guid userId)
        {
            IQueryable<Post> posts = this.postService.RetriveAllActivePostsByUserId(userId);
            return Ok(posts);
        }
    }
}
