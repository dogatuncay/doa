import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PlantList = ({data, onClick}) => {
  const plants = data.map((plant) => {
    return (
      <div key={plant.id} className="plant-view" onClick={() => onClick(plant)}>
         {plant.scientific_name}  ({plant.common_name})
      </div>
    ); 
  });

  return (
    <div>
      {plants}
    </div>
  );
}

PlantList.propTypes = {
  data: PropTypes.array.isRequired
};

export default PlantList;