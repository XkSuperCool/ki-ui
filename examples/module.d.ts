declare module "*.md" {
  const content: string;
  export default content;
}

declare module '*.vue' {
  import type { defineComponent } from 'vue';

  const component: ReturnType<typeof defineComponent>;
  export default component;
}
