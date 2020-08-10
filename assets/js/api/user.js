import apiRequest from './apiRequest.js';
import { loadCurrentUser, loadUserSearch, setFollowStatus } from '../actions/userActions.js';

export function getCurrentUser(dispatch, onError) {
  return apiRequest(`/api/sessions`, 'GET')
    .then((response) => {
      dispatch(loadCurrentUser(response.result));
    })
    .catch(onError);
}

export function createNewUser(data, dispatch) {
  return apiRequest('/api/user/new', 'POST', {user: data})
    .then((response) => {
      dispatch(loadCurrentUser(response.result));
    });
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

export function searchUser(searchText, limit, offset, dispatch) {
  return apiRequest('/api/user/search', 'POST', {
    filter: searchText,
    limit,
    offset
  })
  .then((response) => {
    const {users: responseUsers, num_entries} = response.result;
    const users = responseUsers.map(({user, am_following}) => ({ ...user, am_following }));
    dispatch(loadUserSearch(users, searchText, offset, num_entries));
    return response.result;
  });
}

export function followUser(id, follow, dispatch) {
  return apiRequest('/api/user', 'POST', {id, follow})
    .then((_) => {
      dispatch(setFollowStatus(id, follow));
    });
}