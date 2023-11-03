import { BaseBadge, SeverityBadge, Text } from '@secberus/components';
import { Tag } from '@secberus/icons';
import {
  ConditionText,
  ConditionSpacer,
  IconWrapper,
} from './Workflows.styled';

const ConditionHelper = ({
  conditions,
  dataSources,
  categories = [],
  hasNext = false,
}) => {
  const { field, value } = conditions;

  /**
   * Removes escaped characters like quotes ('") and slashes(\) from strings.
   * @param str
   * @returns {string|*}
   */
  const unescape = str => {
    if (typeof str !== 'string') return str;
    return str.replace(/['"\\]+/g, '');
  };

  if (field === 'datasources[*].id') {
    const filteredDataSources =
      dataSources?.filter(({ id }) => value?.includes(id)) ?? [];
    if (filteredDataSources.length) {
      const lastItemIdx = filteredDataSources.length - 1;
      return (
        <>
          {filteredDataSources.map((d, i) => (
            <>
              <BaseBadge
                key={d.id}
                className="blue-rounded"
                iconMap="datasource"
                icon={d.datasource_type_id}
                background={'transparent'}
                padding="0px"
              >
                <Text type="xsmall-regular" color="extra-dark">
                  {d.name}
                </Text>
              </BaseBadge>
              {i < lastItemIdx && <ConditionSpacer>,</ConditionSpacer>}
            </>
          ))}
          {hasNext && <ConditionSpacer>,</ConditionSpacer>}
        </>
      );
    }
    return null;
  }

  if (field === 'severity_label') {
    const lastItemIdx = value.length - 1;

    return (
      <>
        {value.map((val, i) => (
          <>
            <SeverityBadge
              key={val}
              priorityVal={val}
              background={'transparent'}
              type="xsmall-regular"
              color="extra-dark"
              padding="0px"
            />
            {i < lastItemIdx && <ConditionSpacer>,</ConditionSpacer>}
          </>
        ))}
        {hasNext && <ConditionSpacer>,</ConditionSpacer>}
      </>
    );
  }
  if (field.includes('resource.data')) {
    const key = unescape(field).split('.')[2];
    return (
      <>
        <ConditionText>{`${key}:${unescape(value)}`}</ConditionText>
        {hasNext && <ConditionSpacer>,</ConditionSpacer>}
      </>
    );
  }

  if (field.includes('tags')) {
    const key = unescape(field).split('.')[1];
    return (
      <>
        <IconWrapper>
          <Tag height={24} width={24} />
        </IconWrapper>
        <ConditionText>{`${key}:${unescape(value)}`}</ConditionText>
        {hasNext && <ConditionSpacer>,</ConditionSpacer>}
      </>
    );
  }

  if (field === 'category_id') {
    const filteredCategories = categories.filter(({ id }) =>
      value?.includes(id)
    );
    const lastItemIdx = filteredCategories.length - 1;
    return (
      <>
        {filteredCategories.map((category, i) => (
          <>
            <ConditionText key={category.id}>{category.name}</ConditionText>
            {i < lastItemIdx && <ConditionSpacer>,</ConditionSpacer>}
          </>
        ))}
        {hasNext && <ConditionSpacer>,</ConditionSpacer>}
      </>
    );
  }
  return <ConditionText>N/A</ConditionText>;
};

export default ConditionHelper;
