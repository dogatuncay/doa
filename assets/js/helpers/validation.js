// example validations:
// const validations = {
//   password: {
//     'Must contain at least one special character (%{characters})': must.contain('$#@!'),
//     'Must contain a upper case letter': must.contain(charRange('A', 'Z')),
//     'Must contain a lower case letter': must.contain(charRange('a', 'z')),
//     'Length must between %{min}-%{max}': must.lengthInBounds(8, 22)
//   }
// }

export function charRange(low, high) {
  const lowCode = low.charCodeAt(0);
  const highCode = high.charCodeAt(0);

  const arr = new Array(highCode - lowCode);
  for(let i = 0; i <= highCode - lowCode; i++)
    arr[i] = String.fromCharCode(lowCode + i);
  return arr;
}

// meant to be called like: evalValidations(validations['password'], data['password'])
export function evalValidations(validation, value) {
  Object.keys(validations).flatMap((messageTemplate) => {
    const response = validation[messageTemplate](value);
    return response.success ? [] : [renderTemplate(messageTemplate, response)];
  })
}

export const must = {
  lengthInBounds: (min, max) =>
    (str) => ({
      success: min <= str.length && str.length <= max,
      min,
      max
    }),
  contain: (set) =>
    (str) => ({
      success: [...set].findIndex((c) => str.includes(c)) > 0,
      characters: set
    })
};

export default {evalValidations, must};