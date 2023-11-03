import React from 'react';
import { Text, TextProps } from '../text';
import { IconTagContainer } from './IconTag.styled';
import { IconTagProps } from './IconTag.types';
export const IconTag: React.FC<IconTagProps & { textProps: TextProps }> = ({
  value,
  children,
  textProps = {
    type: 'xsmall',
  },
  ...CSSProps
}) => {
  return (
    <IconTagContainer className="icon_tag_container" {...CSSProps}>
      <div>{children}</div>
      <Text {...textProps}>{value}</Text>
    </IconTagContainer>
  );
};
