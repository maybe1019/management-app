import { ColorProperties } from '@secberus/components';
import CheckboxGroup, {
  CheckboxGroupProps,
} from '../filter-panel/CheckboxGroup';
import { FilterGroupProps } from '../filter-panel/FilterGroup.component';
import { Title } from '../filter-panel/FilterPanel.styled';
import {
  SidebarPanelContentHeader,
  SidebarHeader,
  SidebarGroup,
} from './SidebarPanel.styled';

export type CheckboxBuilderProps = {
  groupProps: FilterGroupProps;
  checkProps: CheckboxGroupProps;
};

export type SidebarProps = {
  backgroundColor?: ColorProperties;
  title: string;
  items: {
    key: string;
    builder: CheckboxBuilderProps;
  }[];
};

function CheckboxBuilder({ groupProps, checkProps }: CheckboxBuilderProps) {
  return (
    <SidebarGroup {...groupProps}>
      <CheckboxGroup {...checkProps} />
    </SidebarGroup>
  );
}

export function SidebarPanel({ backgroundColor, title, items }: SidebarProps) {
  return (
    <SidebarPanelContentHeader>
      <SidebarHeader backgroundColor={backgroundColor}>
        <Title>{title}</Title>
      </SidebarHeader>
      {items.map(({ key, builder }) => (
        <CheckboxBuilder key={key} {...builder} />
      ))}
    </SidebarPanelContentHeader>
  );
}
