import {
  LOAD_POSTS,
  FILTER_CATEGORY
} from '../actions/types';

const INITIAL_STATE = {
  allPosts: {},
  categoriesFilter: [],
  filteredPosts: {},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LOAD_POSTS:
        return { ...state,
          allPosts: action.posts,
          filteredPosts: action.posts,
        };
        case FILTER_CATEGORY:
          let categoriesFilter = state.categoriesFilter;
          let filteredPosts =  state.allPosts;

          if (categoriesFilter.length > 0 &&
            categoriesFilter.filter((item) => item === action.category).length > 0) {
            categoriesFilter = categoriesFilter.filter((item) => item !== action.category);
          } else {
            categoriesFilter.push(action.category);
          }

          if (categoriesFilter.length > 0 ) {
            filteredPosts = state.allPosts.filter(
              (item) => categoriesFilter.indexOf(item.category) >= 0 );
          }

          return { ...state,
            categoriesFilter,
            filteredPosts
          };
      default:
        return state;
      }
};
