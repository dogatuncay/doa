import apiRequest from './apiRequest';
import { loadCurrentUser, loadUserSearch, setFollowStatus } from '../actions/userActions';

export function getCurrentUser(dispatch, onError) {
  return apiRequest(`/api/session`, 'GET')
    .then((response) => {
      dispatch(loadCurrentUser(response.result));
    })
    .catch((err) => {console.log(err); onError(err.errors)});
}

export function createNewUser(data, dispatch) {
  return apiRequest('/api/user', 'POST', {user: data})
    .then((response) => {
      dispatch(loadCurrentUser(response.result));
    });
}

export function signOut(dispatch, onError) {
  return apiRequest('/api/session', 'DELETE')
    .then((_) => {
      console.log("ben bu iste ustayim")
      dispatch(removeCurrentUser());
    })
    .catch((err) => onError(err.errors));
}

export function signIn(data, dispatch) {
  return apiRequest('/api/session', 'POST', {session: data})
    .then((response) => {
      dispatch(loadCurrentUser(response.result));
    });
}

export function changePassword(data) {
  return apiRequest('/api/user/change_password', 'POST', {user: data})
    .then((response) => {
      console.log(response);
    });
}

export function searchUser(searchText, limit, offset, dispatch) {
  return apiRequest(`/api/user?filter=${searchText}&limit=${limit}&offset=${offset}`, 'GET')
  .then((response) => {
    const {users: responseUsers, num_entries} = response.result;
    const users = responseUsers.map(({user, am_following}) => ({ ...user, am_following }));
    dispatch(loadUserSearch(users, searchText, offset, num_entries));
    return response.result;
  });
}

export function followUser(id, follow, dispatch) {
  return apiRequest(`/api/user/${id}`, 'PUT', {follow})
    .then((_) => {
      dispatch(setFollowStatus(id, follow));
    });
}