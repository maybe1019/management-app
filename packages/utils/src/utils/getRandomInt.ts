/**
 * Generates a random inclusive integer between a provided min
 * and max value. Inclusive meaning that the min or max value has a chance
 * of being returned as the random value.
 * @param max - the highest number allowed
 * @param min - the lowest number allowed
 */
export const getRandomInt = (max: number, min = 0): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
