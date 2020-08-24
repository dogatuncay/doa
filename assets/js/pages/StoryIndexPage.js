import React from 'react';
import { useHistory } from "react-router-dom";
import { getStories, updateStory, deleteStory, createStory } from '../api/story';
import Form from '../components/Form';
import Index from '../components/Index';
import Card from '../components/Card';

const StoryIndexPage = () => {
  const history = useHistory();

  function onClick(data) {
    history.push(`/story/${data.id}`);
  }

  const schema = {
    title: {
      label: 'Title',
      defaultValue: ''
    },
    body: {
      label: 'Body',
      defaultValue: ''
    }
  }
  
  const validations = {
    title: function(title) {
      if(title.length === 0) {
        return ["Title can't be blank"];
      }
      return []; 
    },
    body: function(body) {
      if(body.length <= 140) {
        return ['Please write at least 140 characters.'];
      }
      return []; 
    }
  }

  return (
    <Index
      dataSelector={(state) => state.stories}
      createObject={createStory}
      getObject={getStories}
      form={(save, cancel) =>
        <Form
          key="new-story"
          saveForm={save}
          cancelForm={cancel}
          schema={schema}
        />
        }
      card = {(dispatch, story, errors, updateErrors) =>
        <Card 
          key={story.id} 
          data={story}
          errors={errors}
          setData={(newStoryData) => {
              updateStory(story, newStoryData, dispatch)
              .catch(updateErrors);
            }
          }
          deleteObject={(storyId) => deleteStory(storyId, dispatch, updateErrors)}
          onClick={onClick}
          schema={schema}
          validations={validations}
        />
      }
    />
  );
}

export default StoryIndexPage;