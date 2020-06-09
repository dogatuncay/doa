import { combineReducers } from 'redux'
import { LOAD_PLANTS, LOAD_PLANTS_ALPHABETICALLY, LOAD_PLANTS_SEARCH } from '../actions/plantActions.js'
import { LOAD_USERS, LOAD_CURRENT_USER, REMOVE_CURRENT_USER } from '../actions/userActions.js'

function plants(state = {}, action) {
  const newState = {...state};
  switch(action.type) {
    case LOAD_PLANTS:
    case LOAD_PLANTS_ALPHABETICALLY:
    case LOAD_PLANTS_SEARCH:
      action.plants.forEach((plant) => newState[plant.id] = plant);
      return newState;
    default:
      return state;
  }
}

function plantsAlphabetically(state = {index: {}, count: 0}, action) {
  const newState = {...state};
  switch(action.type) {
    case LOAD_PLANTS_ALPHABETICALLY:
      action.plants.forEach((plant, i) => newState.index[action.offset + i] = plant.id);
      newState.count = action.count;
      return newState;
    default:
      return state;
  }
}

function plantsSearch(state = {index: {}, count: 0, lastSearchTerm: null}, action) {
  const newState = {...state};
  switch(action.type) {
    case LOAD_PLANTS_SEARCH:
      if(action.searchTerm !== newState.searchTerm) newState.index = {};
      action.plants.forEach((plant, i) => newState.index[action.offset + i] = plant.id);
      newState.count = action.count;
      newState.lastSearchTerm = action.searchTerm;
      return newState;
    default:
      return state;
  }
}

function users(state = {}, action) {
  function loadUsers(users) {
    const newState = {...state};
    users.forEach((user) => newState[user.id] = user);
    return newState;
  }
  
  switch(action.type) {
    case LOAD_USERS:
      return loadUsers(action.users);
    case LOAD_CURRENT_USER:
      return loadUsers([action.user]);
    case REMOVE_CURRENT_USER:
      return state.filter((user) => user.id !== action.userId);
    default:
      return state;
  }
}

function currentUser(state = null, action) {
  switch(action.type) {
    case LOAD_CURRENT_USER:
      return action.user.id;
    case REMOVE_CURRENT_USER:
      return null;
    default: 
      return state;
  }
}

const reducers = combineReducers({
  plants,
  plantsAlphabetically,
  plantsSearch,
  users,
  currentUser
})

export default reducers;