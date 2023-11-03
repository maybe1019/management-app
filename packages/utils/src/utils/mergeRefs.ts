export const mergeRefs = (refs: any[]) => {
  return (value: any) => {
    refs.forEach(rf => {
      if (typeof rf === 'function') {
        rf(value);
      } else if (rf != null) {
        rf.current = value;
      }
    });
  };
};
