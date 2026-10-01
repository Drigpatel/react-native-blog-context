import createDataContext from './createDataContext';

const ADD_BLOGPOST = 'add_blogpost';
const DELETE_BLOGPOST = 'delete_blogpost';
const UPDATE_BLOGPOST = 'update_blogpost';
const TOGGLE_FAVORITE = 'toggle_favorite';

const blogReducer = (state, action) => {
  switch (action.type) {
    case ADD_BLOGPOST:
      return [
        ...state,
        {
          id: Date.now(),
          title: action.payload.title,
          body: action.payload.body || '',
          favorite: false,
          createdAt: new Date().toISOString(),
        },
      ];

    case DELETE_BLOGPOST:
      return state.filter(
        blogPost => blogPost.id !== action.payload
      );

    case UPDATE_BLOGPOST:
      return state.map(blogPost =>
        blogPost.id === action.payload.id
          ? {
              ...blogPost,
              title: action.payload.title,
              body: action.payload.body,
            }
          : blogPost
      );

    case TOGGLE_FAVORITE:
      return state.map(blogPost =>
        blogPost.id === action.payload
          ? {
              ...blogPost,
              favorite: !blogPost.favorite,
            }
          : blogPost
      );

    default:
      return state;
  }
};

const addBlogPost = dispatch => {
  return (title, body = '') => {
    dispatch({
      type: ADD_BLOGPOST,
      payload: {
        title,
        body,
      },
    });
  };
};

const deleteBlogPost = dispatch => {
  return id => {
    dispatch({
      type: DELETE_BLOGPOST,
      payload: id,
    });
  };
};

const updateBlogPost = dispatch => {
  return (id, title, body = '') => {
    dispatch({
      type: UPDATE_BLOGPOST,
      payload: {
        id,
        title,
        body,
      },
    });
  };
};

const toggleFavorite = dispatch => {
  return id => {
    dispatch({
      type: TOGGLE_FAVORITE,
      payload: id,
    });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  {
    addBlogPost,
    deleteBlogPost,
    updateBlogPost,
    toggleFavorite,
  },
  []
);
