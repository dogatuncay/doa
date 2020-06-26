

export function compareObjects(oldResidence, newResidence) {
  // return Object.keys(oldResidence).reduce((key, acc) => {
  //   return newResidence[key] !== oldResidence[key] ? acc.concat([key]) : acc;
  // }, []);

  // return Object.keys(oldResidence).flatMap((key) => newResidence[key] !== oldResidence[key] ? [key] : []);
  // return Object.keys(oldResidence).flatMap((key) => { 
  //   if(newResidence[key] !== oldResidence[key]){
  //     return [key];
  //   } else {
  //     return [];
  //   }
  // })

  let changedFields = [];
  Object.keys(oldResidence).forEach((key) => { 
    if(newResidence[key] !== oldResidence[key]){
      changedFields.push(key)
    }
  })
  return changedFields;
}

export function filterObjectByKey(obj, keys) {
  // return keys.reduce((key, acc) => {
  //   if(k in obj) {
  //     acc[k] = obj[k]
  //   }
  //   return acc;
  // }, {})
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