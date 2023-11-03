/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { CopyLight, CheckMarkLargeLight } from '@secberus/icons';
import { useMergeRefs, createEnvAwareLogger } from '@secberus/utils';
import { Input, InputProps } from '../input/index';
import { Tooltip } from '../../tooltip/Tooltip.component';
import { TextArea, TextAreaProps } from '../text-area';
import type { CopyFieldProps } from './CopyField.types';
import { StyledCopyField, CopyButton } from './CopyField.styles';

const DEFAULT_TOOLTIP = 'Copy field';
const logger = createEnvAwareLogger();

/**
 * A text field or text area with a copy option
 *
 * @remarks
 * For accurate types when specifying text area use generic
 *
 * @typeParam T - defaults to "field" for text field props. Specify "area" for text area props when using as a text area
 */
export const CopyField = <T,>({
  label,
  value,
  type,
  onError,
  onCopy,
  copyFieldRef,
  ...rest
}: React.PropsWithChildren<CopyFieldProps<T>>) => {
  const [inputNode, setInputNode] = React.useState<any>();
  const internalRef = React.useCallback(node => {
    if (node !== null) {
      setInputNode(node);
    }
  }, []);

  const [copied, setCopied] = React.useState(false);
  const [tooltipText, setTooltipText] = React.useState(DEFAULT_TOOLTIP);
  const copyToClipboard = () => {
    const inputVal = value || inputNode.value;

    navigator.clipboard.writeText(inputVal).then(
      () => {
        setCopied(true);
        setTooltipText('Copied!');
        setTimeout(() => {
          setCopied(false);
          setTooltipText(DEFAULT_TOOLTIP);
        }, 1500);
        onCopy && onCopy(inputVal);
      },
      () => {
        logger.error('Unable to write to clipboard');
        onError && onError();
      }
    );
  };

  const refs = useMergeRefs(internalRef, copyFieldRef);

  return (
    <StyledCopyField>
      {type === 'area' ? (
        <TextArea
          label={label}
          value={value}
          ref={refs as React.Ref<HTMLTextAreaElement>}
          disabled
          {...(rest as TextAreaProps)}
        />
      ) : (
        <Input
          ref={refs as React.Ref<HTMLInputElement>}
          label={label}
          value={value}
          disabled
          {...(rest as InputProps)}
        />
      )}
      <CopyButton
        className={type}
        variant="icon"
        onClick={copyToClipboard}
        data-tip={tooltipText}
        data-for="copy-input"
      >
        {copied ? (
          <CheckMarkLargeLight className="copy-input-icon" />
        ) : (
          <CopyLight className="copy-input-icon" />
        )}
      </CopyButton>
      <Tooltip id="copy-input" place="left" />
    </StyledCopyField>
  );
};
