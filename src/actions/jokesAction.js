import invokeService from '../services';
import { SUMMARY } from '../navigation/screen_names';
import { commentsParser } from '../parsers/jsonParser';

export const updateJokes = (payload) => ({
  type: 'UPDATE_JOKES',
  payload
});

export const getNewJoke = () => {
  return (dispatch) => {
    invokeService({
      serviceUrl: '/api/joke',
      method: 'GET'
    })
      .then((result) => {
        dispatch(updateJokes({ item: result?.data }));
      })
      .catch((err) => {
        console.error(err); // log since could be render err
      });
  };
};

export const getJokes = (isPullToRefresh) => {
  return (dispatch) => {
    isPullToRefresh && dispatch(updateJokes({ isPullToRefresh }));
    invokeService({
      serviceUrl: '/api/jokes',
      method: 'GET'
    })
      .then((result) => {
        dispatch(updateJokes({
          summary: result?.data,
          isPullToRefresh: false
        }));
      })
      .catch((err) => {
        console.error(err); // log since could be render err
      });
  };
};

export const updateStatus = (payload, status) => {
  return () => {
    const requestData = {
      status
    };
    invokeService({
      serviceUrl: `/api/jokes/${payload.id}`,
      method: 'PUT',
      requestData
    })
      .then(() => {
        console.info('Do nothing as of now');
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const insertJoke = (payload, status) => {
  return (dispatch) => {
    const requestData = {
      id: payload.id,
      joke: payload.joke,
      status
    };
    invokeService({
      serviceUrl: '/api/jokes/',
      method: 'POST',
      requestData
    })
      .then(() => {
        dispatch(getNewJoke());
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const deleteJoke = ({ navigation, route }) => {
  const { item } = route?.params;
  return () => {
    invokeService({
      serviceUrl: `/api/jokes/${item.id}`,
      method: 'DELETE'
    })
      .then(() => {
        navigation.navigate(SUMMARY);
      })
      .catch((err) => {
        console.error(err); // log since could be render err
      });
  };
};

export const getComments = (id) => {
  return (dispatch) => {
    const requestData = {
      joke_id: id
    };
    invokeService({
      serviceUrl: '/api/jokes/comments',
      method: 'POST',
      requestData
    })
      .then((res) => {
        dispatch(updateJokes({
          comments: commentsParser(res.data)
        }));
      })
      .catch((err) => {
        console.error(err); // log since could be render err
      });
  };
};

export const updateComments = (payload) => {
  return (dispatch) => {
    const { id, commentText = '' } = payload;
    const requestData = {
      comment: commentText.trim(),
      joke_id: id
    };
    invokeService({
      serviceUrl: '/api/jokes/addComment',
      method: 'POST',
      requestData
    })
      .then(() => {
        dispatch(updateJokes({ commentText: '' }));
        dispatch(getComments(id));
      })
      .catch((err) => {
        console.error(err); // log since could be render err
      });
  };
};

export const deleteComment = (payload) => {
  return (dispatch) => {
    const { id, joke_id } = payload;
    const requestData = {
      comment_id: id,
      joke_id: joke_id
    };
    invokeService({
      serviceUrl: '/api/jokes/deleteComment',
      method: 'POST',
      requestData
    })
      .then(() => {
        dispatch(getComments(joke_id));
      })
      .catch((err) => {
        console.error(err); // log since could be render err
      });
  };
};

