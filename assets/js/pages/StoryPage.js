import React, {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import Spinner from '../components/Spinner'
import { getStory } from '../api/story';

const StoryPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const story = useSelector((state) => state.stories[id]);

  useEffect(() => {
    if(!story || !story.body) {
      getStory(dispatch, id)
      .catch((err) => console.error(err.errors));
    }
  }, [id]);

  if(story) {
    return (
      <div className="StoryPage">
        <div className="story-title">{story.title}</div>
        <div>{story.body}</div>
        <div>
          TODO: Controls 
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default StoryPage;