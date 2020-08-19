const datalessRequestMethods = [
  'GET',
  'HEAD',
  'OPTIONS',
  'DELETE'
]

const isDatalessRequestMethod =(method) => datalessRequestMethods.includes(method)

export default function apiRequest(path, method, jsonData = null) {
  const options = {
    method,
    headers: {'Content-Type': 'application/json'},
    credentials: 'same-origin'
  };
  if(!isDatalessRequestMethod(method)) {
    if(!jsonData)
      throw new Error('request data expected, but not provided');
    options.body = JSON.stringify(jsonData);
  }

  return fetch(path, options)
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
        throw json;
      }
    });
}