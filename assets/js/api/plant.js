import apiRequest from './apiRequest.js';
import { loadPlantsSearch, loadPlantsAlphabetically, loadPlants } from '../actions/plantActions.js';

export function searchPlant(searchText, limit, offset, dispatch, onError) {
  return apiRequest(`/api/plant?filter=${searchText}&limit=${limit}&offset=${offset}`, 'GET')
    .then((response) => {
      const {plants, num_entries} = response.result;
      dispatch(loadPlantsSearch(plants, searchText, offset, num_entries));
      return response.result;
    })
    .catch(onError);
}

export function getPlantsAlphabetically(limit, offset, dispatch, onError) {
  return apiRequest(`/api/plant?limit=${limit}&offset=${offset}`, 'GET')
    .then((response) => {
      const {plants, num_entries} = response.result;
      dispatch(loadPlantsAlphabetically(plants, offset, num_entries));
      return response.result;
    })
    .catch(onError);
}

export function getPlant(id, dispatch, onError) {
  apiRequest(`/api/plant/${id}`, 'GET')
  .then((response) => {
    dispatch(loadPlants([response.result.plant]));
    return response.result.plant;
  })
  .catch(onError);
}