export const getSelectedFilterCount = (
  filterData: any,
  exceptions?: string[]
) => {
  const filterDataAsArr = exceptions
    ? Object.entries(filterData).filter(([key]) => !exceptions.includes(key))
    : Object.entries(filterData);
  const selectedFilterArr = filterDataAsArr.map(manageValues);

  return selectedFilterArr.reduce(reduceToNumber, 0);
};

//NOTE: Helper Functions

const manageValues = ([key, value]: [string, any]) => {
  if (
    !key ||
    !value ||
    key === 'framework_id' ||
    key === 'name' ||
    key === 'policy_name'
  )
    return 0;
  if (key === 'tag' || key === 'resource_data') {
    return Object.values(value).length;
  }
  if (value && Object.values(value)?.length > 0 && value['true']) {
    let count = 0;
    if (value['true'] === true) {
      count++;
    }
    if (value['false'] === true) {
      count++;
    }
    return count;
  }
  if (key !== 'severity_label') {
    return Object.entries(value).filter(([v1, v2]) => v2).length;
  }
  if (value && Object.values(value)?.length > 0) {
    const usedFilters = Object.entries(value).filter(([v1, v2]) => v2);
    return usedFilters.length;
  }
  return 0;
};

const reduceToNumber = (acc: number, curr: any) => {
  if (typeof curr === 'number') {
    return (acc += curr);
  }
  return acc;
};
