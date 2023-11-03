import React from 'react';
import { PageHeaderProps } from './PageHeader.types';
import {
  Container,
  HeaderContentContainer,
  Content,
  Title,
  Divider,
} from './PageHeader.styles';

export const PageHeader: React.FC<PageHeaderProps> = ({
  sticky,
  title,
  align = 'flex-end',
  children,
}) => (
  <Container>
    <HeaderContentContainer className={title ? '' : 'fullWidth'}>
      {title && <Title type="small">{title}</Title>}
      <Content align={align} className={title ? '' : 'fullWidth'}>
        {children}
      </Content>
    </HeaderContentContainer>
    <Divider />
  </Container>
);
