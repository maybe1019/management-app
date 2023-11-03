import React from 'react';
import { DeleteKeyValueSearch } from '@secberus/icons';
import { Text } from '@secberus/components';
import {
  KeyField,
  ValueField,
  Separator,
  InputFilterWrapper,
  InputAction,
  InputContainer,
  InputGroup,
  SelectedChip,
  RemoveChip,
} from './KeyValueSearch.styled';
import { KeyValueFilterProps } from './KeyValueSearch.types';

export const KeyValueSearch: React.FC<KeyValueFilterProps> = ({
  onChange,
  values = [],
  allFieldsRequired,
}) => {
  const [keyFieldVal, setKeyFieldVal] = React.useState('');
  const [valueFieldVal, setValueFieldVal] = React.useState('');

  const valueInputRef = React.useRef<HTMLInputElement>(null);

  const onAdd = () => {
    if (!keyFieldVal && !valueFieldVal) return;

    const next = [...values, [keyFieldVal, valueFieldVal]];
    onChange(next);
    setKeyFieldVal('');
    setValueFieldVal('');
  };

  const onKeyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.endsWith(':')) {
      return valueInputRef?.current?.focus();
    }
    setKeyFieldVal(e.target.value);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const clipboardData = e.clipboardData || (window as any).clipboardData;
    const string = clipboardData.getData('Text');
    const [key, val] = string.split(':');
    setKeyFieldVal(key.trim());
    setValueFieldVal(val.trim());
  };

  const onValueInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueFieldVal(e.target.value);
  };

  const onRemove = (str: string) => {
    const next = values.filter(([k]) => k !== str);
    onChange(next);
  };

  return (
    <InputFilterWrapper>
      <InputContainer>
        <InputGroup>
          <KeyField
            placeholder="Key"
            onChange={onKeyInputChange}
            value={keyFieldVal}
            backgroundColor="light-gray"
            borderRadius="8px 0px 0px 8px"
            onPaste={handlePaste}
          />
          <Separator backgroundColor="light-gray">:</Separator>
          <ValueField
            placeholder="Value"
            onChange={onValueInputChange}
            value={valueFieldVal}
            backgroundColor="light-gray"
            borderRadius="0px"
            ref={valueInputRef}
          />
        </InputGroup>
        <InputAction
          onClick={onAdd}
          disabled={allFieldsRequired && (!keyFieldVal || !valueFieldVal)}
        >
          +
        </InputAction>
      </InputContainer>
      <div>
        {values.map(([k, v]) => (
          <SelectedChip key={`${k}${v}`}>
            <Text type="small-regular">{k}: </Text>
            <Text type="small-bold">{v}</Text>
            <RemoveChip onClick={() => onRemove(k)}>
              <DeleteKeyValueSearch />
            </RemoveChip>
          </SelectedChip>
        ))}
      </div>
    </InputFilterWrapper>
  );
};
