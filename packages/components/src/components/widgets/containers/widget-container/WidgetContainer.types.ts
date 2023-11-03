import { ToolTipProps } from '../../../tooltip';

export interface WidgetContainerComponentMain {
  className?: string;
  title?: string;
  showTooltip?: boolean;
  tooltipText?: string;
  tooltipProps?: ToolTipProps;
  componentRight?: null | React.FC | React.ElementType | Element | JSX.Element;
}
