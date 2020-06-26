import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSelector } from 'reselect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { 
  getPlantsForResidence, 
  createPlantInstance, 
  updatePlantInstance, 
  deletePlantInstance 
} from '../api/plantInstance.js';
import { objFilter } from '../helpers/objectHelpers.js';
import Spinner from '../components/Spinner.js';
import NewPlantInstance from '../components/NewPlantInstance.js';
import PlantInstance from '../components/PlantInstance.js';

const selectResidencePlants = createSelector (
  state => state.plantInstances,
  plantInstances => objFilter(plantInstances, (_id, instance) => instance.residence_id !== residence_id)
);

const PlantInstanceIndexPage = () => {
  const dispatch = useDispatch();
  const { residence_id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [activeRequest, setActiveRequest] = useState(false);
  const [errors, setErrors] = useState({});

  const plantInstances = useSelector(state => 
    objFilter(state.plantInstances, (_id, instance) => instance.residence_id !== residence_id));
  const plants = useSelector(state => state.plants);

  useEffect(() => {
    setActiveRequest(true);
    getPlantsForResidence(residence_id, dispatch, (err) => console.error(err))
      .then(() => (setActiveRequest(false)));
  }, [residence_id]);

  function beginCreatingPlantInstance() {
    setIsEditing(true);
  }

  function cancelChanges() {
    setIsEditing(false);
  }

  let newPlantInstanceElement;
  if(isEditing) {
    newPlantInstanceElement = (
      <NewPlantInstance
        key="new-plant-instance"
        savePlantInstance={(plantInstanceData) => { 
          createPlantInstance(residence_id, plantInstanceData, dispatch, (err) => console.error(err))
          .then(()=> (setIsEditing(false)))
          }
        }
        cancelPlantInstance={() => cancelChanges()} 
      />
    );
  }
  else {
    newPlantInstanceElement = <FontAwesomeIcon icon={faPlus} onClick={() => beginCreatingPlantInstance()}/>
  }

  const plantInstanceEnties = Object.entries(plantInstances).map((plantInstance) => {
    const plant = objFilter(plants, (_id, instance) => instance.id === plantInstance[1].plant_id);
    return (
      <PlantInstance 
        key={plantInstance[1].id} 
        data={plantInstance[1]}
        plantData={plant[Object.keys(plant)[0]]}
        errors={errors}
        setData={(newPlantInstanceData) => updatePlantInstance(residence_id, plantInstance[1], newPlantInstanceData, dispatch, (err) => setErrors(err))}
        deletePlantInstance={(plant_instance_id) => deletePlantInstance(residence_id, plant_instance_id, dispatch, (err) => setErrors(err))}
      />
    ); 
  });

  if(activeRequest) {
    return (<Spinner />);
  }
  else {
    return ( 
      <div className='plant-instance'>
        <div>MY PLANTS</div>
        <br/>
        {plantInstanceEnties}
        {newPlantInstanceElement}
      </div>
    );
  }
}

export default PlantInstanceIndexPage;