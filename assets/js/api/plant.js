import apiRequest from './apiRequest.js';
import { loadPlantsSearch, loadPlantsAlphabetically } from '../actions/plantActions.js';

export function searchPlant(searchText, limit, offset, dispatch, onError) {
  return apiRequest('/api/plants/search', 'POST', {
    filter: searchText,
    limit,
    offset
  })
    .then((response) => {
      const {plants, num_entries} = response.result;
      dispatch(loadPlantsSearch(plants, searchText, offset, num_entries));
    })
    .catch(onError);
}

export function getPlantsAlphabetically(limit, offset, dispatch, onError) {
  return apiRequest(`/api/plants?limit=${limit}&offset=${offset}`, 'GET')
    .then((response) => {
      const {plants, num_entries} = response.result;
      dispatch(loadPlantsAlphabetically(plants, offset, num_entries));
    })
    .catch(onError);
}