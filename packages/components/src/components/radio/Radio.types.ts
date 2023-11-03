export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  dark?: boolean;
  subtext?: string;
  value?: string;
}
