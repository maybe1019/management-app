export interface OrganizationSelectProps
  extends React.HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  dark?: boolean;
  transformName?: (name: string) => string;
}

export interface AnimatedExpandIconProps {
  open?: boolean;
}
