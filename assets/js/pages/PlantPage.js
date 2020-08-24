import React, {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import Spinner from '../components/Spinner'
import { getPlant } from '../api/plant';

const PlantPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const plant = useSelector((state) => state.plants[id]);

  useEffect(() => {
    if(!plant) {
      getPlant(id, dispatch)
      .catch((err) => console.error(err.errors));
    }
  }, [id, plant]);

  function showInfo(infoLabel, info) {
    if(info !== null && info !== '')
      return <div key={infoLabel}>{infoLabel}: {info}</div>;
  }

  if(plant) {
    return (
      <div className="plant-page">
        <div>{showInfo('Accepted Symbol', plant.accepted_symbol)}</div>
        <div>{showInfo('Synonym Symbol', plant.synonym_symbol)}</div>
        <div>{showInfo('Scientific Name', plant.scientific_name)}</div>
        <div>{showInfo('Common Name', plant.common_name)}</div>
        <div>{showInfo('Floristic Area', plant.plants_floristic_area)}</div>
        <div>{showInfo('State and Province', plant.state_and_province)}</div>
        <div>{showInfo('Fact Sheets', plant.fact_sheets)}</div>
        <div>{showInfo('Plant Guides', plant.plant_guides)}</div>
        <div>{showInfo('Characterics Data', plant.characteristics_data)}</div>
        <div>{showInfo('Adapted to Coarse Soil', plant.adapted_to_coarse_soil)}</div>
        <div>{showInfo('Adapted to Medium Soil', plant.adapted_to_medium_soil)}</div>
        <div>{showInfo('Adapted to Fine Soil', plant.adapted_to_fine_soil)}</div>
        <div>{showInfo('Anaerobic Tolerance', plant.anaerobic_tolerance)}</div>
        <div>{showInfo('CaCO3 Tolerance', plant.calcium_carbonate_tolerance)}</div>
        <div>{showInfo('Cold Stratification Required', plant.cold_stratification_required)}</div>
        <div>{showInfo('Drought Tolerance', plant.drought_tolerance)}</div>
        <div>{showInfo('Fertility Requirement', plant.fertility_requirement)}</div>
        <div>{showInfo('Minimum Frost Free Days', plant.min_frost_free_days)}</div>
        <div>{showInfo('Hedge Tolerance', plant.hedge_tolerance)}</div>
        <div>{showInfo('Moisture Use', plant.moisture_use)}</div>
        <div>{showInfo('Minimum PH',plant.min_ph)}</div>
        <div>{showInfo('Maximum PH', plant.max_ph)}</div>
        <div>{showInfo('Minimum Precipitation', plant.min_precipitation)}</div>
        <div>{showInfo('Maximum Precipitation', plant.max_precipitation)}</div>
        <div>{showInfo('Minimum Root Depth', plant.min_root_depth)}</div>
        <div>{showInfo('Salinity Tolerance', plant.salinity_tolerance)}</div>
        <div>{showInfo('Shade Tolerance', plant.shade_tolerance)}</div>
        <div>{showInfo('Minimum Temperature', plant.min_temperature)}</div>
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default PlantPage;