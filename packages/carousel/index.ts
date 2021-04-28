import Carousel from './src/carousel.vue';
import CarouselItem from './src/carousel-item.vue';
import { createApp } from 'vue';
const { component } = createApp({});

Carousel.install = () => {
  component(Carousel.name, Carousel);
};

CarouselItem.install = () => {
  component(CarouselItem.name, CarouselItem);
};

export {
  Carousel,
  CarouselItem,
};
