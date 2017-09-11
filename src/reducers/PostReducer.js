import {
  LOAD_POSTS,
  UPDATE_FILTERED_POSTS,
  SORT_BY,
  GET_POST,
  CHANGE_POST,
  GET_COMMENTS,
  SORT_COMMENT_BY,
  EDIT_COMMENT
} from '../actions/types';

const INITIAL_STATE = {
  allPosts: {},
  categoriesFilter: [],
  filteredPosts: {},
  sortBy: 'voteScore',
  postDetails: {},
  comments: [],
  sortByComment: 'voteScore',
  openModal: false,
  editingComment: {}
};

export default (state = INITIAL_STATE, action) => {
    let sortBy = state.sortBy;
    let sortedComments = state.comments;
    let sortByComment = state.sortByComment;
    let filteredPosts =  null;

    switch (action.type) {
      case LOAD_POSTS:
        return { ...state,
          allPosts: action.posts,
          filteredPosts: action.posts.filter((item) => !item.deleted),
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

      case UPDATE_FILTERED_POSTS:
        let categoriesFilter = state.categoriesFilter;

        if (categoriesFilter.length > 0 &&
          categoriesFilter.filter((item) => item === action.category).length > 0) {
          categoriesFilter = categoriesFilter.filter((item) => item !== action.category);
        } else {
          action.category && categoriesFilter.push(action.category);
        }

        filteredPosts = state.allPosts.filter((item) => !item.deleted );

        if (categoriesFilter.length > 0 ) {
          filteredPosts = filteredPosts.filter(
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
      case GET_POST:
        return { ...state,
          postDetails: action.post,
        };
      case GET_COMMENTS:

      sortedComments = action.comments;

      if (sortByComment === 'voteScore') {
        sortedComments.sort((a,b) => b.voteScore - a.voteScore);
      } else {
        sortedComments.sort((a,b) => b.timestamp - a.timestamp);
      }

        return { ...state,
          comments: sortedComments,
        };

        case SORT_COMMENT_BY:

        sortByComment = action.sortByComment;

        if (sortByComment === 'voteScore') {
          sortedComments.sort((a,b) => b.voteScore - a.voteScore);
        } else {
          sortedComments.sort((a,b) => b.timestamp - a.timestamp);
        }

          return { ...state,
            comments: sortedComments,
            sortByComment
          };
      case CHANGE_POST:
        return { ...state,
          postDetails:  {
            ...state['postDetails'],
            post: {
              ...state['postDetails']['post'],
              title: action.title,
              body: action.body,
              author: action.author,
              category: action.category
            }

          }
        };
        case EDIT_COMMENT:
          return { ...state,
            editingComment: action.comment,
            openModal: action.openModal,
          };
      default:
        return state;
      }
};
