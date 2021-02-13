<template>
  <div>
    <Container
      title='基础用法'
      sub-title='基础的按钮用法'
    >
      <template #default>
        <ki-button>普通按钮</ki-button>
        <ki-button type='primary'>主要按钮</ki-button>
        <ki-button type='success'>成功按钮</ki-button>
        <ki-button type='warning'>警告按钮</ki-button>
        <ki-button type='error'>失败按钮</ki-button>
        <br>
        <ki-button style='margin-top: 10px;' round>普通按钮</ki-button>
        <ki-button type='primary' style='margin-top: 20px;' round>主要按钮</ki-button>
        <ki-button type='success' style='margin-top: 20px;' round>成功按钮</ki-button>
        <ki-button type='warning' style='margin-top: 20px;' round>警告按钮</ki-button>
        <ki-button type='error' style='margin-top: 20px;' round>失败按钮</ki-button>
        <br>
        <ki-button style='margin-top: 20px;' circular icon='info'></ki-button>
        <ki-button type='primary' style='margin-top: 20px;' circular icon='pencil'></ki-button>
        <ki-button type='success' style='margin-top: 20px;' circular icon='check'></ki-button>
        <ki-button type='warning' style='margin-top: 20px;' circular icon='warning'></ki-button>
        <ki-button type='error' style='margin-top: 20px;' circular icon='close'></ki-button>
      </template>
    </Container>
    <Container
      title='禁用状态'
      sub-title='按钮不可用状态'
    >
      <template #default>
        <ki-button disabled>普通按钮</ki-button>
        <ki-button type='primary' disabled>主要按钮</ki-button>
        <ki-button type='success' disabled>成功按钮</ki-button>
        <ki-button type='warning' disabled>警告按钮</ki-button>
        <ki-button type='error' disabled>失败按钮</ki-button>
        <br>
        <ki-button style='margin-top: 10px;' round disabled>普通按钮</ki-button>
        <ki-button type='primary' style='margin-top: 20px;' round disabled>主要按钮</ki-button>
        <ki-button type='success' style='margin-top: 20px;' round disabled>成功按钮</ki-button>
        <ki-button type='warning' style='margin-top: 20px;' round disabled>警告按钮</ki-button>
        <ki-button type='error' style='margin-top: 20px;' round disabled>失败按钮</ki-button>
      </template>
    </Container>
    <Container
      title='图标按钮'
      sub-title='带图标的按钮'
    >
      <template #default>
        <ki-button icon='info'>普通按钮</ki-button>
        <ki-button type='primary' icon='pencil'>主要按钮</ki-button>
        <ki-button type='success' icon='check'>成功按钮</ki-button>
        <ki-button type='warning' icon='warning'>警告按钮</ki-button>
        <ki-button type='error' icon='close'>失败按钮</ki-button>
        <br>
        <ki-button style='margin-top: 10px;' icon='info' round>普通按钮</ki-button>
        <ki-button type='primary' style='margin-top: 20px;' icon='pencil' round >主要按钮</ki-button>
        <ki-button type='success' style='margin-top: 20px;' icon='check' round >成功按钮</ki-button>
        <ki-button type='warning' style='margin-top: 20px;' icon='warning' round >警告按钮</ki-button>
        <ki-button type='error' style='margin-top: 20px;' icon='close' round >失败按钮</ki-button>
      </template>
    </Container>
    <Container
      title='按钮尺寸'
      sub-title='不同尺寸的按钮'
    >
      <template #default>
        <ki-button size='small'>小型按钮</ki-button>
        <ki-button size='medium'>默认按钮</ki-button>
        <ki-button size='large'>大型按钮</ki-button>
        <br>
        <ki-button size='small' round style='margin-top: 20px;' >小型按钮</ki-button>
        <ki-button size='medium' round style='margin-top: 20px;' >默认按钮</ki-button>
        <ki-button size='large' round style='margin-top: 20px;' >大型按钮</ki-button>
      </template>
    </Container>
    <Attribute :attributes='attributes' />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

import { Button } from '@/components';
import Attribute from './component/attributes.vue';
import Container from './component/container.vue';

export default defineComponent({
  components: {
    KiButton: Button,
    Container,
    Attribute,
  },
  setup() {
    const attributes = [
      {
        attribute: 'type',
        description: '按钮类型',
        type: 'string',
        option: 'primary | success | error | warning',
        default: '--',
      },
      {
        attribute: 'size',
        description: '按钮尺寸',
        type: 'string',
        option: 'small | medium | large',
        default: 'medium',
      },
      {
        attribute: 'icon',
        description: '按钮图标',
        type: 'string',
        option: '-',
        default: '-',
      },
      {
        attribute: 'round',
        description: '是否圆角',
        type: 'boolean',
        option: 'true | false',
        default: 'false',
      },
      {
        attribute: 'circular',
        description: '圆形按钮',
        type: 'boolean',
        option: 'true | false',
        default: 'false',
      },
      {
        attribute: 'disabled',
        description: '是否禁用',
        type: 'boolean',
        option: 'true | false',
        default: 'false',
      },
    ];
    return {
      attributes,
    };
  },
});
</script>

<style scoped lang='less'>
  .ki-btn {
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }
</style>
