import createNewElement from './createNewElement.js';
import readDate from './readDate.js';

export default function createPost(avatarUrl, author, date, imageUrl) {
  const postContainer = createNewElement('div', 'post-container');
  const postInfo = createNewElement('div', 'post-info');
  const postAuthorAvatar = createNewElement('div', 'post-author-avatar');
  const postAuthorAvatarIcon = createNewElement('img', 'post-author-avatar-icon');
  postAuthorAvatarIcon.src = avatarUrl;
  postAuthorAvatar.appendChild(postAuthorAvatarIcon);
  const postAuthor = createNewElement('div', 'post-author', `<p>${author}</p>`);
  const readedDate = readDate(date);
  const postDate = createNewElement('div', 'post-date', `<p>${readedDate}</p>`);
  postInfo.appendChild(postAuthor);
  postInfo.appendChild(postDate);

  const postImgContainer = createNewElement('div', 'post-img-container');
  const postImg = createNewElement('img', 'post-img');
  postImg.src = imageUrl;
  postImgContainer.appendChild(postImg);

  const postCommentsContainer = createNewElement('div', 'post-comments-container');
  const postCommentsHeader = createNewElement('div', 'post-comments-header', '<p>Latest comments</p>');
  const postCommentsWrapper = createNewElement('div', 'post-comments-wrapper');
  const postCommentsLoadBtnContainer = createNewElement('div', 'post-comments-load-btn-container');
  const postCommentsLoadBtn = createNewElement('button', 'post-comments-load-btn', '<p>Load More</p>');
  postCommentsLoadBtn.type = 'button';
  postCommentsLoadBtnContainer.appendChild(postCommentsLoadBtn);
  postCommentsContainer.appendChild(postCommentsHeader);
  postCommentsContainer.appendChild(postCommentsWrapper);
  postCommentsContainer.appendChild(postCommentsLoadBtnContainer);

  postContainer.appendChild(postAuthorAvatar);
  postContainer.appendChild(postInfo);
  postContainer.appendChild(postImgContainer);
  postContainer.appendChild(postCommentsContainer);

  return postContainer;
}
