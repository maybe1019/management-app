import React from 'react';
import { Expand, Pen, More } from '@secberus/icons';
import { Button, ButtonDropdown, Text } from '@secberus/components';
import { createEnvAwareLogger } from '@secberus/utils';
import { StyledOverlayExpanderCell } from './OverlayExpanderCell.styled';
import {
  OverlayExpanderButtonLogoType,
  OverlayExpanderCellButtonType,
  OverlayExpanderCellProps,
} from './OverlayExpanderCell.types';

const iconMapping: Record<
  OverlayExpanderCellButtonType,
  OverlayExpanderButtonLogoType
> = {
  pen: Pen,
  expand: Expand,
  more: More,
};

const logger = createEnvAwareLogger();

export const OverlayExpanderCell: React.FC<OverlayExpanderCellProps> = ({
  children,
  buttonText = null,
  buttonIcon = null,
  buttonOptions = null,
  buttonOptionsOpen,
}) => {
  const Icon = React.useMemo(() => {
    if (buttonIcon && Object.keys(iconMapping).includes(buttonIcon)) {
      return iconMapping[buttonIcon];
    } else if (buttonOptions && !buttonIcon) {
      return iconMapping['more'];
    }
    return null;
  }, [buttonIcon, buttonOptions]);

  if (!buttonText && !buttonIcon) {
    logger.warn(
      'OverlayExpanderCell must have props `buttonText`, `buttonIcon` or both. No button component will be rendered.'
    );
  }

  return (
    <StyledOverlayExpanderCell className="overlay-expander-cell">
      {children}
      {buttonOptions ? (
        <ButtonDropdown
          icon
          alignRight
          listWidth="224px"
          variant="secondary"
          size="small"
          listTop="32px"
          className="overlay-expander-cell-button"
          label={Icon ? <Icon width="24px" height="24px" /> : null}
          options={buttonOptions}
        />
      ) : (
        <>
          {buttonText || buttonIcon ? (
            <Button
              icon={Boolean(Icon && !buttonText)}
              variant="secondary"
              className="overlay-expander-cell-button"
              size="small"
            >
              {Icon ? <Icon width="24px" height="24px" /> : null}
              {buttonText && (
                <Text type="xsmall-bold" className={Icon ? 'with-icon' : ''}>
                  {buttonText}
                </Text>
              )}
            </Button>
          ) : null}
        </>
      )}
    </StyledOverlayExpanderCell>
  );
};
