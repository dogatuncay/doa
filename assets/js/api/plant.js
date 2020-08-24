import apiRequest from './apiRequest';
import { loadPlantsSearch, loadPlantsAlphabetically, loadPlants } from '../actions/plantActions';

export function searchPlant(searchText, limit, offset, dispatch) {
  return apiRequest(`/api/plant?filter=${searchText}&limit=${limit}&offset=${offset}`, 'GET')
    .then((response) => {
      const {plants, num_entries} = response.result;
      dispatch(loadPlantsSearch(plants, searchText, offset, num_entries));
      return response.result;
    })
}

export function getPlantsAlphabetically(limit, offset, dispatch) {
  return apiRequest(`/api/plant?limit=${limit}&offset=${offset}`, 'GET')
    .then((response) => {
      const {plants, num_entries} = response.result;
      dispatch(loadPlantsAlphabetically(plants, offset, num_entries));
      return response.result;
    })
}

export function getPlant(id, dispatch) {
  apiRequest(`/api/plant/${id}`, 'GET')
  .then((response) => {
    dispatch(loadPlants([response.result.plant]));
    return response.result.plant;
  })
}