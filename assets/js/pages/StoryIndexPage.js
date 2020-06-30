import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getStories, updateStory, deleteStory } from '../api/story.js';
import NewStory from '../components/NewStory.js';
import Story from '../components/Story.js';
import Spinner from '../components/Spinner.js'

const StoryIndexPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories);
  const [activeRequest, setActiveRequest] = useState(false);
  const [errors, setErrors] = useState({});
  const [beginCreatingStory, setBeginCreatingStory] = useState(false);

  useEffect(() => {
    setActiveRequest(true);
    getStories(dispatch, (err) => console.error(err))
      .then(() => (setActiveRequest(false)));
  }, []);

  function viewStory(story) {
    history.push(`/stories/${story.id}`);
  }

  const storyEntries = Object.entries(stories).map((story) => {
    return (
      <Story 
        key={story[1].id} 
        data={story[1]}
        errors={errors}
        setData={(newStoryData) => updateStory(story[1], newStoryData, dispatch, (err) => setErrors(err))}
        deleteStory={(story_id) => deleteStory(story_id, dispatch, (err) => setErrors(err))}
        onClick={(story) => viewStory(story)}
      />
    ); 
  });

  const newStoryElement = beginCreatingStory ? 
    (<NewStory done={() => setBeginCreatingStory(!beginCreatingStory)}/>)
    : (<FontAwesomeIcon icon={faPlus} onClick={() => setBeginCreatingStory(true)}/>);

  if(activeRequest) {
    return (<Spinner />);
  }
  else {
    return ( 
      <div className='story-icons'>
        <div>MY STORIES</div>
        <br/>
        {storyEntries}
        {newStoryElement}
      </div>
    );
  }
}

export default StoryIndexPage;