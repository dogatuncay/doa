import React from 'react';
import { useHistory } from "react-router-dom";
import { 
  getResidences, 
  createResidence, 
  updateResidence, 
  deleteResidence 
} from '../api/residence';
import Form from '../components/Form';
import Card from '../components/Card';
import Index from '../components/Index';

const ResidenceIndexPage = () => {
  const history = useHistory();

  function onClick(data) {
    history.push(`/residence/${data.id}/plant`);
  }

  const schema = {
    title: {
      label: 'Title',
      defaultValue: ''
    },
    zipcode: {
      label: 'Zipcode',
      defaultValue: '00000'
    }
  }
  
  const validations = {
    title: function(title) {
      if(title.length > 40) {
        return ['Maximum size of 40 is exceeded.'];
      }
      return []; 
    },
    zipcode: function(zipcode) {
      if(/^\d{5}(-\d{4})?$/.test(zipcode)) {
        return []; 
      } else {
        return ['Invalid format'];
      }
    }
  }

  return (
    <Index
      dataSelector={(state) => state.residences}
      createObject={createResidence}
      getObject={getResidences}
      form={(save, cancel) =>
        <Form
          key="new-story"
          saveForm={save}
          cancelForm={cancel}
          schema={schema}
        />
        }
      card = {(dispatch, residence, errors, updateErrors) =>
        <Card 
          key={residence.id} 
          data={residence}
          errors={errors}
          setData={(newResidenceData) => {
            updateResidence(residence, newResidenceData, dispatch)
              .catch(updateErrors);
            }
          }
          deleteObject={(residenceId) => deleteResidence(residenceId, dispatch, updateErrors)}
          onClick={onClick}
          schema={schema}
          validations={validations}
        />
      }
    />
  );
}

export default ResidenceIndexPage;