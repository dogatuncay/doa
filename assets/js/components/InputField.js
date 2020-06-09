import React from 'react';

function interpolateErrorMessage(message, context) {
  const get = (i) => i < message.length ? message[i] : null;

  let acc = "";
  let start = 0;
  let matchPhase = 0;

  for(let i = 0; i < message.length; i++) {
    switch(matchPhase) {
      case 0:
        if(get(i) === '%' && get(i+1) === '{') {
          acc = acc.concat(message.slice(start, i));
          matchPhase++;
        }
        break;
      case 1:
        matchPhase++;
        start = i + 1;
        break;
      case 2:
        if(get(i) === '}') {
          const key = message.slice(start, i);
          acc = acc.concat(context[key].toString());
          matchPhase = 0;
          start = i + 1;
        }
        break;
    }
  }

  if(matchPhase !== 0)
    console.error('invalid error message format');

  acc = acc.concat(message.slice(start));
  return acc;
}

const InputField = ({name, value, error, onChange}) => {
  let errMessage;
  if(error) {
    errMessage = (<div style={{color: 'red'}}>{`${interpolateErrorMessage(error.message, error.context)}`}</div>);
  }
  return (
    <>
      {name}:
      <input 
        type="text" 
        onChange={(e) => onChange(name, e.target.value)}
        value={value} />
      {errMessage}
    </>
  );
}
// TODO: prop types

export default InputField;