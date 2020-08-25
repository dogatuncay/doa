import PropTypes from 'prop-types';
import apiRequest from '../api/apiRequest';
import { loadPlantInstances, reloadPlantInstance, removePlantInstance } from '../actions/plantInstanceActions';
import { loadPlants } from '../actions/plantActions';
import { compareObjects, filterObjectByKey } from '../helpers/objectHelpers';
  
export const PlantInstancePropType = PropTypes.shape({
  residence_id: PropTypes.number.isRequired,
  plant_id: PropTypes.number.isRequired,
  title: PropTypes.string,
  is_containerized: PropTypes.bool,
  is_indoor: PropTypes.bool
});

function stripFields(obj, toRemove) {
  const newObj = {...obj};
  toRemove.forEach((field) => delete newObj[field]);
  return newObj;
}

export function getPlantsForResidence(residence_id, dispatch) {
  return apiRequest(`/api/residence/${residence_id}/plant?preload=plant`, 'GET')
  .then((response) => { 
    const instances = response.result.plant_instances;
    dispatch(loadPlantInstances(instances.map((inst) => stripFields(inst, ['plant']))));
    dispatch(loadPlants(instances.map((inst) => inst.plant)));
    return response.result;
  });
}

export function createPlantInstance(residence_id, plant_instance, dispatch) {
  return apiRequest(`/api/residence/${residence_id}/plant`, 'POST', {plant_instance})
  .then((response) => { 
    dispatch(loadPlantInstances([response.result]));
    return response.result;
  });
}

export function updatePlantInstance(residence_id, oldPlantInstance, newPlantInstance, dispatch) {
  if(oldPlantInstance.id !== newPlantInstance.id) throw new Error('todo');
  if(oldPlantInstance !== newPlantInstance) {
    const changedFields = compareObjects(oldPlantInstance, newPlantInstance);
    const plant_instance = filterObjectByKey(newPlantInstance, changedFields);
    return apiRequest(`/api/residence/${residence_id}/plant/${oldPlantInstance.id}`, 'PUT', {plant_instance})
    .then((_) => { 
      dispatch(reloadPlantInstance(newPlantInstance));
      return newPlantInstance;
    });
  }
}

export function deletePlantInstance(residence_id, plant_instance_id, dispatch) {
  return apiRequest(`/api/residence/${residence_id}/plant/${plant_instance_id}`, 'DELETE')
  .then((_) =>{ 
    dispatch(removePlantInstance(plant_instance_id));
  });
}