import React from 'react';
import styled from 'styled-components';
import { Text } from '../../index';
import { BaseInput, BaseStyledInput } from '../base';
import { BasePrefixedInputProps } from './BasePrefixedInput.types';

const OuterInputAsContainer = styled(BaseStyledInput)`
  display: flex;
  height: unset;
  padding: 0;
  align-items: center;
  padding-left: 24px;

  &:disabled,
  :read-only {
    background: #f1f6fa;
  }
`;

const NoHighlightInput = styled(BaseInput)`
  padding-left: 4px;
  border: none;
  &:hover {
    border: none;
  }
  &:focus {
    border: none;
  }
`;

const PrefixText = styled(Text)`
  line-height: normal;
`;

const removePrefix = (string: string, prefix: string) => {
  const lessPrefix = string?.startsWith(prefix)
    ? string.slice(prefix.length, string.length)
    : string;

  return lessPrefix;
};

export const BasePrefixedInput = React.forwardRef<
  HTMLInputElement,
  BasePrefixedInputProps
>(
  (
    { prefix = 'https://', className, onBlur, onChange, value, ...rest },
    ref
  ) => {
    const [displayVal, setDisplayVal] = React.useState<string>();

    React.useEffect(() => {
      const inputVal = value as string;
      const lessPrefix = removePrefix(inputVal, prefix);

      setDisplayVal(lessPrefix);
    }, [prefix, value]);

    React.useEffect(() => {
      if (!onChange) return;
      const withPrefix = prefix + displayVal;
      onChange(withPrefix);
    }, [displayVal, onChange, prefix]);

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const clipboardData = e.clipboardData || (window as any).clipboardData;
      let string = clipboardData.getData('Text');
      string = removePrefix(string, prefix);

      setDisplayVal(string);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      let string = e.target.value;
      string = removePrefix(string, prefix);

      setDisplayVal(string);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDisplayVal(e.target.value);
    };

    return (
      <OuterInputAsContainer as="div" className={className}>
        <PrefixText className="prefix-text" type="small-bold">
          {prefix}
        </PrefixText>
        <NoHighlightInput
          className="prefix-input"
          ref={ref}
          onPaste={handlePaste}
          onBlur={handleBlur}
          onChange={handleChange}
          value={displayVal}
          {...rest}
        />
      </OuterInputAsContainer>
    );
  }
);
