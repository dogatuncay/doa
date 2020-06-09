export default function fetchAPIGet(path, method) {
  return fetch(path, {
    method,
    headers: {'Content-Type': 'application/json'},
    credentials: 'same-origin'
  })
    .then(function(response) {
      if(response.headers.get('Content-Type').indexOf('application/json') === 0) {
          return response.json()
      } else {
          throw new Error('response did not have "Content-Type" of "application/json"')
      }
    })
    .then(function(json) {
      if(json.ok) {
          return json;
      } else {
          throw new Error(json);
      }
    });
}