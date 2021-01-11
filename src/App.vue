<template>
  <div class='app'>
<!--    当前页：{{currentPage}}-->
<!--    <pagination-->
<!--      background-->
<!--      :total='200'-->
<!--      isTotal-->
<!--      elevator-->
<!--      hide-on-single-page-->
<!--      :page-sizes="[10, 20, 30, 40]"-->
<!--      :page-size="20"-->
<!--      v-model:current-page='currentPage'-->
<!--    />-->
<!--    <Button @click='change'>change</Button>-->
<!--    <hr />-->
    <Select v-model='selectValue' width='240px' clearable multiple>
      <OptionGroup label='热门城市'>
        <Option :value='5' label='青岛'></Option>
        <Option :value='6' label='天津'></Option>
      </OptionGroup>
      <OptionGroup label='推荐城市'>
        <Option :value='7' label='四川'></Option>
        <Option :value='8' label='重庆'></Option>
      </OptionGroup>
      <OptionGroup label='网红城市'>
        <Option :value='3' label='长沙'></Option>
        <Option :value='4' label='北京'></Option>
        <Option :value='1' label='成都'></Option>
        <Option :value='2' label='济南'></Option>
        <Option :value='10' label='呼和浩特'></Option>
      </OptionGroup>
    </Select>
    <hr>
    <div class='tags'>
      <Tag size='mini'>超小标签</Tag>
      <Tag size='small'>小标签</Tag>
      <Tag size='medium'>中标签</Tag>
      <Tag size='large' closable>大标签</Tag>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import {
  // Pagination,
  Select, Button,
  Tag,
} from '@/components';

export default defineComponent({
  name: 'App',
  components: {
    // Pagination,
    Select,
    Option: Select.Option,
    OptionGroup: Select.OptionGroup,
    Tag,
  },
  setup() {
    const currentPage = ref(1);
    const selectValue = ref([2]);

    const change = () => {
      currentPage.value = Math.floor(Math.random() * 10 + 1);
    };

    return {
      currentPage,
      change,
      selectValue,
    };
  },
});
</script>

<style lang='less'>
  .app {
    padding: 20px;
    box-sizing: border-box;
  }

  .title {
    margin: 5px 0;
  }

  .btns {
    .ki-btn {
      margin-right: 10px;
    }
  }

  .ki-alert {
    margin-bottom: 5px;
  }

  .tags > div {
    margin-right: 3px;
  }
</style>
