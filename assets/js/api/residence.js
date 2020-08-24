import PropTypes from 'prop-types';
import apiRequest from '../api/apiRequest';
import { loadResidences, reloadResidence, removeResidence } from '../actions/residenceActions';
import { compareObjects, filterObjectByKey } from '../helpers/objectHelpers';
  
export const ResidencePropType = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  zipcode: PropTypes.string
});

export function getResidences(dispatch) {
  return apiRequest('/api/residence', 'GET')
  .then((response) => { 
    dispatch(loadResidences(response.result.residences));
    return response.result;
  });
}

export function createResidence(residence, dispatch) {
  return apiRequest('/api/residence', 'POST', {residence})
  .then((response) => { 
    dispatch(loadResidences([response.result])); 
    return response.result;
  });
}

export function updateResidence(oldResidence, newResidence, dispatch) {
  if(oldResidence.id !== newResidence.id) throw new Error('todo');
  if(oldResidence !== newResidence) {
    const changedFields = compareObjects(oldResidence, newResidence);
    const residence = filterObjectByKey(newResidence, changedFields);
    return apiRequest(`/api/residence/${newResidence.id}`, 'PUT', {residence})
    .then((_) => { 
      dispatch(reloadResidence(newResidence));
      return newResidence;
    });
  }
}

export function deleteResidence(id, dispatch) {
  return apiRequest(`/api/residence/${id}`, 'DELETE')
  .then((_) =>{ 
    dispatch(removeResidence(id));
  });
}