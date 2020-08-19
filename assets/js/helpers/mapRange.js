export default function mapRange(low, high, f) {
  if(low > high) throw new Error('invalid argument');
  const arr = new Array(high - low);
  for(let i = 0; i <= high - low; i++)
    arr[i] = f(low + i);
  return arr;
}