import React, {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import Spinner from '../components/Spinner';
import Comments from '../components/Comments';
import { getStory } from '../api/story';
import { getComments } from '../api/comment';

const StoryPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const story = useSelector((state) => state.stories[id]);
  const comments = story && story.comments ? story.comments : [];

  useEffect(() => {
    if(!story || !story.body) {
      getStory(dispatch, id)
      .catch((err) => console.error(err.errors));
    }
  }, [id]);

  useEffect(() => {
    if(story === null || story === undefined || story.comments === null || story.comments === undefined) {
      getComments(dispatch, id)
      .catch((err) => console.error(err.errors));
    }
  }, [id]);

  const commentsElement = comments ? <Comments data={comments}></Comments> : <Spinner />
 
  if(story) {
    return (
      <div className="StoryPage">
        <div className="story-title">{story.title}</div>
        <div>{story.body}</div>
        <div>
          TODO: Controls 
        </div>
        <div className="comments">
          {commentsElement}
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default StoryPage;