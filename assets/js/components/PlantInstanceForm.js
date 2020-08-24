import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AsyncPaginate } from 'react-select-async-paginate';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faCheck, faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import InputField from '../components/InputField';
import { searchPlant } from '../api/plant';


const PLANT_OPTIONS_WIDTH = 20;

function loadPlantOptions(search, loadedOptions) {
  let error = null;
  const onError = (err) => {
    console.error('Got error while loading plant options:', err);
    error = err;
  };
  const noop = () => null;
  const offset = loadedOptions.length;

  return searchPlant(search, PLANT_OPTIONS_WIDTH, offset, noop)
    .then(({plants, num_entries}) => {
      if(error !== null) {
        throw error;
      } else {
        return {
          hasMore: offset + plants.length < num_entries,
          options: plants.map((plant) => ({
            value: plant.id,
            label: `${plant.common_name} (${plant.scientific_name})`
          }))
        };
      }
    })
    .catch((error) => console.error(error));
}

// async function loadPlantOptions(search, loadedOptions) {
//
//   let error = null;
//   const onError = (err) => {
//     console.error('Got error while loading plant options:', err);
//     error = err;
//   };
//   const noop = () => null;
//   const offset = loadedOptions.length;
//
//   const {plants, num_entries} = await searchPlant(search, PLANT_OPTIONS_WIDTH, offset, noop, onError);
//
//   if(error !== null) {
//     throw error;
//   } else {
//     return {
//       hasMore: offset + plants.length < num_entries,
//       options: plants.map((plant) => ({
//         value: plant.id,
//         label: `${plant.common_name} (${plant.scientific_name})`
//       }))
//     };
//   }
// }


const PlantInstanceForm = ({savePlantInstance, cancelPlantInstance}) => {
  const light_requirement_options = [
    {label: "Full Sun", value: 0},
    {label: "Bright", value: 1},
    {label: "Light Shade", value: 2},
    {label: "Partial Shade", value: 3}, 
    {label: "Full Shade", value: 4}
  ];
  const [data, setData] = useState({
    note: '',
    is_containerized: false,
    is_indoor: false,
    light_requirement: null
  });
  const [plantSelection, setPlantSelection] = useState(null);
  const [errors, setErrors] = useState({});

  function save() {
    setErrors({});
    savePlantInstance({
      ...data,
      plant_id: plantSelection.value
    });
  }

  function cancel() {
    cancelPlantInstance();
  }

  function updateField(name, value) {
    setData({ ...data, [name]: value });
  }

  function checkField(name) {
    setData({ ...data, [name]: !data[name] });
  }

  return (
    <div>
      <AsyncPaginate
        defaultOptions
        escapeClearsValue
        isClearable
        placeholder = "Select Plant..."
        value={plantSelection}
        onChange={setPlantSelection}
        loadOptions={loadPlantOptions} />
      <InputField 
        label='Note'
        name='note' 
        value={data['note']} 
        errors={'note' in errors ? errors['note'] : ''} 
        onChange={updateField} />
      <Select
        className="dropdown-light-requirements"
        options={light_requirement_options}
        onChange={(option) => updateField('light_requirement', option['value'])}
      />
      Is Containerized?
      <FontAwesomeIcon icon={data.is_containerized ? faCheckSquare : faSquare} onClick={() => checkField('is_containerized')}/>
      Is Indoor?
      <FontAwesomeIcon icon={data.is_indoor ? faCheckSquare : faSquare} onClick={() => checkField('is_indoor')}/>
      Save
      <FontAwesomeIcon icon={faCheck} onClick={() => save()}/>
      Cancel
      <FontAwesomeIcon icon={faWindowClose} onClick={() => cancel()}/>
    </div>
    );
};

PlantInstanceForm.propTypes = {
  savePlantInstance: PropTypes.func.isRequired,
  cancelPlantInstance: PropTypes.func.isRequired
};

export default PlantInstanceForm;
