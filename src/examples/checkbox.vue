<template>
  <div>
    <ki-check-box label='选择' v-model='checked' indeterminate></ki-check-box>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { CheckBox } from '@/components';

export default defineComponent({
  name: 'CheckboxExample',
  components: {
    KiCheckBox: CheckBox,
  },
  setup() {
    const checked = ref(false);
    return {
      checked,
    };
  },
});
</script>

<style scoped>

</style>
