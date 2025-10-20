export interface MenuItemProps {
    label: string;
    path: string;
    icon?: React.ReactNode;
    currentPath?: string;
}
export type QuantityOrderProps = {
    Quantity: number;
    Weight: string | number;
    Volume: number;
  };