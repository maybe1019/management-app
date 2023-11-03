import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { titleCase } from '@secberus/utils';
import { Plus } from '@secberus/icons';
import { Text } from '@secberus/components';
import { Datasource, DatasourceType, Resource } from '@secberus/services';
import { useFilterRequestDataContext } from '../../filters';
import { Tag } from '../tag/Tag.component';
import { TagText } from '../tag/Tag.styled';
import {
  Filter,
  getResourceIcon,
} from '../../filter-panel/FilterPanel.component';

//snake to title case
const snakeToTitleCase = (str: string) => {
  return str
    .split('_')
    .map(s => titleCase(s))
    .join(' ');
};

const getCharCountRecursive = (arr: any[]): number => {
  return arr.reduce(
    (acc: number, curr: any) =>
      acc + (Array.isArray(curr) ? getCharCountRecursive(curr) : curr.length),
    0
  );
};

const TagWithIcon = ({
  icon: Icon,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof Tag>> & {
  icon: any;
}) => {
  const kv = props.value?.split(':');
  const [key, ...val] = kv || [];

  return (
    <Tag {...props}>
      <Flex gridGap="4px">
        <Text type="xsmall-regular">{key}:</Text>
        <Box flexShrink={0}>{Icon && <Icon height="24px" width="24px" />}</Box>
        <TagText type="xsmall-bold">{val.join(':')}</TagText>
      </Flex>
    </Tag>
  );
};

const useLexicalTagMap = () => {
  const { resourceId, categoryId, complianceId, datasourceId, datasourceType } =
    useFilterRequestDataContext();

  const lexicalMap: Partial<
    Record<Filter, string | ((kv: [string, string]) => string)>
  > = {
    severityLabel: 'Severity',
    complianceId: ([_, v]) => {
      return `Frameworks: ${complianceId?.[v]?.name}`;
    },
    categoryId: ([_, v]) => {
      return `Categories: ${categoryId?.[v]?.name}`;
    },
    resourceId: ([_, v]) => {
      return `Resource type: ${resourceId?.[v]?.description}`;
    },
    resourceData: ([_, v]) => {
      return `Resource data: ${v}`;
    },
    subscribed: ([_, v]) => (v === 'true' ? 'Status: On' : 'Status: Off'),
    secberusManaged: ([_, v]) => {
      return v === 'true' ? 'Author: Secberus' : 'Author: Custom';
    },
    datasourceId: ([_, v]) => {
      return `Data source: ${(datasourceId?.[v] as Datasource)?.name}`;
    },
    suppressed: ([_, v]) => {
      return v === 'true'
        ? 'Exceptions: Exceptions'
        : 'Exceptions: Active violations';
    },
    showPassing: ([_, v]) => {
      return `Show passing: ${v}`;
    },
    datasourceType: ([_, v]) => {
      return `Data source type: ${
        (datasourceType?.[v] as DatasourceType)?.name
      }`;
    },
  };

  return lexicalMap;
};

const useIconTagMap = () => {
  const { resourceId, datasourceId } = useFilterRequestDataContext();
  const iconMap: Partial<
    Record<Filter, (id: string) => ReturnType<typeof getResourceIcon>>
  > = {
    resourceId: id => {
      return getResourceIcon(
        (resourceId?.[id] as Resource)?.datasource_types?.[0] as any
      );
    },
    datasourceId: id => {
      return getResourceIcon(
        (datasourceId?.[id] as Datasource)?.datasource_type_id as any
      );
    },
    datasourceType: id => {
      return getResourceIcon(id as any);
    },
  };

  return iconMap;
};

// trim array until it fits within charLimit
const trimArray = (arr: string[] | string[][], charLimit?: number) => {
  if (!charLimit) return arr;
  let totalCharCount = getCharCountRecursive(arr);
  let trimmedArr = [...arr];
  while (totalCharCount > charLimit) {
    trimmedArr = trimmedArr.slice(0, -1);
    totalCharCount = getCharCountRecursive(trimmedArr);
  }
  return trimmedArr;
};

interface TagListProps {
  data: Record<Filter, string[]>;
  onRemove: (kv: [string, string]) => void;
  charLimit?: number;
}
export const TagList: React.FC<TagListProps> = ({
  data = {},
  charLimit = 100,
  onRemove: onClick,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const lexicalMap = useLexicalTagMap();
  const iconMap = useIconTagMap();

  const toggleExpansion = () => setIsExpanded(prev => !prev);

  const __list = Object.entries(data)
    .map(([k, v]) => v.map(v_ => [k, v_]))
    .flat();

  const _list = trimArray(__list, charLimit);
  const list = (isExpanded ? __list : _list).map(([k, v]) => (
    <TagWithIcon
      icon={
        typeof iconMap[k as Filter] === 'function'
          ? iconMap[k as Filter]?.(v)
          : null
      }
      onClick={() => onClick([k, v])}
      value={
        lexicalMap[k as Filter]
          ? typeof lexicalMap[k as Filter] === 'function'
            ? // @ts-expect-error here
              lexicalMap[k as Filter]([k, v])
            : `${lexicalMap[k as Filter]}: ${titleCase(v.toLowerCase())}`
          : `${snakeToTitleCase(k.toLowerCase())}: ${v}`
      }
    />
  ));

  const overflow = __list.length !== _list.length;

  return (
    <Flex gridGap="8px" flexWrap="wrap" w="100%">
      {list}
      {overflow && (
        <Tag onClick={toggleExpansion} close={false}>
          {isExpanded ? (
            <b>Show less</b>
          ) : (
            <Flex alignItems="center" gridGap="4px">
              <Plus /> <b>Show more</b>
            </Flex>
          )}
        </Tag>
      )}
    </Flex>
  );
};
