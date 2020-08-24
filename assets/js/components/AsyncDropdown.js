import React, { useState, useEffect } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import Spinner from '../components/Spinner'

const limit = 100;

const AsyncDropdown = () => {
  const [value, setValue] = useState(null);
  const [activeRequest, setActiveRequest] = useState(false);
  const [offset, setOffset] = useState(0);

  function loadOptions(offset) {
    const response = fetch(`/api/plants?limit=${limit}&offset=${offset}`, {method: 'GET'});
    const responseJSON = response.json();
    setOffset(offset+limit);
    return {
      options: responseJSON.result.plant,
      hasMore: responseJSON.result,
    };
  }

  useEffect(() => {
    setActiveRequest(true);
    loadOptions()
      .then(() => (setActiveRequest(false)));
  }, []);

  if(activeRequest) {
    return <Spinner />;
  } else {
    return (
      <AsyncPaginate
        value={value}
        loadOptions={loadOptions(offset)}
        onChange={setValue}
      />
    );
  }
}
export default AsyncDropdown;