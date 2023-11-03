import React from 'react';
import { FrameMain } from './Frame.types';
import { FrameContainer, StyledText } from './Frame.styled';

export const Frame: React.FC<FrameMain> = ({
  children,
  variant,
  title,
  isVisible,
  backgroundColor,
  borderColor,
  borderSize,
  titleColor,
}) => {
  return (
    <FrameContainer
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderSize={borderSize}
      className={variant}
      isVisible={isVisible}
    >
      {title ? (
        <StyledText
          type="small"
          color={
            titleColor ? titleColor : variant !== 'tertiary' ? 'white' : 'dark'
          }
        >
          {title}
        </StyledText>
      ) : (
        ''
      )}
      {children}
    </FrameContainer>
  );
};
