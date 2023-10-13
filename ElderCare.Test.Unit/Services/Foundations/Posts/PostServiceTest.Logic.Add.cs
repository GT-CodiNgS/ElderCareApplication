﻿using EdlerCareApi.Models.Post;
using FluentAssertions;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElderCare.Test.Unit.Services.Foundations.Posts
{
    public partial class PostServiceTest
    {
        [Fact]
        public async Task ShouldAddPostAsync()
        {
            // given
            Post randomPost = CreateRandomPost();
            Post inputPost = randomPost;
            Post storagePost = randomPost;
            Post expectedPost = storagePost;

            this.storageBrokerMock.Setup(broker =>
                           broker.InsertPostAsync(inputPost))
                    .ReturnsAsync(storagePost);

            // when
            Post actualPost =
                await this.postService.AddPostAsync(inputPost);

            // then
            actualPost.Should().BeEquivalentTo(expectedPost);

            this.storageBrokerMock.Verify(broker =>
                           broker.InsertPostAsync(inputPost),
                                              Times.Once);

            this.storageBrokerMock.VerifyNoOtherCalls();
        }
    }
}