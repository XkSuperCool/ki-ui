import ImgPreview from './img-preview';
import { mountBody } from '@/utils';
import type {Show} from './img-preview.type.d';

ImgPreview.instance = () => {
  const instance = mountBody<{
    show: Show;
  }>(ImgPreview);

  return {
    show(imgs, index, options) {
      instance.show(imgs, index, options);
    },
  } as {
    show: Show;
  };
};

export default ImgPreview;
