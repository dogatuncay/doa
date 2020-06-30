import apiRequest from './apiRequest.js';
import { loadCurrentUser } from '../actions/userActions.js';

export function getCurrentUser(dispatch, onError) {
  return apiRequest(`/api/sessions`, 'GET')
    .then((response) => {
      dispatch(loadCurrentUser(response.result));
    })
    .catch(onError);
}

export function createNewUser(data, dispatch, onError) {
  return apiRequest('/api/user/new', 'POST', {user: data})
    .then((response) => {
      dispatch(loadCurrentUser(response.result));
    })
    .catch((err) => onError(err.errors));
}

export function signOut(id, dispatch, onError) {
  return apiRequest('/api/sessions', 'DELETE')
    .then((_) => {
      dispatch(removeCurrentUser(id));
    })
    .catch((err) => onError(err.errors));
}

export function signIn(data, dispatch) {
  return apiRequest('/api/sessions', 'POST', {session: data})
    .then((response) => {
      dispatch(loadCurrentUser(response.result));
    });
}

export function changePassword(data, onError) {
  return apiRequest('/api/user/change_password', 'POST', {user: data})
    .then((response) => {
      console.log(response);
    })
    .catch((err) => onError(err.errors));
}