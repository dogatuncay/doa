export const LOAD_USERS = 'LOAD_USERS'
export const LOAD_CURRENT_USER = 'LOAD_CURRENT_USER'
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER'

export function loadUsers(users) {
  return { type: LOAD_USER, users };
}

export function loadCurrentUser(user) {
  return { type: LOAD_CURRENT_USER, user };
}

export function removeCurrentUser(userId) {
  return { type: REMOVE_CURRENT_USER, userId};
}