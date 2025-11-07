export interface MenuItemProps {
    label: string;
    path: string;
    icon?: React.ReactNode;
    currentPath?: string;
}
export type QuantityOrderProps = {
    quantity: string | null;
    Weight: string | number;
    Volume: number;
  };