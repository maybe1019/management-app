import { Icons } from './index';
export interface HeaderProps {
  provider: keyof typeof Icons;
  name: string;
}
