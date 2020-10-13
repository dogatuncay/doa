export const LOAD_COMMENTS = 'LOAD_COMMENTS'

export function loadComments(comments) {
  return { type: LOAD_COMMENTS, comments };
}
