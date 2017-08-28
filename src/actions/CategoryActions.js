import { LOAD_CATEGORIES } from './types';
import * as PostsAPI from '../PostsAPI';

export const loadAllCategories = (dispatch) => {
  return (dispatch) => {

    PostsAPI.getAllCategories()
    .then(categories => {
      loadCategories(dispatch, categories);
    })
    .catch((error) => {
      console.log(error);
    });
  };
};

const loadCategories = (dispatch, categories) => {
  dispatch({
    type: LOAD_CATEGORIES,
    categories
  });
}
