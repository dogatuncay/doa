import {
  LOAD_STORIES,
  RELOAD_STORY,
  REMOVE_STORY,
  LOAD_STORY_COMMENTS
} from '../actions/storyActions';

export function stories(state = {}, action) {
  const newState = {...state};
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
    case LOAD_STORY_COMMENTS:
      newState[action.story_id] = {...state[action.story_id], comments: action.commentsData};
      return newState;
    default:
      return state;
  }
}

     