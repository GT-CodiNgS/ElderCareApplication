using EdlerCareApi.Models.Post;
using EdlerCareApi.Services.Foundations.Posts;
using Microsoft.AspNetCore.Mvc;
using RESTFulSense.Controllers;

namespace EdlerCareApi.Controllers
{
    [Route("api/[controller]")]
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

        [HttpGet]
        public ActionResult<IQueryable<Post>> GetAllPosts()
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

        [HttpPut("{postId}")]
        public async ValueTask<ActionResult<Post>> ModifyPostAsync(Post post)
        {
            Post modifiedPost = await this.postService.ModifyPostAsync(post);
            return Ok(modifiedPost);
        }

        [HttpDelete("{postId}")]
        public async ValueTask<ActionResult<Post>> ModifyPostToRemoveAsync(Post post)
        {
            Post removedPost = await this.postService.RemovePostAsync(post);
            return Ok(removedPost);
        }
    }
}
