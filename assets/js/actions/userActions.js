export const LOAD_USERS = 'LOAD_USERS'
export const LOAD_CURRENT_USER = 'LOAD_CURRENT_USER'
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER'
export const LOAD_USER_SEARCH = 'LOAD_USER_SEARCH'
export const SET_FOLLOW_STATUS = 'SET_FOLLOW_STATUS'
export const TOGGLE_PRIVACY = 'TOGGLE_PRIVACY'

export function loadUsers(users) {
  return { type: LOAD_USERS, users };
}

export function loadCurrentUser(user) {
  return { type: LOAD_CURRENT_USER, user };
}

export function removeCurrentUser() {
  return { type: REMOVE_CURRENT_USER};
}

export function loadUserSearch(users, searchTerm, offset, count) {
  return { type: LOAD_USER_SEARCH, users, searchTerm, offset, count };
}

export function setFollowStatus(userId, amFollowing) {
  return { type: SET_FOLLOW_STATUS, userId, amFollowing };
}

export function togglePrivacy(id) {
  return { type: TOGGLE_PRIVACY, id};
}
