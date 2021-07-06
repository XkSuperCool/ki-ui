import type { TableColumn, UseTable } from './typings';


export function useTable(): UseTable {
  const getColumnClass = (column: TableColumn) => {
    const cssClass = [];
    column.align && cssClass.push(`is_${column.align}`);
    return cssClass;
  };

  return {
    getColumnClass,
  };
}
