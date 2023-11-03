import React from 'react';
import { isEqual } from 'lodash';
import { ChevronDownLight, InfoLight } from '@secberus/icons';
import { Spinner } from '@chakra-ui/react';
import { Text, Tooltip } from '@secberus/components';
import styled from 'styled-components';

export const StyledFilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  & .tooltipInfo {
    margin-left: 8px;
  }
  padding-top: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors['medium-gray']};
`;

export const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${({ theme }) => theme.typography['small-bold']}
  color: ${({ theme }) => theme.colors.dark};
  & .chevron {
    margin-right: 4px;
    transition: transform 0.3s ease-out;
    transform-origin: center;
    &.rotate {
      transform: rotate(-90deg);
    }
  }
`;

const ClearButton = styled.div`
  margin-left: auto;
  cursor: pointer;
  .clear-btn-text:hover {
    text-decoration: underline;
  }
`;

interface FilterStyleProps {
  expanded: boolean;
}
const FilterGroupOptions = styled.div<FilterStyleProps>`
  display: ${({ expanded }) => (expanded ? 'inline-flex' : 'none')};
  flex-direction: column;
  margin-top: ${({ expanded }) => (expanded ? '12px' : 0)};
  overflow: auto;
  height: auto;
  max-height: ${({ expanded }) => (expanded ? '100%' : 0)};
  margin-left: 2px;
  & .filterComponentWrapper {
    & > div {
      margin-bottom: 6px;
    }
    & .BaseFilter__icon {
      margin-right: 4px;
    }
    & .ResourceFilter__resourcesLabel {
      margin-left: 4px;
    }
  }
`;

export type FilterGroupProps = {
  open?: boolean;
  isLoading?: boolean;
  selected?: number;
  total?: number;
  label?: string;
  id: string;
  tooltipString?: string;
  onClear?: (id: string) => void;
};

const FilterGroup = ({
  children,
  open = false,
  isLoading,
  selected,
  total,
  label,
  tooltipString,
  id,
  onClear,
}: React.PropsWithChildren<FilterGroupProps>) => {
  const [isOpen, setIsOpen] = React.useState(label ? open : true);

  return (
    <StyledFilterGroup>
      {label && (
        <GroupHeader onClick={() => setIsOpen(!isOpen)}>
          <ChevronDownLight
            className={`chevron ${isOpen ? '' : 'rotate'}`}
            height="24px"
            width="24px"
          />
          <Text type="small-bold">{label}</Text>
          {!!selected && (
            <Text type="small-bold" color="gray">
              &nbsp;
              {total ? `${selected}/${total}` : selected}
            </Text>
          )}
          {tooltipString && (
            <InfoLight
              className="tooltipInfo"
              height={18}
              width={18}
              data-tip={tooltipString}
              data-for={id}
            />
          )}
          {onClear && (
            <ClearButton
              onClick={e => {
                e.stopPropagation();
                onClear(id);
              }}
            >
              <Text type="small-regular" className="clear-btn-text">
                Clear
              </Text>
            </ClearButton>
          )}
        </GroupHeader>
      )}
      <FilterGroupOptions expanded={isOpen} className="fg-options">
        {children}
      </FilterGroupOptions>
      {tooltipString && <Tooltip id={id} longText />}
      {isLoading && <Spinner />}
    </StyledFilterGroup>
  );
};

const memo = React.memo(FilterGroup, isEqual);

export { memo as FilterGroup };
