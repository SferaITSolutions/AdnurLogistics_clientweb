export interface MenuItemProps {
    label: string;
    path: string;
    icon?: React.ReactNode;
    currentPath?: string;
}
export type QuantityOrderProps = {
    Weight: string | number;
    Volume: number;
  };