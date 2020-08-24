import {
  LOAD_PLANT_INSTANCES,
  RELOAD_PLANT_INSTANCE,
  REMOVE_PLANT_INSTANCE
} from '../actions/plantInstanceActions'


export function plantInstances(state = {}, action) {
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