import styled from 'styled-components';
import {} from './AuditLog.types';
import { ChevronDownLight } from '@secberus/icons';
import { VariableSizeTree } from 'react-vtree';
import { styledScrollbar } from '../../css';
import { Button } from '../index';
import { FadeScroll } from '../fade-scroll/FadeScroll.component';

export const VariableSizeTreeCustomScrollBar = styled(VariableSizeTree)`
  ${styledScrollbar()}
`;

interface EventGroupProps {
  height: number;
}

export const StyledFadeScroll = styled(FadeScroll)`
  p {
    display: flex;
    align-items: center;
  }
  overflow-y: hidden;
`;

export const EventGroup = styled.div<EventGroupProps>`
  display: flex;
  flex-direction: column;
  height: ${({ height }) => `${height}px`};
  justify-content: center;
`;

export const AuditChevronButton = styled(ChevronDownLight)`
  transition: transform 0.2s ease-out;
  &.closed {
    transform: rotate(-90deg);
  }
`;

const auditLineHeight = 24;
export const AuditMetaContainer = styled.div<{ nestingLevel: number }>`
  margin-left: ${({ nestingLevel }) => `${nestingLevel * 24}px`};
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: hidden;
  & .audit-log-timestamp {
    margin-right: 16px;
    white-space: nowrap;
  }
  & > p {
    line-height: ${auditLineHeight}px;
  }
  & .severity {
    margin-right: 4px;
    &.notice {
      & > path {
        stroke: ${({ theme }) => theme.colors.blue};
      }
    }
    &.error {
      & > path {
        stroke: ${({ theme }) => theme.colors.red};
      }
    }
  }
  .meta_message {
    overflow-y: scroll;
    max-height: ${auditLineHeight * 2}px;
  }
`;

export const AuditSpanContainer = styled.div`
  display: flex;
  padding-top: 8px;
  padding-bottom: 12px;
  align-items: center;
  white-space: nowrap;
`;

export const ExpandButton = styled(Button)`
  padding: 0px 8px;
  margin-left: auto;
  overflow: hidden;
  &&:hover {
    box-shadow: unset;
  }
`;

export const EventItem = styled.div`
  height: 40px;
`;

export const TraceItem = styled.div`
  height: 81px;
`;

export const Indicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
