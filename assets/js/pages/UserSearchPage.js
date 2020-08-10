import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQueryParam, NumberParam, StringParam, withDefault } from 'use-query-params';
import { useHistory } from "react-router-dom";
import mapRange from '../helpers/mapRange.js';
import { searchUser } from '../api/user.js';
import UserList from '../components/UserList.js';
import Pagination from '../components/Pagination.js';
import Spinner from '../components/Spinner.js'

const PAGE_SIZE = 100;

const UserSearchPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [submittedSearch, setSubmittedSearch] = useQueryParam('search', StringParam);
  const [page, setPage] = useQueryParam('page', withDefault(NumberParam, 1));
  const [searchText, setSearchText] = useState(submittedSearch || '');
  const [activeRequest, setActiveRequest] = useState(false);

  const users = useSelector((state) => state.users);
  const userSearchIndex = useSelector((state) => state.userSearch.index);
  const numOfPages = useSelector((state) => Math.ceil(state.userSearch.count / PAGE_SIZE));

  useEffect(() => {
    if(submittedSearch) {
      setActiveRequest(true);
      searchUser(searchText, PAGE_SIZE, PAGE_SIZE*(page-1), dispatch)
      .then(() => setActiveRequest(false))
      .catch((err) => console.error(err));
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

  function onClick(user) {
    history.push(`/user/${user.id}`);
  }

  const userIds = mapRange(PAGE_SIZE*(page-1), PAGE_SIZE*page, (i) => userSearchIndex[i]);
  const usersOnPage = userIds.map((id) => users[id]).filter((x) => x);

  const searchElements = (    
    <div>
      <div>User Search Page</div>
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
        <div className="user-index">
          <UserList data={usersOnPage} onClick={(user) => onClick(user)} />
          <Pagination page={page} maxPages={numOfPages} onChange={setPage} />
        </div>
      </div>
    );
  }
}

export default UserSearchPage;