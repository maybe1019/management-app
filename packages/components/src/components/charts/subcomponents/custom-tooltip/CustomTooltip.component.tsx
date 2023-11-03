import React from 'react';
import { formatNumberWithCommas } from '@secberus/utils';
import { Text, TooltipPortal } from '../../../';
import { StyledTooltip, FlexWrapper } from './CustomTooltip.styled';

export const CustomTooltip = React.forwardRef<HTMLDivElement, any>(
  (props, ref) => {
    const {
      icon = undefined,
      show,
      active,
      payload,
      position,
      usePortal,
      dataStringModifiers = {},
    } = props;

    const dataValueStr = React.useMemo(() => {
      const payloadDataValue = payload?.[0]?.payload?.value || 0;
      const { prepend, append, decimalPlaces } = dataStringModifiers;
      return `${prepend ?? ''}${formatNumberWithCommas(
        payloadDataValue,
        decimalPlaces
      )}${append ?? ''}`;
    }, [dataStringModifiers, payload]);

    if (!show) return null;

    const dateJoin = (
      datetime: any,
      optionsArray: { [key: string]: string | undefined }[],
      joinBy: string
    ) => {
      const format = (
        dateTimeFormat: Intl.DateTimeFormatOptions | undefined
      ) => {
        return new Intl.DateTimeFormat('en', dateTimeFormat).format(datetime);
      };
      return optionsArray.map(format).join(joinBy);
    };

    if (active && payload && payload.length) {
      const payloadData = payload?.[0]?.payload;
      const options = [{ day: 'numeric' }, { month: 'short' }];
      const date = payloadData?.timestamp
        ? dateJoin(
            new Date(0).setUTCSeconds(payloadData?.timestamp),
            options,
            ' '
          )
        : 'Invalid date';
      return (
        <TooltipPortal usePortal={usePortal} portalElementId="tooltip">
          <StyledTooltip
            ref={ref}
            className="custom-tooltip"
            isPortaled={usePortal}
            x={position.x}
            y={position.y}
          >
            <Text className="dateText" type="xsmall-bold" color="medium-gray">
              {date}
            </Text>
            <FlexWrapper>
              {icon}
              <Text type="small-bold" color="white">
                {dataValueStr}
              </Text>
            </FlexWrapper>
          </StyledTooltip>
        </TooltipPortal>
      );
    }
    return null;
  }
);
