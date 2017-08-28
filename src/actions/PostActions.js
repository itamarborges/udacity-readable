import { LOAD_POSTS, FILTER_CATEGORY } from './types';
import * as PostsAPI from '../PostsAPI';

export const loadAllPosts = (dispatch) => {
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

export function setFilterPostByCategories(category) {
  return {
    type: FILTER_CATEGORY,
    category
  }
}
