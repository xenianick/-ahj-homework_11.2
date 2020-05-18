import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

import createNewElement from './createNewElement.js';
import createPost from './createPost.js';
import createComment from './createComment.js';

const bodyEl = document.querySelector('body');
const mainContainer = createNewElement('div', 'main-container');
const postsContainer = createNewElement('div', 'posts-container');
mainContainer.appendChild(postsContainer);
bodyEl.insertBefore(mainContainer, bodyEl.firstChild);

const url = 'http://localhost:7070';

const response = ajax.getJSON(`${url}/posts/latest`).pipe(
  map((result) => {
    const postsHtml = [];
    const latestPosts = result.data;
    latestPosts.forEach((post) => {
      const postHtml = createPost(post.avatar, post.author, post.created, post.image);
      const commentsContainer = postHtml.querySelector('.post-comments-wrapper');
      const responseComments = ajax.getJSON(`${url}/posts/${post.id}/comments/latest`).pipe(
        map((res) => {
          const commentsHtml = [];
          const latestComments = res.data;
          latestComments.forEach((comment) => {
            const commentHtml = createComment(
              comment.avatar,
              comment.author,
              comment.created,
              comment.content,
            );
            commentsHtml.push(commentHtml);
          });
          return commentsHtml;
        }),
      );
      responseComments.subscribe((comments) => comments.forEach((item) => {
        commentsContainer.appendChild(item);
      }));
      postsHtml.push(postHtml);
    });
    return postsHtml;
  }),
);
response.subscribe((posts) => posts.forEach((item) => postsContainer.appendChild(item)));
