import React from 'react';
import { useDeepEffect, useDeepMemo } from '@secberus/utils';
import { SidebarProps, SidebarPanel } from './SidebarPanel.component';
type Options = SidebarProps['items'][0]['builder']['checkProps']['options'][0];
type SidebarItem = {
  id: string;
  label: string;
  key: string;
  options: Pick<Options, 'label' | 'value' | 'icon'>[];
};

type UseSidebarPanelProps = {
  items: SidebarItem[];
} & Pick<SidebarProps, 'title' | 'backgroundColor'>;

export const useSidebarPanel = ({ items, ...args }: UseSidebarPanelProps) => {
  const [selectedItems, setSelectedItems] = React.useState<
    Record<string, string[]>
  >(
    items.reduce((acc: Record<string, string[]>, val: SidebarItem) => {
      acc[val.id] = [];
      return acc;
    }, {})
  );

  const sidebarItems = useDeepMemo(
    () =>
      items.map((item: SidebarItem) => ({
        key: item.key,
        builder: {
          groupProps: {
            id: item.id,
            label: item.label,
          },
          checkProps: {
            name: item.label,
            options: item.options.map(option => ({
              ...option,
              checked: selectedItems[item.id].indexOf(option.value) > -1,
            })),
            checked: selectedItems[item.id],
            onChange: (value: string[]) => {
              setSelectedItems({
                ...selectedItems,
                [item.id]: value,
              });
            },
          },
        },
      })),
    [items, selectedItems]
  );

  useDeepEffect(() => {
    sidebarItems.forEach(
      ({
        builder: {
          checkProps: { name, options },
        },
      }) => {}
    );
  }, [selectedItems, sidebarItems]);

  return {
    Sidebar: <SidebarPanel items={sidebarItems} {...args} />,
    selectedItems,
    setSelectedItems,
  };
};
