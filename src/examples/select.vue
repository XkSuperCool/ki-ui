<template>
  <div>
    <Container
      title='基本用法'
      sub-title='Select 的基本用法'
    >
      <ki-select v-model='select' style='width: 300px;'>
        <ki-option label='选项1' value='1'></ki-option>
        <ki-option label='选项2' value='2'></ki-option>
        <ki-option label='选项3' value='3'></ki-option>
        <ki-option label='选项4' value='4'></ki-option>
      </ki-select>
    </Container>
    <Container
      title='禁用 Option'
      sub-title='禁用单独的 Option，在 Option 上指定 disabled 即可'
    >
      <ki-select v-model='select1' style='width: 300px;' placeholder='选择对应选项'>
        <ki-option label='选项1' value='1' disabled></ki-option>
        <ki-option label='选项2' value='2'></ki-option>
        <ki-option label='选项3' value='3' disabled></ki-option>
        <ki-option label='选项4' value='4'></ki-option>
      </ki-select>
    </Container>
    <Container
      title='禁用状态'
      sub-title='Select 上指定 disabled 可以将其禁用'
    >
      <ki-select v-model='select1' style='width: 300px;' disabled>
        <ki-option label='选项1' value='1' disabled></ki-option>
        <ki-option label='选项2' value='2'></ki-option>
        <ki-option label='选项3' value='3' disabled></ki-option>
        <ki-option label='选项4' value='4'></ki-option>
      </ki-select>
    </Container>
    <Container
      title='清空按钮'
      sub-title='Select 上指定 clearable 为 true，会出现清空按钮，点击后会清空 Select'
    >
      <ki-select v-model='select2' style='width: 300px;' clearable>
        <ki-option label='选项1' value='1' disabled></ki-option>
        <ki-option label='选项2' value='2'></ki-option>
        <ki-option label='选项3' value='3' disabled></ki-option>
        <ki-option label='选项4' value='4'></ki-option>
      </ki-select>
    </Container>
    <Container
      title='基础多选'
      sub-title='选择多个选项，使用 Tag 展示已选项'
    >
      <ki-select v-model='select3' style='width: 300px;' clearable multiple>
        <ki-option label='选项1' value='1'></ki-option>
        <ki-option label='选项2' value='2'></ki-option>
        <ki-option label='选项3' value='3'></ki-option>
        <ki-option label='选项4' value='4'></ki-option>
      </ki-select>
    </Container>
    <Container
      title='分组展示'
      sub-title='选项分组展示'
    >
      <ki-select v-model='select4' style='width: 300px;' clearable multiple>
        <ki-option-group label='热门城市'>
          <ki-option label='北京' value='1'></ki-option>
          <ki-option label='上海' value='2'></ki-option>
          <ki-option label='广州' value='3'></ki-option>
          <ki-option label='深圳' value='4'></ki-option>
        </ki-option-group>
        <ki-option-group label='城市名'>
          <ki-option label='海南' value='5'></ki-option>
          <ki-option label='广州' value='6'></ki-option>
          <ki-option label='济南' value='7'></ki-option>
          <ki-option label='长沙' value='8'></ki-option>
        </ki-option-group>
      </ki-select>
    </Container>
    <Attributes :attributes='attributes' />
    <Attributes :attributes='events' title='Attributes Events' target='event' />
    <Attributes :attributes='optionAttributes' title='Option Attributes' />
    <Attributes :attributes='optionGroupAttributes' title='OptionGroup Attributes' />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { Select } from '@/components';
import Container from './component/container.vue';
import Attributes from './component/attributes.vue';

export default defineComponent({
  name: 'SelectExample',
  components: {
    KiSelect: Select,
    KiOption: Select.Option,
    KiOptionGroup: Select.OptionGroup,
    Container,
    Attributes,
  },
  setup() {
    const select = ref('');
    const select1 = ref('');
    const select2 = ref('');
    const select3 = ref([]);
    const select4 = ref([]);
    const attributes = [
      {
        attribute: 'v-model',
        description: 'select 绑定值，指定了 multiple 后必须为数组',
        type: 'string | number | array',
        option: '——',
        default: '——',
      },
      {
        attribute: 'width',
        description: '宽度',
        type: 'string',
        option: '——',
        default: '——',
      },
      {
        attribute: 'disabled',
        description: '是否禁用',
        type: 'boolean',
        option: 'true | false',
        default: 'false',
      },
      {
        attribute: 'clearable',
        description: '是否可清除',
        type: 'boolean',
        option: 'true | false',
        default: 'false',
      },
      {
        attribute: 'multiple',
        description: '是否多选',
        type: 'boolean',
        option: 'true | false',
        default: 'false',
      },
      {
        attribute: 'placeholder',
        description: '原生 placeholder',
        type: 'string',
        option: '——',
        default: '请选择',
      },
    ];
    const events = [
      {
        name: 'change',
        description: '绑定值变化时触发',
        type: '(value: string | number | (string | number)[]) => void',
      },
      {
        name: 'clear',
        description: '清除后触发',
        type: '() => void',
      },
    ];
    const optionAttributes = [
      {
        attribute: 'value',
        description: 'select 绑定值',
        type: 'string | number',
        option: '——',
        default: '——',
      },
      {
        attribute: 'label',
        description: '展示值',
        type: 'string | number',
        option: '——',
        default: '——',
      },
      {
        attribute: 'disabled',
        description: '是否禁用',
        type: 'boolean',
        option: 'true | false',
        default: 'false',
      },
    ];
    const optionGroupAttributes = [
      {
        attribute: 'label',
        description: '分组名称',
        type: 'string',
        option: '——',
        default: '——',
      },
    ];
    return {
      select,
      select1,
      select2,
      select3,
      select4,
      attributes,
      events,
      optionAttributes,
      optionGroupAttributes,
    };
  },
});
</script>

<style scoped>

</style>
