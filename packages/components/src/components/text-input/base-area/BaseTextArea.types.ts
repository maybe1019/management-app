export interface BaseTextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  height?: string | number;
}
