import {
  LOAD_POSTS,
  FILTER_CATEGORY,
  SORT_BY
} from '../actions/types';

const INITIAL_STATE = {
  allPosts: {},
  categoriesFilter: [],
  filteredPosts: {},
  sortBy: 'voteScore',
};

export default (state = INITIAL_STATE, action) => {
    let sortBy = state.sortBy;
    let categoriesFilter = state.categoriesFilter;
    let filteredPosts =  state.allPosts;

    switch (action.type) {
      case LOAD_POSTS:
        return { ...state,
          allPosts: action.posts,
          filteredPosts: action.posts,
        };
        case SORT_BY:
          sortBy = action.sortBy;
          filteredPosts = state.filteredPosts;

          if (sortBy === 'voteScore') {
            filteredPosts.sort((a,b) => b.voteScore - a.voteScore);
          } else {
            filteredPosts.sort((a,b) => b.timestamp - a.timestamp);
          }
          return { ...state,
            filteredPosts,
            sortBy
          };
        case FILTER_CATEGORY:

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

          if (sortBy === 'voteScore') {
            filteredPosts.sort((a,b) => b.voteScore - a.voteScore);
          } else {
            filteredPosts.sort((a,b) => b.timestamp - a.timestamp);
          }


          return { ...state,
            categoriesFilter,
            filteredPosts
          };
      default:
        return state;
      }
};
