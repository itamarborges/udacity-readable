import {
  LOAD_CATEGORIES
} from '../actions/types';

const INITIAL_STATE = {
  allCategories: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LOAD_CATEGORIES:
        return { ...state,
          allCategories: action.categories
        };
      default:
        return state;
      }
};
