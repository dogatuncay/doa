import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryParam, NumberParam, StringParam, withDefault } from 'use-query-params';
import { useHistory } from "react-router-dom";
import mapRange from '../helpers/mapRange.js';
import fetchAPIGet from '../fetchAPIGet.js';
import { loadPlantsSearch } from '../actions/plantActions.js';
import PlantList from '../components/PlantList.js'
import Pagination from '../components/Pagination.js';

const PAGE_SIZE = 100;

const PlantSearchPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [submittedSearch, setSubmittedSearch] = useQueryParam('search', StringParam);
  const [page, setPage] = useQueryParam('page', withDefault(NumberParam, 1));
  const [searchText, setSearchText] = useState(submittedSearch || '');
  const [requestStatus, setRequestStatus] = useState('main');

  const plants = useSelector((state) => state.plants);
  const plantsSearchIndex = useSelector((state) => state.plantsSearch.index);
  const numOfPages = useSelector((state) => Math.ceil(state.plantsSearch.count / PAGE_SIZE));

  useEffect(() => {
    if(submittedSearch) searchPlantsRequest(searchText, PAGE_SIZE, PAGE_SIZE*(page-1));
  }, [submittedSearch, page]);

  function keyPressed(e) {
    if (e.key === "Enter") {
      setSubmittedSearch(searchText);
      setPage(1);
      setRequestStatus('main')
    }
  }

  function updateState(e) {
    setSearchText(e.target.value);
  }

  function searchPlantsRequest(searchText, limit, offset) {
    fetchAPIGet(`/api/plants/search?filter=${searchText}&limit=${limit}&offset=${offset}`, 'POST')
    .then((response) => {
      const {plants, num_entries} = response.result;
      console.log(num_entries);
      dispatch(loadPlantsSearch(plants, searchText, offset, num_entries));
      if(num_entries) { setRequestStatus('loaded')} else { setRequestStatus('noResult')}
      
    })
    .catch((error) => {
      console.error(error);
      setRequestStatus('error');
    });
  }

  function onClick(plant) {
    history.push(`/plants/${plant.id}`);
  }

  const plantIds = mapRange(PAGE_SIZE*(page-1), PAGE_SIZE*page, (i) => plantsSearchIndex[i]);
  const plantsOnPage = plantIds.map((id) => plants[id]).filter((x) => x);

  const searchElements = (    
    <div>
      <div>Plant Search Page</div>
      <input 
        type="text" 
        onChange={updateState} 
        onKeyPress={keyPressed}
        value={searchText}></input>
    </div>);

  switch(requestStatus) {
    case 'main':
      return searchElements;
    case 'loaded':
      return (
        <div>
          {searchElements}
          <div className="plant-index">
            <PlantList data={plantsOnPage} onClick={(plant) => onClick(plant)} />
            <Pagination 
              page={page}
              maxPages={numOfPages} 
              onChange={setPage}
            />
          </div>
        </div>
      );
    case 'error':
      return (
        <div>
          {searchElements}
          <div>There was an api error.</div>
        </div>
        );
    case 'noResult':
      return (
        <div>
          {searchElements}
          <div>Search didn't return any results.</div>
        </div>
        );
    default:
      console.error('invalid request status');
      return <div></div>;
  }
}

export default PlantSearchPage;