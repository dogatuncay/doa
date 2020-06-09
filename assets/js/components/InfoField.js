import React from 'react';

const InfoField = ({label, info}) => {
  return (
    <div key={label}>
      {label}: {info}
    </div>
  );
}
// TODO: prop types

export default InfoField;