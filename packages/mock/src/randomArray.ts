const randomArray = (length: number, max: number) =>
  [...new Array(length)].map(() => Math.round(Math.random() * max));

export default randomArray;
