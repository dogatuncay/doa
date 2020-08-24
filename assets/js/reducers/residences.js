
import {
  LOAD_RESIDENCES,
  RELOAD_RESIDENCE,
  REMOVE_RESIDENCE
} from '../actions/residenceActions'

export function residences(state = {}, action) {
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