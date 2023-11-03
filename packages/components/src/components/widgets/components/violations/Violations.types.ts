// TODO: refactor widget folder structure and remove Violations interface
export interface Violations {
  critical?: number;
  high?: number;
  medium?: number;
  low?: number;
}

export interface ViolationContainerProps {
  filterable?: boolean;
}

export interface ViolationWidgetFilterComponentProps {
  title?: string;
  onClick?: (type: string, data: any) => void;
  summary: {
    CRITICAL: number;
    HIGH: number;
    MEDIUM: number;
    LOW: number;
  };
}
