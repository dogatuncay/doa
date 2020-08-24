import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { 
  getPlantsForResidence, 
  createPlantInstance, 
  updatePlantInstance, 
  deletePlantInstance 
} from '../api/plantInstance';
import { objFilter } from '../helpers/objectHelpers';
import PlantInstanceForm from '../components/PlantInstanceForm';
import PlantInstanceCard from '../components/PlantInstanceCard';
import Index from '../components/Index';

//TODO add the active request logic later
const PlantInstanceIndexPage = () => {
  const dispatch = useDispatch();
  const { residence_id } = useParams();

  useEffect(() => {
    getPlantsForResidence(residence_id, dispatch)
      .catch((err) => console.error(err));
  }, [residence_id]);

  return (
    <Index
      dataSelector={(state) => 
        objFilter(state.plantInstances, (_id, instance) => instance.residence_id !== residence_id)}
      createObject={createPlantInstance}
      getObject={(dispatch) => getPlantsForResidence(residence_id, dispatch)}
      form={(save, cancel) =>
          <PlantInstanceForm
            key="new-plant-instance"
            savePlantInstance={save}
            cancelPlantInstance={cancel} 
          />
        }
      card = {(dispatch, plantInstance, errors, updateErrors) =>
        <PlantInstanceCard 
          key={plantInstance.id}
          data={plantInstance}
          errors={errors}
          setData={(newPlantInstanceData) => {
            updatePlantInstance(residence_id, plantInstance[1], newPlantInstanceData, dispatch)
            .catch((err) => updateErrors(err));
            }
          }
          deletePlantInstance={(plant_instance_id) => {
              deletePlantInstance(residence_id, plant_instance_id, dispatch)
              .catch((err) => updateErrors(err));
            }
          }
        />
      }
    />
  );
}

export default PlantInstanceIndexPage;