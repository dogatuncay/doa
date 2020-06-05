import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryParam, NumberParam, withDefault } from 'use-query-params';
import { useHistory } from "react-router-dom";
import mapRange from '../helpers/mapRange.js';
import fetchAPIGet from '../fetchAPIGet.js';
import { loadPlantsAlphabetically } from '../actions/plantActions.js';
import PlantList from '../components/PlantList.js'
import Spinner from '../components/Spinner.js'
import Pagination from '../components/Pagination.js';


const PAGE_SIZE = 100;

const PlantIndexPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [requestStatus, setRequestStatus] = useState('pending');
  const [page, setPage] = useQueryParam('page', withDefault(NumberParam, 1));

  const plants = useSelector((state) => state.plants);
  const plantsAlphabeticalIndex = useSelector((state) => state.plantsAlphabetically.index);
  const numOfPages = useSelector((state) => Math.ceil(state.plantsAlphabetically.count / PAGE_SIZE));

  useEffect(() => {
    getPlantsRequest(PAGE_SIZE, PAGE_SIZE*(page-1));
  }, [page]);

  function getPlantsRequest(limit, offset) {
    fetchAPIGet(`/api/plants?limit=${limit}&offset=${offset}`, 'GET')
    .then((response) => {
      const {plants, num_entries} = response.result;
      dispatch(loadPlantsAlphabetically(plants, offset, num_entries));
      setRequestStatus('loaded')
    })
    .catch((error) => {
      console.error(error);
      setRequestStatus('error');
    });
  }

  const plantIds = mapRange(PAGE_SIZE*(page-1), PAGE_SIZE*page, (i) => plantsAlphabeticalIndex[i]);
  const plantsOnPage = plantIds.map((id) => plants[id]).filter((x) => x);

  function onClick(plant) {
    history.push(`/plants/${plant.id}`);
  }

  switch(requestStatus) {
    case 'pending':
      return <Spinner />;
    case 'loaded':  
      return (
        <div className="plant-index">
          <PlantList data={plantsOnPage} onClick={(plant) => onClick(plant)} />
          <Pagination 
            page={page}
            maxPages={numOfPages} 
            onChange={setPage}
          />
        </div>
      );
    case 'error':
      return <div>there was an api error</div>;
    default:
      console.error('invalid request status');
      return <div></div>;
  }

}


export default PlantIndexPage;