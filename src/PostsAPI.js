const api = "http://localhost:5001";
const token = 'authorization';

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json());

export const createPost = (body) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json());

export const getPost = (id) =>
fetch(`${api}/posts/${id}`, { headers })
  .then(res => res.json())
  .then(post => ({ post }));

export const updatePost = (id, body) =>{
  console.log(body);
  console.log(JSON.stringify(body));

  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}
export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  });

export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
  .then(res => res.json());

export const updatePostVoteScore = (id, body) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json());
