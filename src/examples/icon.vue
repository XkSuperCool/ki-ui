<template>
  <div>
    <Container
      title='基本用法'
      sub-title='Icon 组件基于 Font Awesome 进行封装，直接传递 type = <a target="__blank" href="http://www.fontawesome.com.cn/faicons/">Font Awesome</a> 对应的 icon 名即可。'
    >
      <template #default>
        <ki-icon type='check' />
        <ki-icon type='close' />
        <ki-icon type='info' />
      </template>
    </Container>
    <Attributes :attributes='attributes' />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { Icon } from '@/components';
import Container from './component/container.vue';
import Attributes from './component/attributes.vue';

export default defineComponent({
  name: 'IconExample',
  components: {
    KiIcon: Icon,
    Container,
    Attributes,
  },
  setup() {
    const attributes = [
      {
        attribute: 'type',
        description: 'icon 类型名称',
        type: 'string',
        option: '——',
        default: '——',
      },
    ];
    return {
      attributes,
    };
  },
});
</script>

<style scoped lang='less'>
  .fa {
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }
</style>
