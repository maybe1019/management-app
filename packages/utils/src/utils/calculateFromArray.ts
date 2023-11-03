type NumberArray = number[];

export const getMinFromArray = (arr: NumberArray): number => {
  return Math.min(...arr);
};

export const getMaxFromArray = (arr: NumberArray): number => {
  return Math.max(...arr);
};

export const getMeanFromArray = (arr: NumberArray): number => {
  const len = arr.length;
  const sum = arr.reduce((accum, currn) => accum + currn, 0);
  return sum / len;
};

export const getMedianFromArray = (arr: NumberArray): number => {
  const midpoint = Math.floor(arr.length / 2);
  const sortedArray = arr.sort((a, b) => a - b);
  return sortedArray.length % 2 !== 0
    ? sortedArray[midpoint]
    : (sortedArray[midpoint - 1] + sortedArray[midpoint]) / 2;
};

export const getModeFromArray = (arr: NumberArray): number => {
  const occurrences: { [key: number]: number } = {};
  let max = 0,
    count = 0;

  arr.forEach(val => {
    if (occurrences[val]) {
      occurrences[val]++;
    } else {
      occurrences[val] = 1;
    }

    // Keep track of the highest occurrences and just return it
    if (count < occurrences[val]) {
      max = val;
      count = occurrences[val];
    }
  });

  return max;
};

export const getRangeFromArray = (arr: NumberArray): number => {
  const min = getMinFromArray(arr);
  const max = getMaxFromArray(arr);
  return max - min;
};
