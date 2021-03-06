import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faWindowClose, faCheck } from '@fortawesome/free-solid-svg-icons';
import InputField from '../components/InputField';

const Card = ({data, setData, errors: apiErrors, deleteObject, onClick, schema, validations}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(data);

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

  function renderField(label, field) {
    const value = getDataSource()[field];
    const apiErrs = apiErrors && field in apiErrors ? [apiErrors[field]] : '';
    const valErrs = validations ? validations[field](value) : '';
    const errors = apiErrs.concat(valErrs);

    if(isEditing) {
      return (
        <InputField 
          key={field}
          label={label}
          name={field}
          value={value} 
          errors={errors} 
          onChange={updateField} />
      );
    } else {
      return (
        <div key={field} className={`card-${field}`} onClick={() => onClick(data)}>
          {value}
        </div>
      );
    }
  }

  const editControls = (
    <div className='card-icons'>
      <FontAwesomeIcon icon={faCheck} onClick={() => saveEdits()}/>
      <FontAwesomeIcon icon={faWindowClose} onClick={() => cancelEdits()}/>
    </div>
  );
  const mainControls = (
    <div className='card-icons'>
      <FontAwesomeIcon icon={faEdit} onClick={() => beginEditing()}/>
      <FontAwesomeIcon icon={faTrash} onClick={() => deleteObject(data.id)}/>
    </div>
  );
  const controls = isEditing ? editControls : mainControls;
  
  return (
    <div>
      {Object.keys(schema).map((field) => 
        renderField(schema[field].label, field)
      )}
      {controls}
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  errors: PropTypes.object,
  deleteObject: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  validations: PropTypes.object
};

export default Card;