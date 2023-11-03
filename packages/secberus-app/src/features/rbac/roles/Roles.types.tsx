export interface RolesProps {
  isVisible: boolean;
  onClose?: (...args: any) => void;
}

export interface RolePermissionConstant {
  section_title?: boolean;
  text: string;
  viewer?: boolean;
  contributor?: boolean;
  admin?: boolean;
  owner?: boolean;
}
