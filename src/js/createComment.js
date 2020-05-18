import createNewElement from './createNewElement.js';
import readDate from './readDate.js';

export default function createPost(avatarUrl, author, date, text) {
  const commentContainer = createNewElement('div', 'comment-container');

  const commentAuthorAvatar = createNewElement('div', 'comment-author-avatar');
  const commentAuthorAvatarIcon = createNewElement('img', 'comment-author-avatar-icon');
  commentAuthorAvatarIcon.src = avatarUrl;
  commentAuthorAvatar.appendChild(commentAuthorAvatarIcon);

  const commentInfo = createNewElement('div', 'comment-info');
  const commentAuthor = createNewElement('div', 'comment-author', `<p>${author}</p>`);
  const commentText = createNewElement('div', 'comment-text', `<p>${text}</p>`);
  commentInfo.appendChild(commentAuthor);
  commentInfo.appendChild(commentText);

  const readedDate = readDate(date);
  const commentDate = createNewElement('div', 'comment-date', `<p>${readedDate}</p>`);

  commentContainer.appendChild(commentAuthorAvatar);
  commentContainer.appendChild(commentInfo);
  commentContainer.appendChild(commentDate);

  return commentContainer;
}
