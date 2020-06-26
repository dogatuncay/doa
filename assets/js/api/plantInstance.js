import PropTypes from 'prop-types';
import apiRequest from '../api/apiRequest.js';
import { loadPlantInstances, reloadPlantInstance, removePlantInstance } from '../actions/plantInstanceActions.js';
import { loadPlants } from '../actions/plantActions.js';
import { compareObjects, filterObjectByKey } from '../helpers/objectHelpers.js';
  
export const PlantInstancePropType = PropTypes.shape({
  residence_id: PropTypes.number,
  plant_id: PropTypes.number,
  title: PropTypes.string,
  is_containerized: PropTypes.bool,
  is_indoor: PropTypes.bool
});

function stripFields(obj, toRemove) {
  const newObj = {...obj};
  toRemove.forEach((field) => delete newObj[field]);
  return newObj;
}

export function getPlantsForResidence(residence_id, dispatch, onError) {
  return apiRequest(`/api/user/residences/${residence_id}/plants?preload=plant`, 'GET')
  .then((response) => { 
    const instances = response.result.plant_instances;
    dispatch(loadPlantInstances(instances.map((inst) => stripFields(inst, ['plant']))));
    dispatch(loadPlants(instances.map((inst) => inst.plant)));
    return response.result;
  })
  .catch((err) => onError(err.errors));
}

export function createPlantInstance(residence_id, plant_instance, dispatch, onError) {
  return apiRequest(`/api/user/residences/${residence_id}/plants`, 'POST', {plant_instance})
  .then((response) => { 
    dispatch(loadPlantInstances([response.result]));
    return response.result;
  })
  .catch((err) => onError(err.errors));
}

export function updatePlantInstance(residence_id, oldPlantInstance, newPlantInstance, dispatch, onError) {
  if(oldPlantInstance.id !== newPlantInstance.id) throw new Error('todo');
  if(oldPlantInstance !== newPlantInstance) {
    const changedFields = compareObjects(oldPlantInstance, newPlantInstance);
    const plant_instance = filterObjectByKey(newPlantInstance, changedFields);
    return apiRequest(`/api/user/residences/${residence_id}/plants/${oldPlantInstance.id}`, 'PUT', {plant_instance})
    .then((_) => { 
      dispatch(reloadPlantInstance(newPlantInstance));
      return newPlantInstance;
    })
    .catch((err) => onError(err.errors));
  }
}

export function deletePlantInstance(residence_id, plant_instance_id, dispatch, onError) {
  return apiRequest(`/api/user/residences/${residence_id}/plants/${plant_instance_id}`, 'DELETE')
  .then((_) =>{ 
    dispatch(removePlantInstance(plant_instance_id));
  })
  .catch((err) => onError(err.errors));
}