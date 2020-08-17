import { combineReducers } from 'redux'
import { 
  LOAD_PLANTS, 
  LOAD_PLANTS_ALPHABETICALLY, 
  LOAD_PLANTS_SEARCH 
} from '../actions/plantActions.js'
import { 
  LOAD_USERS, 
  LOAD_CURRENT_USER, 
  REMOVE_CURRENT_USER,
  LOAD_USER_SEARCH, 
  SET_FOLLOW_STATUS
} from '../actions/userActions.js'
import {
  LOAD_RESIDENCES,
  RELOAD_RESIDENCE,
  REMOVE_RESIDENCE
} from '../actions/residenceActions.js'
import {
  LOAD_PLANT_INSTANCES,
  RELOAD_PLANT_INSTANCE,
  REMOVE_PLANT_INSTANCE
} from '../actions/plantInstanceActions.js'
import {
  LOAD_STORIES,
  RELOAD_STORY,
  REMOVE_STORY
} from '../actions/storyActions.js'

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
      if(action.searchTerm !== newState.lastSearchTerm) newState.index = {};
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

function userSearch(state = {index: {}, count: 0, lastSearchTerm: null}, action) {
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

function residences(state = {}, action) {
  let newState = {...state};
  switch (action.type) {
    case LOAD_RESIDENCES:
      action.residenceData.forEach((residence) => newState[residence.id] = residence);
      return newState;
    case RELOAD_RESIDENCE:
      return {
        ...state,
        [action.newResidenceData.id]: action.newResidenceData
      }
    case REMOVE_RESIDENCE:
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
}

function plantInstances(state = {}, action) {
  const newState = {...state};
  switch(action.type) {
    case LOAD_PLANT_INSTANCES:
      action.plantInstances.forEach((plantInstance) => newState[plantInstance.id] = plantInstance);
      return newState;
      case RELOAD_PLANT_INSTANCE:
        return {
          ...state,
          [action.newPlantInstanceData.id]: action.newPlantInstanceData
        }
      case REMOVE_PLANT_INSTANCE:
        delete newState[action.id];
        return newState;
    default:
      return state;
  }
}

function stories(state = {}, action) {
  let newState = {...state};
  switch (action.type) {
    case LOAD_STORIES:
      action.storyData.forEach((story) => newState[story.id] = story);
      return newState;
    case RELOAD_STORY:
      return {
        ...state,
        [action.newStoryData.id]: action.newStoryData
      }
    case REMOVE_STORY:
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
}

const reducers = combineReducers({
  plants,
  plantsAlphabetically,
  plantsSearch,
  users,
  userSearch,
  currentUser,
  residences,
  plantInstances,
  stories
})

export default reducers;