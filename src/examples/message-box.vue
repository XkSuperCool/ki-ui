<template>
 <div>
   <Container title='基础使用'>
     <a @click='handleOpen'>点击打开 Message Box</a>
   </Container>
   <Container title='确认消息'>
     <a @click='handleOpen2'>点击打开 Message Box</a>
   </Container>
 </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { MessageBox } from '@/components';
import { Container } from './component';

export default defineComponent({
  name: 'MessageBoxExample',
  components: {
    Container,
  },
  setup() {
    const handleOpen = () => {
      MessageBox.alert('这里是内容区域..', {});
    };

    const handleOpen2 = () => {
      MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示信息', {
        confirmType: 'warning',
        callback(action) {
          console.log(action);
        },
      });
    };

    return {
      handleOpen,
      handleOpen2,
    };
  },
});
</script>

<style lang='less' scoped>
  a {
    color: var(--primary-shallow-color);
    font-size: 14px;
    cursor: pointer;

    &:hover {
      color: var(--primary-color);
    }
  }
</style>
