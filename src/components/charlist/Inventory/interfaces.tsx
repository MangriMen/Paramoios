export interface InventoryCardProps {
  items: any;
  setItems: any;
  rows: number;
  cols: number;
  disableGrow?: boolean;
  growDirection?: 'vertical' | 'horizontal';
}
