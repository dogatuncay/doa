import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getResidences, createResidence, updateResidence, deleteResidence } from '../api/residence.js';
import NewResidence from '../components/NewResidence.js';
import Residence from '../components/Residence.js';
import Spinner from '../components/Spinner.js'

const ResidenceIndexPage = () => {
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const residences = useSelector((state) => state.residences);
  const [activeRequest, setActiveRequest] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setActiveRequest(true);
    getResidences(dispatch, (err) => console.error(err))
      .then(() => (setActiveRequest(false)));
  }, []);

  function beginCreatingResidence() {
    setIsEditing(true);
  }

  function cancelChanges() {
    setIsEditing(false);
  }

  function onClick(residence) {
    history.push(`/residences/${residence.id}/plants`);
  }

  let newResidenceElement;
  if(isEditing) {
    newResidenceElement = (
      <NewResidence
        key="new-residence"
        saveResidence={(residenceData) => { 
          createResidence(residenceData, dispatch, (err) => console.error(err))
          .then(()=> (setIsEditing(false)))
          }
        } 
        cancelResidence={() => cancelChanges()}
      />
    );
  }
  else {
    newResidenceElement = <FontAwesomeIcon icon={faPlus} onClick={() => beginCreatingResidence()}/>
  }

  const residenceEntries = Object.entries(residences).map((residence) => {
    return (
      <Residence 
        key={residence[1].id} 
        data={residence[1]}
        errors={errors}
        setData={(newResidenceData) => updateResidence(residence[1], newResidenceData, dispatch, (err) => setErrors(err))}
        deleteResidence={(residence_id) => deleteResidence(residence_id, dispatch, (err) => setErrors(err))}
        onClick={(residence) => onClick(residence)}
      />
    ); 
  });
  if(activeRequest) {
    return (<Spinner />);
  }
  else {
    return ( 
      <div className='residence-icons'>
        <div>MY RESIDENCES</div>
        <br/>
        {residenceEntries}
        {newResidenceElement}
      </div>
    );
  }
}

export default ResidenceIndexPage;