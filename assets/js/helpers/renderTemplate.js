export default function renderTemplate(message, context) {
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