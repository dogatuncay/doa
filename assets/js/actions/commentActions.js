export const LOAD_COMMENTS = 'LOAD_COMMENTS'

export function loadComments(story_id, commentsData) {
  return { type: LOAD_COMMENTS, story_id, commentsData };
}
