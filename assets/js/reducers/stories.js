import {
  LOAD_STORIES,
  RELOAD_STORY,
  REMOVE_STORY
} from '../actions/storyActions';

export function stories(state = {}, action) {
  let newState = {...state};
  switch (action.type) {
    case LOAD_STORIES:
      action.storyData.forEach((story) => newState[story.id] = story);
      return newState;
    case RELOAD_STORY:
      return {
        ...state,
        [action.newStoryData.id]: action.newStoryData
      }
    case REMOVE_STORY:
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
}