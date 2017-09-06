import {
  LOAD_POSTS,
  FILTER_CATEGORY,
  SORT_BY,
  GET_POST,
  CHANGE_POST
  } from './types';
import * as PostsAPI from '../PostsAPI';

export const loadAllPosts = () => {
  return (dispatch) => {

    PostsAPI.getAllPosts()
    .then(posts => {
      loadPosts(dispatch, posts);
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

const loadPosts = (dispatch, posts) => {
  dispatch({
    type: LOAD_POSTS,
    posts
  });
}

export const getPost = (id) => {
  return (dispatch) => {

    PostsAPI.getPost(id)
    .then(post => {
      getSpecificPost(dispatch, post);
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

const getSpecificPost = (dispatch, post) => {
  dispatch({
    type: GET_POST,
    post
  });
}

export function setFilterPostByCategories(category) {
  return {
    type: FILTER_CATEGORY,
    category
  }
}

export function setSortBy(sortBy) {
  return {
    type: SORT_BY,
    sortBy
  }
}

export function updatePost({title, category, body, author}) {
  return {
    type: CHANGE_POST,
    title,
    category,
    body,
    author
  }
}
