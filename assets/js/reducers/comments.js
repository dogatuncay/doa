import {
  LOAD_COMMENTS
} from '../actions/commentActions';

export function comments(state = {}, action) {
  let newState = {...state};
  switch (action.type) {
    case LOAD_COMMENTS:
      action.commentsData.forEach((comment) => newState[comment.id] = comment);
      return newState;
    default:
      return state;
  }
}