import React from 'react';
import { isEqual } from 'lodash';
import { Flex, Spinner } from '@chakra-ui/react';
import { Checkbox, Text } from '@secberus/components';

export type CheckboxGroupItem = {
  label: string;
  value: string;
  icon?: React.ComponentType<any>;
  checked?: boolean;
};
export type CheckboxGroupProps = {
  options: CheckboxGroupItem[];
  onChange: (value: string[]) => void;
  checked?: string[];
  name: string;
  isLoading?: boolean;
};
const CheckboxGroup = ({
  options,
  onChange,
  checked = [],
  name,
  isLoading,
}: CheckboxGroupProps) => {
  const checkedList = new Set(checked);
  if (isLoading) return <Spinner />;
  return (
    <>
      {options.map(({ label, value, icon: Icon, checked: itemChecked }) => (
        <Checkbox
          id={`${name}-${value}`}
          value={value}
          name={name}
          key={`${name}-${value}`}
          onChange={() => {
            if (checkedList.has(value)) {
              checkedList.delete(value);
            } else {
              checkedList.add(value);
            }
            onChange(Array.from(checkedList));
          }}
          checked={itemChecked || checkedList.has(value)}
        >
          <Flex gridGap="8px" alignItems="center">
            {Icon && (
              <Icon
                className="BaseFilter__icon"
                height="20px"
                width="20px"
                id={`${name}-${value}`}
              />
            )}
            <Text type="small-regular">{label}</Text>
          </Flex>
        </Checkbox>
      ))}
    </>
  );
};

export default React.memo(CheckboxGroup, isEqual);
