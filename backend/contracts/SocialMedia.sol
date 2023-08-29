// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SocialMedia {
    struct Comment {
        uint commentId;
        address author;
        string content;
        uint createdAt;
        uint likeCount;
        // keep track whether each user has liked the comment
        mapping(address => bool) likedUsers;
    }

    struct Post {
        uint postId;
        address author;
        string content;
        string imageCid;
        uint createdAt;
        uint likeCount;
        // keep track whether each user has liked the post
        mapping(address => bool) likedUsers;
        uint[] comments;
    }

    struct User {
        address wallet;
        string name;
        uint[] userPosts;
        uint followingCount;
        uint followerCount;
        uint postCount;
        // total tips received
        uint256 tipsReceived;
        // total tips given
        uint256 tipsGiven;
        // keep track whether current user is following a user
        mapping(address => bool) following;
        // keep track whether current user is followed by a user
        mapping(address => bool) followers;
        // keep track whom has current user tipped
        mapping(address => bool) tipped;
        // keep track who has tipped current user
        mapping(address => bool) tippers;
    }

    mapping(address => User) public users;
    mapping(uint => Post) public posts;
    mapping(uint => Comment) public comments;

    uint256 public postCount;
    uint256 public commentCount;

    // create post
    function createPost(
        string calldata _content,
        string calldata _imageCid
    ) external contentNotEmpty(_content) {
        // create post
        Post storage post = posts[postCount];
        post.postId = postCount;
        post.author = msg.sender;
        post.content = _content;
        post.imageCid = _imageCid;
        post.createdAt = block.timestamp;

        // add post to userPosts
        users[msg.sender].userPosts.push(postCount);
        users[msg.sender].postCount++;

        // increment postId counter
        postCount++;
    }

    // get all posts created by a user
    function postsByUser(address _user) external view returns (uint[] memory) {
        return users[_user].userPosts;
    }

    // toggle whether msg.sender like a post
    function togglePostLike(uint _postId) external postExists(_postId) {
        // get post
        Post storage post = posts[_postId];
        // if user has liked the post
        if (post.likedUsers[msg.sender]) {
            // unlike the post
            post.likedUsers[msg.sender] = false;
            post.likeCount--;
        } else {
            // like the post
            post.likedUsers[msg.sender] = true;
            post.likeCount++;
        }
    }

    // check if msg.sender has liked a post
    function hasLikedPost(uint _postId) external view returns (bool) {
        return posts[_postId].likedUsers[msg.sender];
    }

    // get comments of a posts
    function postComments(uint _postId) external view returns (uint[] memory) {
        return posts[_postId].comments;
    }

    // create comment on a post
    function createComment(
        uint _postId,
        string calldata _content
    ) external postExists(_postId) contentNotEmpty(_content) {
        // create comment struct
        Comment storage comment = comments[commentCount];
        comment.commentId = commentCount;
        comment.author = msg.sender;
        comment.content = _content;
        comment.createdAt = block.timestamp;

        // append commentId to post's comments
        Post storage post = posts[_postId];
        post.comments.push(commentCount);

        commentCount++;
    }

    // toggle whether msg.sender like a comment
    function toggleCommentLike(
        uint _commentId
    ) external commentExists(_commentId) {
        // if user has liked the comment
        if (comments[_commentId].likedUsers[msg.sender]) {
            // unlike the comment
            comments[_commentId].likedUsers[msg.sender] = false;
            comments[_commentId].likeCount--;
        } else {
            // like the comment
            comments[_commentId].likedUsers[msg.sender] = true;
            comments[_commentId].likeCount++;
        }
    }

    // check if msg.sender has aldready liked a comment
    function hasLikedComment(uint _commentId) external view returns (bool) {
        return comments[_commentId].likedUsers[msg.sender];
    }

    // toggle whether msg.sender is following a user
    function toggleUserFollow(address _user) external {
        // get user struct for msg.sender
        User storage follower = users[msg.sender];
        // get user struct for user to follow
        User storage following = users[_user];

        // if msg.sender is aldready following the user
        if (follower.following[_user]) {
            // unfollow
            follower.following[_user] = false;
            following.followers[msg.sender] = false;

            // decrease counts
            follower.followingCount--;
            following.followerCount--;
        } else {
            // folow
            follower.following[_user] = true;
            following.followers[msg.sender] = true;

            // increase counts
            follower.followingCount++;
            following.followerCount++;
        }
    }

    // check if msg.sender is following a user
    function isFollowing(address _user) external view returns (bool) {
        return users[msg.sender].following[_user];
    }

    // check if a user has tipped msg.sender
    function isTippedBy(address _user) external view returns (bool) {
        return users[msg.sender].tippers[_user];
    }

    // pay user tip money
    function tipUser(address _user) external payable {
        (bool success, ) = _user.call{value: msg.value}("");
        require(success, "Transfer failed.");

        // get user struct for msg.sender
        User storage tipper = users[msg.sender];
        // get user struct for user tipped
        User storage tipped = users[_user];

        // update tipping relationship
        tipper.tipped[_user] = true;
        tipped.tippers[msg.sender] = true;

        // increase counts
        tipper.tipsGiven = tipper.tipsGiven + msg.value;
        tipped.tipsReceived = tipped.tipsReceived + msg.value;
    }

    // throw error if a postId doesn't belong to an existing post
    modifier postExists(uint _postId) {
        require(posts[_postId].createdAt > 0, "Post not found");
        _;
    }

    // throw error if a commentId doesn't belong to an existing comment
    modifier commentExists(uint _commentId) {
        require(comments[_commentId].createdAt > 0, "Comment not found");
        _;
    }

    // throw error if a string is empty
    modifier contentNotEmpty(string calldata _content) {
        // check content is not empty
        bytes memory contentBytes = bytes(_content);
        require(contentBytes.length > 0, "Content cannot be an empty string");
        _;
    }
}
