# Async Await Challenge

## Required Tasks

We need to render all the logged in user's posts.

To do so we need to fetch:

- user information
- all posts
- all comments

Then we need to filter the posts and comments to show only relevant ones.

We have two functions we need to tweak:

- getLoginUser
- getUserPosts (which inside we will get related comments)

The routes to fetch data are:

```js
const fetchUser => `${DATABASE_URL}/users/${id}`
const fetchAllPosts => `${DATABASE_URL}/posts/${id}`
const fetchAllComments => `${DATABASE_URL}/comments/${id}`
```

## Bonus Tasks

### Bonus 1

Pressing on My Friends button should show cards with all users, including their avatars (in the assets folder, each avatar is related to a user id).

### Bonus 2

Each user card has "show posts" button.
Pressing on it should show all the posts of the selected user.
