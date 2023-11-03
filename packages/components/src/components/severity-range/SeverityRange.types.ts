export interface SeverityGroupOptions {
  length?: number;
  label?: string;
  value?: number;
  isLoading?: boolean;
  skeletonWidth?: number;
  skeletonHeight?: number;
  onChange: (val: number) => void;
  name?: string;
  dark?: boolean;
}

export interface SeverityBoxProps {
  index: number;
  name?: string;
}
