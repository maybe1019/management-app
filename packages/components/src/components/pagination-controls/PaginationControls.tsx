import React from 'react';
import { ChevronRight, ChevronLeft } from '@secberus/icons';
import styled from 'styled-components';
import { Spinner } from '@chakra-ui/react';
import { Button, Select, Text } from '..';

export const PaginationControlsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 80px;
  border: 1px solid #f1f6fa;
  box-sizing: border-box;
  border-radius: 0px 0px 4px 4px;
`;

export const PaginationControlsInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  .select-value {
    min-width: unset;
    width: 100px;
  }
`;
// precompiled who cares
type Option = {
  id: string;
  name: string;
};

export type GenericMethod<T, K> = (arg0: T) => K;

export interface PaginationNavigationProps {
  rightDisabled?: boolean;
  leftDisabled?: boolean;
  onLeft?: GenericMethod<any, string | void>;
  onRight?: GenericMethod<any, string | void>;
}

export interface useCursorBuilderProps {
  page: number;
  limit: number;
  total: number;
}

export interface PaginationControlsProps extends useCursorBuilderProps {
  cursor?: string;
  options: Option[];
  valueKey: Option['id'];
  isLoading?: boolean;
  onLimitChange?: GenericMethod<any, string | void>;
  hideSelect?: boolean;
}

const isNumber = (val: unknown): boolean => typeof val === 'number';

export const useCursorBuilder = ({
  total,
  page,
  limit,
}: useCursorBuilderProps): string => {
  const cursor = React.useMemo(() => {
    if (isNumber(total) && isNumber(page) && isNumber(limit)) {
      if (total <= 0) {
        return '0 - 0';
      }
      const start =
        page > 1
          ? (page - 1) * limit + 1 // page 2 = 11-20 ==> ((2 - 1) * 10) + 1 = 11
          : 1; // Page 1 = start at 1

      const finish =
        page * limit > total
          ? total // if page * limit > total, then total is the max we can show
          : start + limit - 1; // 11-20 ==> 11 + 10 - 1 = 20

      if (start === finish) {
        return start.toString();
      }
      return `${start <= 0 ? 1 : start} - ${finish}`;
    }
    // should not reach this
    return 'N/A';
  }, [page, limit, total]);

  return cursor;
};
export const PaginationContainer: React.FC = ({ children }) => (
  <PaginationControlsContainer className="pagination-container">
    {children}
  </PaginationControlsContainer>
);
export const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  limit,
  total,
  onLimitChange,
  options,
  valueKey,
  isLoading,
  hideSelect,
}) => {
  const currentlySelected = React.useMemo(
    () =>
      options.find(
        ({ id }) =>
          id.toString().toLowerCase() === valueKey.toString().toLowerCase()
      ),
    [options, valueKey]
  );

  const cursor = useCursorBuilder({ page, limit, total });
  return (
    <PaginationControlsInnerContainer className="pagination-inner-controls">
      {!hideSelect && (
        <>
          <Text
            color="dark"
            type="small-regular"
            className="pagination-row-text"
          >
            Rows per page
          </Text>
          <Select
            className="select-value"
            returnType="object"
            options={options}
            onChange={onLimitChange}
            value={currentlySelected}
            direction="UP"
          />
        </>
      )}
      <Text
        color="dark"
        type="small-regular"
        className="pagination-indicator-text"
      >
        {isLoading ? <Spinner /> : `${cursor} of ${total}`}
      </Text>
    </PaginationControlsInnerContainer>
  );
};

const PaginationControlsNavigationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 40px;
  .leftButton:disabled,
  .rightButton:disabled {
    background: transparent;
  }
`;

export const PaginationControlsNavigation: React.FC<PaginationNavigationProps> =
  ({ onLeft, onRight, leftDisabled, rightDisabled }) => {
    return (
      <PaginationControlsNavigationContainer className="pagination-navigation-controls">
        <Button
          disabled={leftDisabled}
          variant="tertiary"
          onClick={onLeft && onLeft}
          icon
          className="leftButton"
        >
          <ChevronLeft />
        </Button>
        <Button
          disabled={rightDisabled}
          variant="tertiary"
          onClick={onRight && onRight}
          icon
          className="rightButton"
        >
          <ChevronRight />
        </Button>
      </PaginationControlsNavigationContainer>
    );
  };
