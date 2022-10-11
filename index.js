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
  const userId = getUserId();
  const fetchUser = await fetch(`${DATABASE_URL}/users/${userId}`);
  const user = await fetchUser.json();

  createAvatar(user);
};

const getUserPosts = async (userId) => {
  const fetchAllPosts = await fetch(`${DATABASE_URL}/posts/`);
  const allPosts = await fetchAllPosts.json();
  const userPosts = allPosts.filter((post) => post.userId === userId);

  for (const post of userPosts) {
    const featchPostComments = await fetch(
      `${DATABASE_URL}/comments?postId=${post.id}`
    );
    post.comments = await featchPostComments.json();
  }

  const postsCards = userPosts.map((post) => {
    return createPostCard(post);
  });

  postsCards.forEach((card) => {
    postsContainer.appendChild(card);
  });
};

const getUserFriends = () => {
  friendsButton.addEventListener("click", async () => {
    postsContainer.innerHTML = "";
    const userId = getUserId();
    const fetchAllUsers = await fetch(`${DATABASE_URL}/users`);
    const allUsers = await fetchAllUsers.json();
    
    const userFriends = allUsers.filter((user) => user.id !== userId);
    
    for (const friend of userFriends) {
      

      const persona = document.createElement("div");
      persona.className = "persona";
      const avatar = document.createElement("img");
      avatar.className = "avatar";
      const friendName = document.createElement("p");

      avatar.src = `./assets/avatar${friend.id}.png`;

      friendName.textContent = friend.name;

      const postsButton = document.createElement("button");
      postsButton.innerText = "Show posts";

      postsButton.addEventListener("click", () => {
        console.log("clicked");
        postsContainer.classList.remove("friends-container")
        postsContainer.innerHTML= "";
        console.log("friend.userId",friend.id);
        getUserPosts(friend.id);
      });

      persona.appendChild(avatar);
      persona.appendChild(friendName);
      persona.appendChild(postsButton);

      postsContainer.appendChild(persona);
    }
    postsContainer.classList.add("friends-container");
  });
};

const featchUserFriend = async (friendId) => {
  const fetchUserFriend = await fetch(`${DATABASE_URL}/users/${friendId}`);
  const friend = await fetchUserFriend.json();
  return friend;
};

// INIT

getLoginUser();
getUserPosts(getUserId());
getUserFriends();
