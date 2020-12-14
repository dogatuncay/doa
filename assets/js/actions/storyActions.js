export const LOAD_STORIES = 'LOAD_STORIES'
export const RELOAD_STORY = 'RELOAD_STORY'
export const REMOVE_STORY = 'REMOVE_STORY'
export const LOAD_STORY_COMMENTS = 'LOAD_STORY_COMMENTS'

export function loadStories(storyData) {
  return { type: LOAD_STORIES, storyData }
}

export function loadStoryComments(story_id, commentsData) {
  return { type: LOAD_STORY_COMMENTS, story_id, commentsData }
}

export function reloadStory(newStoryData) {
  return { type: RELOAD_STORY, newStoryData }
}

export function removeStory(id) {
  return { type: REMOVE_STORY, id}
}
