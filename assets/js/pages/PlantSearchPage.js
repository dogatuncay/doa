import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryParam, NumberParam, StringParam, withDefault } from 'use-query-params';
import { useHistory } from "react-router-dom";
import mapRange from '../helpers/mapRange.js';
import { searchPlant } from '../api/plant.js';
import PlantList from '../components/PlantList.js'
import Pagination from '../components/Pagination.js';
import Spinner from '../components/Spinner.js'

const PAGE_SIZE = 100;

const PlantSearchPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [submittedSearch, setSubmittedSearch] = useQueryParam('search', StringParam);
  const [page, setPage] = useQueryParam('page', withDefault(NumberParam, 1));
  const [searchText, setSearchText] = useState(submittedSearch || '');
  const [activeRequest, setActiveRequest] = useState(false);

  const plants = useSelector((state) => state.plants);
  const plantsSearchIndex = useSelector((state) => state.plantsSearch.index);
  const numOfPages = useSelector((state) => Math.ceil(state.plantsSearch.count / PAGE_SIZE));

  useEffect(() => {
    if(submittedSearch) {
      setActiveRequest(true);
      searchPlant(searchText, PAGE_SIZE, PAGE_SIZE*(page-1), dispatch, (err) => console.error(err))
      .then(() => setActiveRequest(false));
    }
  }, [submittedSearch, page]);

  function keyPressed(e) {
    if (e.key === "Enter") {
      setSubmittedSearch(searchText);
      setPage(1);
    }
  }

  function updateSearchText(e) {
    setSearchText(e.target.value);
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
        onChange={updateSearchText} 
        onKeyPress={keyPressed}
        value={searchText}></input>
    </div>);

  if(activeRequest) {
    return <Spinner />;
  } else if(numOfPages == 0) {
    return (
      <div>
        {searchElements}
        <div>Search didn't return any results.</div>
      </div>
    );
  } else {
    return (
      <div>
        {searchElements}
        <div className="plant-index">
          <PlantList data={plantsOnPage} onClick={(plant) => onClick(plant)} />
          <Pagination page={page} maxPages={numOfPages} onChange={setPage} />
        </div>
      </div>
    );
  }
}

export default PlantSearchPage;