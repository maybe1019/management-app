import { Option } from '@secberus/components';

export type OverlayExpanderButtonLogoType = React.ComponentType<
  React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
>;

export type OverlayExpanderCellButtonType = 'expand' | 'pen' | 'more';

export interface OverlayExpanderCellProps {
  buttonText?: string;
  buttonIcon?: OverlayExpanderCellButtonType;
  buttonOptions?: Option[];
  buttonOptionsOpen?: boolean;
}
