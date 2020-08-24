import { 
  LOAD_USERS, 
  LOAD_CURRENT_USER, 
  REMOVE_CURRENT_USER,
  LOAD_USER_SEARCH, 
  SET_FOLLOW_STATUS
} from '../actions/userActions'


export function users(state = {}, action) {
  function loadUsers(users) {
    const newState = {...state};
    users.forEach((user) => newState[user.id] = user);
    return newState;
  }
  switch(action.type) {
    case LOAD_USERS:
    case LOAD_USER_SEARCH:
      return loadUsers(action.users);
    case LOAD_CURRENT_USER:
      return loadUsers([action.user]);
    case REMOVE_CURRENT_USER:
      return state.filter((user) => user.id !== action.userId);
    case SET_FOLLOW_STATUS:
      const newState = {...state};
      newState[action.userId] = {...newState[action.userId], am_following: action.amFollowing}
      return newState;
    default:
      return state;
  }
}

export function userSearch(state = {index: {}, count: 0, lastSearchTerm: null}, action) {
  const newState = {...state};
  switch(action.type) {
    case LOAD_USER_SEARCH:
      if(action.searchTerm !== newState.lastSearchTerm) newState.index = {};
      action.users.forEach((user, i) => newState.index[action.offset + i] = user.id);
      newState.count = action.count;
      newState.lastSearchTerm = action.searchTerm;
      return newState;
    default:
      return state;
  }
}

export function currentUser(state = null, action) {
  switch(action.type) {
    case LOAD_CURRENT_USER:
      return action.user.id;
    case REMOVE_CURRENT_USER:
      return null;
    default: 
      return state;
  }
}
