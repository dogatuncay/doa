import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createStory } from '../api/story.js';
import InputField from '../components/InputField.js';
import Button from 'react-bootstrap/Button';

const NewStory = ({done}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    title: '',
    body: ''
  });
  const [errors, setErrors] = useState({});

  function save() {
    setErrors({});
    createStory(data, dispatch)    
    .then(() => done())
    .catch((err) => err.errors ? setErrors(err.errors) : setErrors(err));
  }

  function updateField(name, value) {
    setData({ ...data, [name]: value });
  }

  return (
    <div>
      <InputField 
        label='Title'
        name='title' 
        value={data['title']} 
        errors={errors && 'title' in errors ? errors['title'] : ''} 
        onChange={updateField} />
      <InputField 
        label='Body'
        name='body' 
        value={data['body']} 
        errors={errors && 'body' in errors ? errors['body'] : ''} 
        onChange={updateField} />
      <Button variant="primary" onClick={save}>Save</Button>
      <Button variant="primary" onClick={done}>Cancel</Button>
    </div>
    );
}

NewStory.propTypes = {
  done: PropTypes.func.isRequired
};
export default NewStory;
