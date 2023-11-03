import styled, { css } from 'styled-components';
import { Text, Button } from '@secberus/components';
import { TableSelectAction } from './useTableSelect.component';

export interface TableSelectAllActionBarProps {
  show?: boolean;
  selected: number;
  recordsPerPage: number;
  recordType?: string;
  totalRecords: number;
  isAllSelected?: boolean;
  isAllOnPageSelected?: boolean;
  selectedCount?: number;
  showSelectedCount?: boolean;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  actions?: TableSelectAction[];
}

interface ContainerProps {
  allowFlexWrap?: boolean;
}

const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 4px 0;
  padding: 11px 16px;
  min-height: 56px;
  border-radius: 4px;
  background-color: ${({ theme: { colors } }) => colors['light-gray']};
  @media (max-width: 1480px) {
    align-items: ${({ allowFlexWrap }) => (allowFlexWrap ? 'flex-start' : '')};
  }
`;

const ActionButtonContainer = styled.div<ContainerProps>`
  margin-right: 57px;
  display: flex;
  align-items: center;
  gap: 8px;
  @media (max-width: 1480px) {
    ${({ allowFlexWrap }) =>
      allowFlexWrap &&
      css`
        margin-top: 10px;
        width: 100%;
      `}
  }
`;

const SelectedText = styled(Text)`
  ${({ theme: { typography } }) => typography['small-bold']};
  padding-right: 40px;
`;

const AllPageSelectedText = styled(Text)`
  position: absolute;
  left: 50%;
  margin: 0;
  transform: translate(-50%, 0);
`;

const ActionText = styled.span`
  ${({ theme: { typography } }) => typography['small-bold']};
  cursor: pointer;
  color: ${({ theme: { colors } }) => colors.blue};
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
`;

export const TableSelectAllActionBar = ({
  show,
  selected,
  showSelectedCount,
  recordType = 'records',
  recordsPerPage = 0,
  totalRecords,
  isAllSelected,
  isAllOnPageSelected,
  onSelectAll,
  onDeselectAll,
  actions,
}: TableSelectAllActionBarProps) => {
  if (!show) return null;
  return (
    <Container allowFlexWrap={isAllOnPageSelected}>
      {showSelectedCount && <SelectedText>{selected} selected</SelectedText>}
      {actions && (
        <ActionButtonContainer allowFlexWrap={isAllOnPageSelected}>
          {actions.map(({ show, text, onClick, ...actionProps }) => {
            if (typeof show !== 'undefined' && !show) return null;
            return (
              <Button
                key={actionProps?.id || text}
                size="small"
                variant="secondary"
                onClick={e => {
                  onClick && onClick(e);
                  onDeselectAll();
                }}
                {...actionProps}
              >
                {text}
              </Button>
            );
          })}
        </ActionButtonContainer>
      )}
      {isAllOnPageSelected && (
        <AllPageSelectedText type="small-regular">
          All <strong>{isAllSelected ? totalRecords : recordsPerPage}</strong>{' '}
          {recordType} {!isAllSelected ? 'on this page ' : ''}
          are selected.&nbsp;
          <ActionText
            onClick={() => (isAllSelected ? onDeselectAll() : onSelectAll())}
          >
            {isAllSelected
              ? 'Clear selection'
              : `Select all ${totalRecords} ${recordType}.`}
          </ActionText>
        </AllPageSelectedText>
      )}
    </Container>
  );
};
