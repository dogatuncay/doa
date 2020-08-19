export function compareObjects(oldResidence, newResidence) {
  let changedFields = [];
  Object.keys(oldResidence).forEach((key) => { 
    if(newResidence[key] !== oldResidence[key]){
      changedFields.push(key)
    }
  })
  return changedFields;
}

export function filterObjectByKey(obj, keys) {
 return keys.map(k => k in obj ? {[k]: obj[k]} : {})
    .reduce((res, o) => Object.assign(res, o), {});
}

export function objFilter(obj, f) {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if(f(key, obj[key])) newObj[key] = obj[key];
  });
  return newObj;
}