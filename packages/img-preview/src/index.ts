import type { Show } from './img-preview.type.d';
import ImgPreview from './instance';

let instance: { show: Show };
function getInstance() {
  return instance || (instance = ImgPreview.instance());
}

export default {
  show(imgs, index, options) {
    getInstance().show(imgs, index, options);
  },
} as {
  show: Show,
};
