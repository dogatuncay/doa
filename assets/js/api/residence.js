import PropTypes from 'prop-types';
import apiRequest from '../api/apiRequest.js';
import { loadResidences, reloadResidence, removeResidence } from '../actions/residenceActions.js';
import { compareObjects, filterObjectByKey } from '../helpers/objectHelpers.js';
  
export const ResidencePropType = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  zipcode: PropTypes.string
});

export function getResidences(dispatch, onError) {
  return apiRequest('/api/residence', 'GET')
  .then((response) => { 
    dispatch(loadResidences(response.result.residences));
    return response.result;
  })
  .catch((err) => onError(err.errors));
}

export function createResidence(residence, dispatch, onError) {
  return apiRequest(`/api/residence`, 'POST', {residence})
  .then((response) => { 
    dispatch(loadResidences([response.result])); 
    return response.result;
  })
  .catch((err) => onError(err.errors));
}

export function updateResidence(oldResidence, newResidence, dispatch, onError) {
  if(oldResidence.id !== newResidence.id) throw new Error('todo');
  if(oldResidence !== newResidence) {
    const changedFields = compareObjects(oldResidence, newResidence);
    const residence = filterObjectByKey(newResidence, changedFields);
    return apiRequest(`/api/residence/${newResidence.id}`, 'PUT', {residence})
    .then((_) => { 
      dispatch(reloadResidence(newResidence));
      return newResidence;
    })
    .catch((err) => onError(err.errors));
  }
}

export function deleteResidence(id, dispatch, onError) {
  return apiRequest(`/api/residence/${id}`, 'DELETE')
  .then((_) =>{ 
    dispatch(removeResidence(id));
  })
  .catch((err) => onError(err.errors));
}