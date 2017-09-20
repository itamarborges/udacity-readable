import {
  LOAD_POSTS,
  UPDATE_FILTERED_POSTS,
  SORT_BY,
  GET_POST,
  CHANGE_POST,
  SORT_COMMENT_BY,
  EDIT_COMMENT,
  CLEAR_POST,
  LOAD_COMMENTS
} from '../actions/types';

const INITIAL_STATE = {
  allPosts: {},
  allComments: {},
  categoryFilter: '',
  filteredPosts: [],
  sortBy: 'voteScore',
  postDetails: {},
  sortByComment: 'voteScore',
  openModal: false,
  editingComment: {}
};

export default (state = INITIAL_STATE, action) => {
    let sortBy = state.sortBy;
    let sortedComments = null;
    let sortByComment = state.sortByComment;
    let filteredPosts =  null;

    switch (action.type) {
      case LOAD_POSTS:
        return { ...state,
          allPosts: action.posts,
          filteredPosts: action.posts.filter((item) => !item.deleted),
        };
        case LOAD_COMMENTS:
        sortedComments = action.comments;

        if (sortByComment === 'voteScore') {
          sortedComments.sort((a,b) => b.voteScore - a.voteScore);
        } else {
          sortedComments.sort((a,b) => b.timestamp - a.timestamp);
        }

          return { ...state,
            allComments: { ...state['allComments'],
            [action.id] : sortedComments},
          }

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
        let categoryFilter = state.categoryFilter;

        if (action.categoryFilter) {
          categoryFilter = action.categoryFilter;
          } else {
          categoryFilter = '';
        }

        if (categoryFilter) {
          filteredPosts = action.posts
        } else {
          filteredPosts = state.allPosts.filter((item) => !item.deleted );
        }

        if (sortBy === 'voteScore') {
          filteredPosts.sort((a,b) => b.voteScore - a.voteScore);
        } else {
          filteredPosts.sort((a,b) => b.timestamp - a.timestamp);
        }


        return { ...state,
          categoryFilter,
          filteredPosts
        };
      case GET_POST:
        return { ...state,
          postDetails: Object.keys(action.post.post).length !== 0 ? action.post : { deleted:true },
        };

        case SORT_COMMENT_BY:
        sortedComments = state.allComments[action.id];
        sortByComment = action.sortByComment;

        if (sortByComment === 'voteScore') {
          sortedComments.sort((a,b) => b.voteScore - a.voteScore);
        } else {
          sortedComments.sort((a,b) => b.timestamp - a.timestamp);
        }

        return { ...state,
          sortByComment,
          allComments: { ...state['allComments'],
          [action.id] : sortedComments},
        }
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
          case CLEAR_POST:
            return { ...state,
              postDetails: {},
              comments: [],
              sortByComment: 'voteScore',
              openModal: false,
              editingComment: {}
            };
      default:
        return state;
      }
};
