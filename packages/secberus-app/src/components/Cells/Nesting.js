import React from 'react';
import styled from 'styled-components';

export const NestedListItemLabel = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Nest = styled.div`
  margin-left: ${props => props.multiplier * props.indent}px;
  white-space: normal;
`;

export const WithNesting = ({
  children,
  depth,
  maxDepth,
  className,
  onClick,
}) => {
  const multiplier = Math.min(depth, maxDepth);
  return (
    <Nest
      className={className}
      multiplier={multiplier}
      indent={24}
      onClick={onClick}
    >
      {children}
    </Nest>
  );
};
