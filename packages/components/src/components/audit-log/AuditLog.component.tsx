/* eslint-disable no-restricted-syntax */
import React from 'react';
import { TimesLight, CheckMarkLight } from '@secberus/icons';
import { tryParsingJsonObject } from '@secberus/utils';
import AutoSizer from 'react-virtualized-auto-sizer';
import day from 'dayjs';
import type { CustomerLogEvent } from '@secberus/services';
import { BaseBadge } from '../badges/base-badge/BaseBadge.component';
import { Text } from '../index';
import {
  AuditLogProps,
  AuditEventComponent,
  MessageFragment,
} from './AuditLog.types';
import {
  AuditChevronButton,
  EventGroup,
  AuditMetaContainer,
  AuditSpanContainer,
  ExpandButton,
  Indicator,
  StyledFadeScroll,
  VariableSizeTreeCustomScrollBar,
} from './AuditLog.styled';

const getNodeData = (
  node: CustomerLogEvent,
  nestingLevel: number,
  isOpenByDefault?: boolean
) => {
  return {
    data: {
      id: node.id,
      hasChildren: node.children?.length,
      defaultHeight: !nestingLevel ? 81 : 52,
      isOpenByDefault: !!isOpenByDefault,
      message: node.message,
      // trace_id: node.trace_id, // @colemars will be an xray trace id at some point in the near future probably
      name: node.event_name,
      nestingLevel,
      context: node.context,
      error: node.severity === 'ERROR',
      timestamp: node.timestamp,
    },
    nestingLevel,
    node,
  };
};

const MessageFragmentComponent: React.FC<{
  fragment: MessageFragment;
  index: number;
}> = ({ fragment: { icon, message }, index }) => {
  if (!icon) return <>{message}</>;
  return (
    <>
      {index > 0 ? <>&nbsp;</> : ''}
      <BaseBadge iconMap="datasource" icon={icon}>
        {message}
      </BaseBadge>
    </>
  );
};

const MessageComponent: React.FC<{ message: string }> = ({ message }) => {
  const fragments = tryParsingJsonObject<MessageFragment[]>(message);
  if (!fragments) return <>{message}</>;
  return (
    <>
      {fragments.map((messageFragment, index) => (
        <MessageFragmentComponent fragment={messageFragment} index={index} />
      ))}
    </>
  );
};

const formatTime = (timestamp: number) =>
  day.unix(timestamp).format('YYYY-MM-DD HH:mm:ss (Z)');

const Node: React.FC<AuditEventComponent> = ({
  data: {
    hasChildren,
    message,
    // trace_id: node.trace_id, // @colemars will be an xray trace id at some point in the near future probably
    nestingLevel,
    timestamp,
    defaultHeight,
    name,
    id,
    error,
  },
  isOpen,
  setOpen,
  style,
}) => {
  return (
    <EventGroup style={style} height={defaultHeight}>
      {!nestingLevel ? (
        <>
          <StyledFadeScroll fadeLeft>
            <AuditSpanContainer>
              <Text type="small-bold">
                <MessageComponent message={message} />
              </Text>
            </AuditSpanContainer>
          </StyledFadeScroll>
          <AuditMetaContainer nestingLevel={0}>
            <Text type="caption" color="gray" className="audit-log-timestamp">
              {formatTime(timestamp)}
            </Text>
            <Text type="caption" color="gray" className="audit-log-timestamp">
              {id}
            </Text>
            <Text className="event-name" type="caption" color="gray">
              {name.replace('-', ' ')}
            </Text>
            {!!hasChildren && (
              <ExpandButton
                onClick={() => setOpen(!isOpen)}
                variant="tertiary"
                size="small"
              >
                <AuditChevronButton className={!isOpen ? 'closed' : ''} />{' '}
                <Text type="caption">{`${hasChildren} events`}</Text>
              </ExpandButton>
            )}
          </AuditMetaContainer>
        </>
      ) : (
        <AuditMetaContainer nestingLevel={nestingLevel}>
          <Text type="caption" color="gray" className="audit-log-timestamp">
            {formatTime(timestamp)}
          </Text>
          <Indicator>
            {error ? (
              <TimesLight
                className="severity error"
                height="24px"
                width="24px"
              />
            ) : (
              <CheckMarkLight
                className="severity notice"
                height="24px"
                width="24px"
              />
            )}
          </Indicator>
          <StyledFadeScroll fadeBottom>
            <Text className="meta_message" type="small-regular" color="dark">
              <MessageComponent message={message} />
            </Text>
          </StyledFadeScroll>
          {!!hasChildren && (
            <ExpandButton onClick={() => setOpen(!isOpen)} variant="tertiary">
              <AuditChevronButton className={!isOpen ? 'closed' : ''} />{' '}
              <Text type="caption">{`${hasChildren} events`}</Text>
            </ExpandButton>
          )}
        </AuditMetaContainer>
      )}
    </EventGroup>
  );
};

export const AuditLog: React.FC<AuditLogProps> = ({ data }) => {
  const treeRef = React.useRef<any>(null);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises, no-unused-expressions
    treeRef.current?.recomputeTree({
      refreshNodes: true,
      useDefaultHeight: true,
    });
  }, [data]);

  const treeWalker = React.useCallback(
    function* treewalker() {
      for (let i = 0; i < data.length; i++) {
        yield getNodeData(data[i], 0);
      }
      while (true) {
        // @ts-expect-error we want to yield!
        const parent = yield;
        for (let i = 0; i < parent.node.children?.length; i++) {
          yield getNodeData(parent.node.children[i], parent.nestingLevel + 1);
        }
      }
    },
    [data]
  );

  return (
    <AutoSizer disableWidth>
      {({ height }) => (
        <VariableSizeTreeCustomScrollBar
          treeWalker={treeWalker}
          height={height}
          width="100%"
          // @ts-expect-error BUG: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
          ref={treeRef}
        >
          {Node as any}
        </VariableSizeTreeCustomScrollBar>
      )}
    </AutoSizer>
  );
};
