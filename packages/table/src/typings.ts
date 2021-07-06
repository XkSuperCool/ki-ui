import { h, VNode } from 'vue';

export interface TableColumn {
  key?: string | number;
  title: string;
  width?: number;
  align?: 'left' | 'right' | 'center';
  render?: (render: typeof h) => VNode | VNode[];
}

export interface UseTable {
  getColumnClass: (column: TableColumn) => string[];
}
