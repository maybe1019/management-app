import React from 'react';
import { DeleteLight, SearchDark } from '@secberus/icons';
import { Tooltip } from '@secberus/components';
import { InputSearchComponentProps } from './InputSearchComponent.types';
import {
  InputFilterWrapper,
  InputAction,
  SearchInput,
  CancelButton,
  ButtonGroup,
} from './InputSearchComponent.styled';

export const InputSearchComponent: React.FC<InputSearchComponentProps> = ({
  onChange,
  backgroundColor,
  value,
  enableWithNoLength = false,
  className,
  onClose,
  expands = false,
  placeholder,
  buttonLabel,
}) => {
  const [inputVal, setInputVal] = React.useState(value);

  React.useEffect(() => {
    if (!value) return;
    setInputVal(value);
  }, [value]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputVal && !enableWithNoLength) return;

    onChange(inputVal);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const onClear = () => {
    setInputVal('');
    onChange && onChange('');
    onClose && onClose();
  };

  return (
    <>
      <InputFilterWrapper onSubmit={onSubmit}>
        <ButtonGroup className={className}>
          <SearchInput
            placeholder={placeholder}
            onChange={onInputChange}
            value={inputVal}
            backgroundColor={backgroundColor}
            borderRadius="8px 0 0 8px"
          />
          <CancelButton
            className={expands ? '' : inputVal?.length ? '' : 'hidden'}
            data-tip="Clear search"
            data-for="searchTooltip"
            onClick={onClear}
            type="button"
          >
            <DeleteLight stroke="#6A6A88" />
          </CancelButton>
        </ButtonGroup>
        <InputAction
          type="submit"
          data-test-id="submitInputSearchValue"
          className={className}
        >
          {buttonLabel ?? <SearchDark />}
        </InputAction>
      </InputFilterWrapper>
      {inputVal?.length || enableWithNoLength ? (
        <Tooltip id="searchTooltip" place="bottom" />
      ) : (
        <></>
      )}
    </>
  );
};
