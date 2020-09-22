import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faWindowClose, faCheck } from '@fortawesome/free-solid-svg-icons';
import InputField from './InputField';

const PlantInstanceCard = ({data, setData, errors, deletePlantInstance}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(data);
  const getDataSource = () => isEditing ? editData : data;
  const setDataSource = (value) => isEditing ? setEditData(value) : setData(value);
  const updateField = (name, value) => setDataSource({ ...getDataSource(), [name]: value });
  const plant = useSelector(state => state.plants[data.plant_id]);
  const getPlantField = (field) => plant && (field in plant) ? plant[field] : null;

  
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

    if(isEditing) {
      return (
        <InputField 
          label={label}
          name={field}
          value={value} 
          errors={errors && field in errors ? [errors[field]] : ''} 
          onChange={updateField} />
      );
    } else {
      return (
      <div className={`plant-instance-${field}`}>
        {field}: {value}
      </div>);
    }
  }

  const editControls = (
    <div>
      <FontAwesomeIcon icon={faCheck} onClick={() => saveEdits()}/>
      <FontAwesomeIcon icon={faWindowClose} onClick={() => cancelEdits()}/>
    </div>
  );
  const mainControls = (
    <div>
      <FontAwesomeIcon icon={faEdit} onClick={() => beginEditing()}/>
      <FontAwesomeIcon icon={faTrash} onClick={() => deletePlantInstance(data.id)}/>
    </div>
  );
  const controls = isEditing ? editControls : mainControls;
  
  return (
    <div>
      <div>{getPlantField('scientific_name')} ({getPlantField('common_name')})</div>
      {renderField('Note', 'note')}
      {controls}
    </div>
  );
  
}

PlantInstanceCard.propTypes = {
  // data: PlantInstancePropType,
  setData: PropTypes.func.isRequired,
  apiErrors: PropTypes.object,
  deletePlantInstance: PropTypes.func.isRequired
};

export default PlantInstanceCard;