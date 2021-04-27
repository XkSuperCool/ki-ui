import { createApp } from 'vue';
import type { Component, ComponentPublicInstance } from 'vue';

const useMount = <T>(component: Component) => {
  const container = document.createElement('div');
  const instance = createApp(component).mount(container) as ComponentPublicInstance & T;
  const message = instance.$el;
  document.body.appendChild(message);

  return instance;
}

export default useMount;
