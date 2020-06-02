import createPost from './createPost.js';
import createComment from './createComment.js';

export default function renderPostsWithComments(array, container) {
  array.forEach((item) => {
    const { post, comments } = item;
    const postHtml = createPost(post.avatar, post.author, post.created, post.image);
    const commentsContainer = postHtml.querySelector('.post-comments-wrapper');
    const commentsHtml = comments.map((comment) => createComment(
      comment.avatar,
      comment.author,
      comment.created,
      comment.content,
    ));
    commentsHtml.forEach((element) => commentsContainer.appendChild(element));
    container.appendChild(postHtml);
  });
}
