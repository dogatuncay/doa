import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryParam, NumberParam, withDefault } from 'use-query-params';
import { useHistory } from "react-router-dom";
import { getPlantsAlphabetically } from '../api/plant'
import mapRange from '../helpers/mapRange';
import PlantList from '../components/PlantList'
import Spinner from '../components/Spinner'
import PaginationControls from '../components/PaginationControls';

const PAGE_SIZE = 100;

const PlantIndexPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [activeRequest, setActiveRequest] = useState(false);
  const [page, setPage] = useQueryParam('page', withDefault(NumberParam, 1));

  const plants = useSelector((state) => state.plants);
  const plantsAlphabeticalIndex = useSelector((state) => state.plantsAlphabetically.index);
  const numOfPages = useSelector((state) => Math.ceil(state.plantsAlphabetically.count / PAGE_SIZE));

  useEffect(() => {
    setActiveRequest(true);
    getPlantsAlphabetically(PAGE_SIZE, PAGE_SIZE*(page-1), dispatch)
      .then(() => setActiveRequest(false))
      .catch((err) => console.error(err));
  }, [page]);

  const plantIds = mapRange(PAGE_SIZE*(page-1), PAGE_SIZE*page, (i) => plantsAlphabeticalIndex[i]);
  const plantsOnPage = plantIds.map((id) => plants[id]).filter((x) => x);

  function onClick(plant) {
    history.push(`/plants/${plant.id}`);
  }

  if(activeRequest) {
    return <Spinner />;
  } else {
    return (
      <div className='index-card'>
        <div className="plant-index">
          <PlantList data={plantsOnPage} onClick={(plant) => onClick(plant)} />
          <PaginationControls 
            page={page}
            maxPages={numOfPages} 
            onChange={setPage}
          />
        </div>
      </div> 
    );
  }
}


export default PlantIndexPage;