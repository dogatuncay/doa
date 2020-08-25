import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../components/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Index = ({dataSelector, createObject, getObject, form, card}) => {
  const dispatch = useDispatch();
  const data = useDefaultSelector({}, dataSelector);
  const [isEditing, setIsEditing] = useState(false);
  const [activeRequest, setActiveRequest] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setActiveRequest(true);
    getObject(dispatch)
      .then(() => (setActiveRequest(false)))
      .catch((err) => console.error(err));
  }, []);

  function useDefaultSelector(defaultValue, fun) {
    const selectedValue = useSelector(fun);
    if(selectedValue === null || selectedValue === undefined) {
      console.warn('something went wrong in the state');
      return defaultValue;
    } else {
      return selectedValue
    }
  }

  function beginCreating() {
    setIsEditing(true);
  }

  function cancelChanges() {
    setIsEditing(false);
  }

  const cardElements = Object.entries(data).map((dataPoint) => {
    return (
      card(dispatch, dataPoint[1], errors, setErrors)
    ); 
  });

  let formElement;
  if(isEditing) {
     const saveData = (dataToSave) => {
      createObject(dataToSave, dispatch)
        .then(()=> (setIsEditing(false)))
        .catch((err) => console.error(err));
    };
    formElement = form(saveData, cancelChanges);
  }
  else {
    formElement = <FontAwesomeIcon icon={faPlus} onClick={() => beginCreating()}/>
  }

  if(activeRequest) {
    return (<Spinner />);
  }
  else {
    return ( 
      <div className='index-icons'>
        {cardElements}
        {formElement}
      </div>
    );
  }
}

Index.propTypes = {
  dataSelector: PropTypes.func.isRequired,
  createObject: PropTypes.func.isRequired,
  getObject: PropTypes.func.isRequired,
  errors: PropTypes.object,
  form: PropTypes.func.isRequired,
  card: PropTypes.func.isRequired
};

export default Index;