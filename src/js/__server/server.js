const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const uuid = require('uuid');
const faker = require('faker');

const app = new Koa();
const router = new Router();

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
}));

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());

const latestPosts = [];
const comments = [];

function getRandom(min, max) {
  const randomNumber = Math.random() * (max - min) + min;
  return Math.floor(randomNumber);
}

function addNewComment(postId) {
  const randomName = faker.name.firstName();
  const randomSurname = faker.name.lastName();
  const randomAuthor = `${randomName} ${randomSurname}`;
  const randomAvatar = faker.image.avatar();
  const randomComment = faker.lorem.word();
  const comment = {
    id: uuid.v4(),
    post_id: postId,
    author: randomAuthor,
    avatar: randomAvatar,
    content: randomComment,
    created: +new Date(),
  };
  comments.push(comment);
}

function addNewPost() {
  const randomTitle = faker.lorem.word();
  const randomName = faker.name.firstName();
  const randomSurname = faker.name.lastName();
  const randomAuthor = `${randomName} ${randomSurname}`;
  const randomAvatar = faker.image.avatar();
  const randomImg = faker.image.image();
  const randomPostId = uuid.v4();
  const post = {
    id: randomPostId,
    author_id: uuid.v4(),
    title: randomTitle,
    author: randomAuthor,
    avatar: randomAvatar,
    image: randomImg,
    created: +new Date(),
  };
  const quantity = getRandom(1, 6);
  for (let i = 0; i < quantity; i += 1) {
    addNewComment(randomPostId);
  }
  latestPosts.push(post);
}

for (let i = 0; i < 9; i += 1) {
  addNewPost();
}

function getId(string) {
  const firstTrim = string.match(/(?<=\/posts\/).+/);
  const secondTrim = firstTrim[0].match(/.+(?=\/comments)/);
  const id = secondTrim[0];
  return id;
}

router.get('/posts/latest', async (ctx) => {
  ctx.response.body = JSON.stringify({ status: 'ok', data: latestPosts });
});

router.get('/posts/:id/comments/latest', async (ctx) => {
  const id = getId(ctx.request.url);
  let latestComments = comments.filter((item) => item.post_id === id);
  if (latestComments.length > 3) {
    latestComments = latestComments.slice(-3);
  }
  ctx.response.body = JSON.stringify({ status: 'ok', data: latestComments });
});

app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    await next();
    return;
  }
  const headers = { 'Access-Control-Allow-Origin': '*' };
  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      await next();
      return;
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }
  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });
    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Allow-Request-Headers'));
    }
    ctx.response.status = 204;
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

server.listen(port);
