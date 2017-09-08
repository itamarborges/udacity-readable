import {
  LOAD_POSTS,
  UPDATE_FILTERED_POSTS,
  SORT_BY,
  GET_POST,
  CHANGE_POST,
  GET_COMMENTS
  } from './types';
import * as PostsAPI from '../PostsAPI';

export const loadAllPosts = () => {
  return (dispatch) => {

    PostsAPI.getAllPosts()
    .then(posts => {
      loadPosts(dispatch, posts);
    })
    .then(() => updateFilteredPosts(dispatch))
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
    type: UPDATE_FILTERED_POSTS,
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

export const deletePost = (id) => {
  return (dispatch) => {

    PostsAPI.deletePost(id)
    .then(() => {
      dispatch(loadAllPosts());
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

const updateFilteredPosts = (dispatch) => {
  dispatch({
    type: UPDATE_FILTERED_POSTS
  });
}

export const getComments = (id) => {
  return (dispatch) => {

    PostsAPI.getComments(id)
    .then(comments => {
      getPostComments(dispatch, comments);
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

const getPostComments = (dispatch, comments) => {
  dispatch({
    type: GET_COMMENTS,
    comments
  });
}

export const updatePostVoteScore = (id, increaseScore) => {
  return (dispatch) => {
    debugger;
    const body = increaseScore ? { option: "upVote" } : { option: "downVote" };

    PostsAPI.updatePostVoteScore(id, body)
    .then(() => {
      dispatch(getPost(id));
      dispatch(loadAllPosts());
    })
    .catch((error) => {
      console.log(error);
    });
  };
};
