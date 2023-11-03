import React from 'react';
import { ExpandWrapper, Expand, FadeBottom } from './ExpansionToggle.styled';
import { ExpansionToggleProps } from './ExpansionToggle.types';

export const ExpansionToggle: React.FC<ExpansionToggleProps> = ({
  expanded,
  handleExpansion,
}) => {
  return (
    <>
      <ExpandWrapper>
        <Expand onClick={handleExpansion}>
          {expanded ? 'Condense' : 'Expand'}
        </Expand>
      </ExpandWrapper>
      {!expanded && (
        <>
          <FadeBottom />
        </>
      )}
    </>
  );
};
