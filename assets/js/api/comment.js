import apiRequest from '../api/apiRequest';
import { loadComments } from '../actions/commentActions';
import { loadStoryComments } from '../actions/storyActions';

export function getComments(story_id, dispatch) {
  return apiRequest(`/api/story/${story_id}/comment`, 'GET')
  .then((response) => { 
    dispatch(loadComments(story_id, response.result.comments));
    dispatch(loadStoryComments(story_id, response.result.comments));
    return response.result;
  });
}

export function createComment(story_id, body, parent_comment, dispatch) {
  return apiRequest(`/api/story/${story_id}/comment`, 'POST', {comment: {body, parent_comment}})
  .then((response) => { 
    dispatch(loadComments(story_id, [response.result]));
    dispatch(loadStoryComments(story_id, [response.result]));
    return response.result;
  });
}