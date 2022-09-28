const DATABASE_URL = "https://jsonplaceholder.typicode.com";

// DO NOT CHANGE THIS FUNCTION
const getUserId = () => {
  return 1;
};
// END OF FUNCTION

// ELEMENTS
const postsButton = document.getElementById("posts-button");
const friendsButton = document.getElementById("users-button");
const postsContainer = document.getElementById("posts");
const usersContainer = document.getElementById("users");

const createPostCard = (post) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  const titleText = document.createTextNode(post.title);
  title.appendChild(titleText);

  const body = document.createElement("p");
  const bodyText = document.createTextNode(post.body);
  body.appendChild(bodyText);

  const textContainer = document.createElement("div");
  textContainer.classList.add("text-container");

  textContainer.appendChild(title);
  textContainer.appendChild(body);

  const commentContainer = document.createElement("div");
  commentContainer.classList.add("comment-container");

  const commentTitle = document.createElement("h3");
  const commentTitleText = document.createTextNode("Comments");
  commentTitle.appendChild(commentTitleText);
  commentContainer.appendChild(commentTitle);

  if (post.comments) {
    post.comments.forEach((comment) => {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");

      const commentUser = document.createElement("p");
      const commentUserText = document.createTextNode(comment.email);
      commentUser.appendChild(commentUserText);

      const commentTitle = document.createElement("p");
      const commentTitleText = document.createTextNode(comment.name);
      commentTitle.appendChild(commentTitleText);

      const commentBody = document.createElement("p");
      const commentBodyText = document.createTextNode(comment.body);
      commentBody.appendChild(commentBodyText);

      commentElement.appendChild(commentUser);
      commentElement.appendChild(commentTitle);
      commentElement.appendChild(commentBody);

      commentContainer.appendChild(commentElement);
    });
  }

  textContainer.appendChild(commentContainer);
  card.appendChild(textContainer);

  return card;
};

const createAvatar = (user) => {
  const avatar = document.getElementById("avatar");
  avatar.src = `./assets/avatar${user.id}.png`;

  const name = document.getElementById("user-name");
  const text = document.createTextNode(user.name);
  name.appendChild(text);
};

const getLoginUser = async () => {
  const id = getUserId();
  const response = await fetch(`${DATABASE_URL}/users/${id}`);
  const user = await response.json();

  createAvatar(user);
};

const getUserPosts = async (id) => {
  const postResponse = await fetch(`${DATABASE_URL}/posts`);
  const posts = await postResponse.json();

  const commentResponse = await fetch(`${DATABASE_URL}/comments`);
  const comments = await commentResponse.json();
  console.log(comments);
  const userPosts = posts
    .filter((post) => post.userId === getUserId())
    .map((post) => {
      const postComments = comments.filter(
        (comment) => comment.postId === post.id
      );

      return {
        ...post,
        comments: postComments,
      };
    });

  const postsCards = userPosts.map((post) => {
    return createPostCard(post);
  });

  postsCards.forEach((card) => {
    postsContainer.appendChild(card);
  });
};

// INIT

getLoginUser();
getUserPosts(getUserId());
