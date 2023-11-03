export const isQueryNew = (queryId?: string) => {
  try {
    return atob(queryId || '')?.indexOf('new_') > -1;
  } catch (e) {
    return queryId?.indexOf('new_');
  }
};
