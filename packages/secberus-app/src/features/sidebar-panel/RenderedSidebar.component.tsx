import React from 'react';
import styled from 'styled-components';
import { ChevronDownLight } from '@secberus/icons';
import { ColorProperties, Text } from '@secberus/components';
import { Flex, Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Title } from '../filter-panel/FilterPanel.styled';
import { DEFAULT_QUERY_ID } from '../data-explorer/DataExplorerProvider';
import {
  GroupHeader,
  StyledFilterGroup,
} from '../filter-panel/FilterGroup.component';
import { useDataExplorerContext } from '../data-explorer/DataExplorerProvider';
import {
  SidebarPanelContentHeader,
  SidebarHeader,
} from './SidebarPanel.styled';

//eslint-disable-next-line
const RotateChevron = styled(ChevronDownLight)<{ isOpen?: boolean }>`
  &.rotate {
    transform: rotate(-90deg);
  }
`;

// I apologize for nothing
const StyledStyledFilterGroup = styled(StyledFilterGroup)`
  padding-top: 16px;
  &:first-of-type {
    padding-top: 12px;
  }
  padding-bottom: 16px;
`;

const OverflowText = styled(Text)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

type Render = React.ReactNode | JSX.Element | string;

type PreItem = {
  id: string;
  label: string;
  render: Render;
};

type ItemProps = {
  id: string;
  label: string;
  render: Render;
  onClick: (arg0: string, arg1: boolean) => unknown;
  isOpen: boolean;
  index: number;
};
const Item = ({
  id,
  label,
  render,
  onClick,
  isOpen = false,
  index,
}: ItemProps) => {
  return (
    <Box
      ml="16px"
      mt={index === 0 ? '16px' : '8px'}
      cursor="pointer"
      className="sidebar-item"
      onClick={() => {
        onClick(id, !isOpen);
      }}
    >
      <Flex>
        <Box width="24px" height="24px" mr="8px">
          <RotateChevron
            className={`chevron ${isOpen ? '' : 'rotate'}`}
            height="24px"
            width="24px"
          />
        </Box>
        <Box whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          <Text type="xsmall-regular" className="ellipsis-overflow">
            {label}
          </Text>
        </Box>
      </Flex>
      {isOpen && render}
    </Box>
  );
};

type GroupProps = {
  id: string;
  label: string;
  items: PreItem[];
  render?: Render;
  handleItemClick?: (id: string, isOpen?: boolean) => unknown;
};

const Group = ({ id, label, items, render, handleItemClick }: GroupProps) => {
  const { queryId } = useParams<{ queryId?: string }>();
  const { getTabState, setTabState } = useDataExplorerContext();
  const [itemsOpen, setItemsOpen] = React.useState<Record<string, boolean>>({});
  const policyQueryId = queryId ?? DEFAULT_QUERY_ID;

  const expandedBrowsers = React.useMemo(
    () => getTabState(policyQueryId)?.expandedBrowsers,
    [getTabState, policyQueryId]
  );

  const handleToggle = React.useCallback(
    (id: string, val: boolean) =>
      setItemsOpen({
        ...itemsOpen,
        [id]: val,
      }),
    [itemsOpen]
  );

  const toggleGroupHeaderOpen = React.useCallback(() => {
    if (policyQueryId) {
      setTabState(policyQueryId, {
        expandedBrowsers: {
          ...expandedBrowsers,
          [id]: Boolean(!expandedBrowsers?.[id]),
        },
      });
    }
  }, [expandedBrowsers, id, policyQueryId, setTabState]);

  const isOpen = expandedBrowsers?.[id];

  return (
    <>
      <StyledStyledFilterGroup>
        <GroupHeader onClick={() => toggleGroupHeaderOpen()}>
          <RotateChevron
            className={`chevron ${isOpen ? '' : 'rotate'}`}
            height="24px"
            width="24px"
          />
          <OverflowText type="small-bold">{label}</OverflowText>
        </GroupHeader>
        {isOpen && (
          <>
            {render}
            {items.map((item, index) => (
              <Item
                index={index}
                onClick={(id, isOpen) => {
                  handleToggle(id, isOpen);
                  handleItemClick?.(id, isOpen);
                }}
                key={item.id}
                {...item}
                isOpen={itemsOpen?.[item.id]}
              />
            ))}
          </>
        )}
      </StyledStyledFilterGroup>
    </>
  );
};

type RenderedSidebarProps = {
  title: string;
  backgroundColor?: ColorProperties;
  groups: GroupProps[];
};

export const RenderedSidebar: React.FC<RenderedSidebarProps> = ({
  title,
  backgroundColor,
  groups,
  children,
}) => (
  <SidebarPanelContentHeader>
    <SidebarHeader backgroundColor={backgroundColor}>
      <Title>{title}</Title>
    </SidebarHeader>
    {children}
    <Box overflowY="auto">
      {groups.map(group => (
        <Group key={group.label} {...group} />
      ))}
    </Box>
  </SidebarPanelContentHeader>
);
