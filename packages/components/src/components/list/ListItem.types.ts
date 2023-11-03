// export interface ListItemProps {
//   id: string;
//   name: string;
//   onClick?: (e: React.MouseEvent<HTMLElement>) => void;
// }

// export interface ListItemProps {
//   rowHeight?: number;
// }

export interface ListItemProps {
  id: string;
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
  rowHeight?: number;
  Icon?: JSX.Element;
}
