interface ToggleOption {
  id: string;
  display: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  to?: string;
}

export interface ToggleProps {
  buttons: ToggleOption[];
  value?: string;
  onChange?: (id: string) => void;
  name?: string;
  className?: string;
}
