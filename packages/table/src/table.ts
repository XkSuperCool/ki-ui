import { shallowReactive } from 'vue';
import type { CSSProperties } from 'vue';
import type { TableColumn }  from './table.vue';

export type CacheStyleMap = {
  [key: string]: CSSProperties;
};
export interface GetStyleFunction {
  (column: TableColumn): CSSProperties | undefined;
}

export function useStyle(): GetStyleFunction {
  const cacheStyleMap = shallowReactive<CacheStyleMap>({});

  return (column: TableColumn) => {
    const { key, width, align } = column;

    if (!key) {
      return;
    }

    if (cacheStyleMap[key]) {
      return cacheStyleMap[key];
    }

    return cacheStyleMap[key] = {
      width: width ? `${width}px` : 'auto',
      textAlign: align,
    };
  };
}
