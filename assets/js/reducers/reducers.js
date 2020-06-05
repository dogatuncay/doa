import { combineReducers } from 'redux'
import {LOAD_PLANTS, LOAD_PLANTS_ALPHABETICALLY, LOAD_PLANTS_SEARCH} from '../actions/plantActions.js'

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

const reducers = combineReducers({
  plants,
  plantsAlphabetically,
  plantsSearch
})

export default reducers;