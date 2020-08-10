import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {useParams} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faWindowClose, faCheck } from '@fortawesome/free-solid-svg-icons';
import { StoryPropType } from '../api/story.js'
import InputField from '../components/InputField.js';

const validations = {
  title: function(title) {
    if(title.length > 40) {
      return ['Maximum size of 40 is exceeded.'];
    }
    return []; 
  },
  body: function(body) {
    return [];
  }
}

const Story = ({data, setData, errors: apiErrors, deleteStory, onClick}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(data);
  const { story_id } = useParams();

  const getDataSource = () => isEditing ? editData : data;
  const setDataSource = (value) => isEditing ? setEditData(value) : setData(value);
  const updateField = (name, value) => setDataSource({ ...getDataSource(), [name]: value });

  function beginEditing() {
    setEditData(data);
    setIsEditing(true);
  }

  function saveEdits() {
    setData(editData);
    setIsEditing(false);
  }

  function cancelEdits() {
    setIsEditing(false);
  }

  function viewStory(id) {
    // TODO: use history.push instead
    // window.location.href = `http://localhost:4000/lists/${id}`;
  }

  function renderField(label, field) {
    const value = getDataSource()[field];
    const apiErrs = apiErrors && field in apiErrors ? [apiErrors[field]] : '';
    const valErrs = validations[field](value);
    const errors = apiErrs.concat(valErrs);

    if(isEditing) {
      return (
        <InputField 
          label={label}
          name={field}
          value={value} 
          errors={errors} 
          onChange={updateField} />
      );
    } else {
      return (
      <div 
        className={`story-${field}`} 
        onClick={() => onClick(data)}>
        {value}
      </div>);
    }
  }

  const editControls = (
    <div className='story-icons'>
      <FontAwesomeIcon icon={faCheck} onClick={() => saveEdits()}/>
      <FontAwesomeIcon icon={faWindowClose} onClick={() => cancelEdits()}/>
    </div>
  );
  const mainControls = (
    <div className='story-icons'>
      <FontAwesomeIcon icon={faEdit} onClick={() => beginEditing()}/>
      <FontAwesomeIcon icon={faTrash} onClick={() => deleteStory(data.id)}/>
    </div>
  );
  const controls = isEditing ? editControls : mainControls;
  
  return (
    <div>
      {renderField('Title', 'title')}
      {renderField('Body', 'body')}
      {controls}
    </div>
  );
}

Story.propTypes = {
  data: StoryPropType,
  setData: PropTypes.func.isRequired,
  apiErrors: PropTypes.object,
  deleteStory: PropTypes.func.isRequired
};

export default Story;