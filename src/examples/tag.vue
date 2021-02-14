<template>
 <div>
   <Container
    title='基本用法'
    sub-title='Tag 的基本用法'
   >
     <ki-tag>标签一</ki-tag>
     <ki-tag type='success'>标签二</ki-tag>
     <ki-tag type='info'>标签三</ki-tag>
     <ki-tag type='warning'>标签四</ki-tag>
     <ki-tag type='error'>标签五</ki-tag>
   </Container>
   <Container
     title='可移除标签'
     sub-title='点击可以移除掉'
   >
     <ki-tag closable>标签一</ki-tag>
     <ki-tag type='success' closable>标签二</ki-tag>
     <ki-tag type='info' closable>标签三</ki-tag>
     <ki-tag type='warning' closable>标签四</ki-tag>
     <ki-tag type='error' closable>标签五</ki-tag>
   </Container>
   <Container
     title='不同尺寸'
     sub-title='不同尺寸大小的标签'
   >
     <ki-tag closable size='mini'>标签一</ki-tag>
     <ki-tag closable size='small'>标签二</ki-tag>
     <ki-tag closable size='medium'>标签三</ki-tag>
     <ki-tag closable size='large'>标签四</ki-tag>
   </Container>
   <Container
     title='自定义颜色'
     sub-title='通过 color 属性自定义标签颜色'
   >
     <ki-tag color='red'>标签一</ki-tag>
     <ki-tag color='blue'>标签一</ki-tag>
     <ki-tag color='yellow' font-color='#000'>标签一</ki-tag>
     <ki-tag color='pink' font-color='#000'>标签一</ki-tag>
   </Container>
   <Attributes :attributes='attributes' />
   <Attributes :attributes='events' target='event' />
 </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { Tag } from '@/components';
import Container from './component/container.vue';
import Attributes from './component/attributes.vue';

export default defineComponent({
  name: 'TagExample',
  components: {
    KiTag: Tag,
    Container,
    Attributes,
  },
  setup() {
    const events = [
      {
        name: 'on-close',
        description: '移除 Tag 时触发',
        type: '() => void',
      },
    ];
    const attributes = [
      {
        attribute: 'type',
        description: '按钮类型',
        type: 'string',
        option: 'primary | small | error | warning | info',
        default: 'primary',
      },
      {
        attribute: 'size',
        description: '按钮尺寸',
        type: 'string',
        option: 'mini | success | medium | large',
        default: 'medium',
      },
      {
        attribute: 'closable',
        description: '是否可移除',
        type: 'boolean',
        option: 'true | false',
        default: 'false',
      },
      {
        attribute: 'color',
        description: '标签背景颜色，设置后 type 将不起作用',
        type: 'string',
        option: '——',
        default: '——',
      },
      {
        attribute: 'font-color',
        description: '标签文字颜色，只有在设置了 color 属性后才能生效',
        type: 'string',
        option: '——',
        default: '——',
      },
    ];
    return {
      attributes,
      events,
    };
  },
});
</script>

<style scoped lang='less'>
  .ki-tag {
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }
</style>
