import {ComponentInternalInstance} from 'vue';

export interface Options {
  scale: number,
  rotate: number,
}

export interface Show {
  (urls: string[], index?: number, options?: Options);
}

export type ImgPreview = ComponentInternalInstance & {
  ctx: {
    show: Show;
  };
};

