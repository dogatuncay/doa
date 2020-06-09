import React from 'react';
import PropTypes from 'prop-types';
import mapRange from '../helpers/mapRange.js';

const SPAN_WIDTH = 5;

const PaginationNumber = ({page, selectedPage, onChange}) => {
  const className = page === selectedPage ? 'bold' : '';
  return <li><a href="#" onClick={() => onChange(page)} className={className}>{page}</a></li>
}

PaginationNumber.propTypes = {
  page: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

const PaginationBreadcrumbs = () => {
  return <li className="breadcrumbs">...</li>;
}

const Pagination = ({page, maxPages, onChange}) => {
  function go(dir) {
    if(inRange(1, maxPages, page + dir)) onChange(page + dir);
  }

  function renderPageNumber(i) {
    return <PaginationNumber key={i} page={i} selectedPage={page} onChange={onChange} />
  }

 function renderInnerPageNumbers() {
    const leftEdge =  page - (SPAN_WIDTH - 1) / 2;
    const rightEdge = page + (SPAN_WIDTH - 1) / 2;
    if(page < SPAN_WIDTH) {
      return (
        <>
          {mapRange(2, Math.max(SPAN_WIDTH, rightEdge), renderPageNumber)}
          <PaginationBreadcrumbs key="tail" />
        </>
      );
    } else if(page > maxPages - SPAN_WIDTH) {
      return (
        <>
          <PaginationBreadcrumbs key="head" />
          {mapRange(Math.min(maxPages - SPAN_WIDTH, leftEdge), maxPages - 1, renderPageNumber)}
        </>
      );
    } else {
      return (
        <>
          <PaginationBreadcrumbs key="head" />
          {mapRange(leftEdge, rightEdge, renderPageNumber)}
          <PaginationBreadcrumbs key="tail" />
        </>
      )
    }
  }

  if(maxPages <= 0) return <div />;

  var paginationElements;
  if(maxPages <= SPAN_WIDTH) {
    paginationElements = <>{mapRange(1, maxPages, renderPageNumber)}</>
  }
  else {
    paginationElements =
      <>
        {renderPageNumber(1)}
        {renderInnerPageNumbers()}
        {renderPageNumber(maxPages)}
      </>
  }

  return (
    <ul className="pagination">
      <li><a href="#" onClick={() => go(-1)}>&lt;</a></li>
      {paginationElements}
      <li><a href="#" onClick={() => go(1)}>&gt;</a></li>
    </ul>
  )
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  maxPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Pagination;