import { forkJoin } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, pluck, concatMap } from 'rxjs/operators';

import createNewElement from './createNewElement.js';
import renderPostsWithComments from './renderPostsWithComments.js';

const bodyEl = document.querySelector('body');
const mainContainer = createNewElement('div', 'main-container');
const postsContainer = createNewElement('div', 'posts-container');
mainContainer.appendChild(postsContainer);
bodyEl.insertBefore(mainContainer, bodyEl.firstChild);

const url = 'https://ahj-homework-11-2.herokuapp.com';

ajax.getJSON(`${url}/posts/latest`).pipe(
  pluck('data'),
  concatMap((posts) => {
    const comments$ = posts.map((post) => ajax.getJSON(`${url}/posts/${post.id}/comments/latest`).pipe(
      pluck('data'),
      map((comments) => {
        const postWithComments = {};
        postWithComments.post = post;
        postWithComments.comments = comments;
        return postWithComments;
      }),
    ));
    return forkJoin(comments$);
  }),
).subscribe((value) => renderPostsWithComments(value, postsContainer));
