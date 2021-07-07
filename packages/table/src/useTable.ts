import type { TableColumn, UseTable } from './typings';


export function useTable(): UseTable {
  const getColumnClass = (column: TableColumn) => {
    return [
      column.align && `is_${column.align}`,
    ].filter((item) => !!item) as string[];
  };

  return {
    getColumnClass,
  };
}
