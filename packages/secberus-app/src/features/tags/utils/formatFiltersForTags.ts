import { snakeToCamel, camelToSnake } from '@secberus/utils';
import { Data, FormattedData } from '../tags.types';

export const formatFiltersForTags = (
  queryParams: Record<string, any>,
  data: Data[]
): FormattedData[] => {
  const queryDataAsArray = Object.entries(queryParams);

  const formattedData = queryDataAsArray.map(([key, values]) => {
    const dataObj = getMatchingData(key, data) as Data;

    if (Array.isArray(values)) {
      return values.map(value => {
        return {
          keyValue: dataObj?.tagLabel ?? dataObj?.label ?? 'unknown',
          referenceValue: { [camelToSnake(key)]: value },
          value: handleValueByFilterType([key, value], dataObj),
          iconName:
            key === 'datasourceId' || key === 'datasourceType'
              ? handleIcons(key, value, dataObj)
              : null,
        };
      });
    }

    return {
      keyValue: dataObj?.tagLabel ?? dataObj?.label ?? 'unknown',
      referenceValue: { [key]: values },
      value: handleValueByFilterType([key, values], dataObj),
      iconName:
        key === 'datasourceId' || key === 'datasourceType'
          ? handleIcons(key, values, dataObj)
          : null,
    };
  });

  return formattedData.flat();
};

//NOTE: Helper Functions

const getMatchingData = (key: string, data: Data[]) =>
  data.find(({ field }) => snakeToCamel(field) === key);

const handleValueByFilterType = (
  [key, value]: [key: string, value: any],
  dataObj: Data
) => {
  if (key.includes('Id') || key.includes('Type')) {
    return getValueById(value, dataObj);
  }

  switch (key) {
    case 'showPassing': {
      return value === 'true' ? 'True' : 'False';
    }
    case 'suppressed': {
      return value === 'true' ? 'Active' : 'Exception';
    }
    case 'subscribed': {
      return value === 'true' ? 'On' : 'Off';
    }
    case 'secberusManaged': {
      return value === 'true' ? 'Secberus' : 'Custom';
    }
    case 'severityLabel': {
      return value[0] + value.slice(1).toLowerCase();
    }
    default: {
      return value;
    }
  }
};

const getValueById = (valueId: string, dataObj: Data) => {
  const { values = [] } = dataObj;

  const { name = 'N/A', description = '' } = values.find(
    v => v.id === valueId
  ) ?? { name: 'N/A', description: '' };

  if (description.length > 0) return description;
  return name;
};

const handleIcons = (key: string, value: string, dataObj: Data) => {
  const { values = [] } = dataObj;

  if (key === 'datasourceId') {
    const { datasource_type_id } = values.find(v => v.id === value) ?? 'AWS';
    return datasource_type_id;
  } else {
    return value;
  }
};
