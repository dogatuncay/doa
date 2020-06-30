export const LOAD_STORIES = 'LOAD_STORIES'
export const RELOAD_STORY = 'RELOAD_STORY'
export const REMOVE_STORY = 'REMOVE_STORY'

export function loadStories(storyData) {
  return { type: LOAD_STORIES, storyData }
}

export function reloadStory(newStoryData) {
  return { type: RELOAD_STORY, newStoryData }
}

export function removeStory(id) {
  return { type: REMOVE_STORY, id}
}
