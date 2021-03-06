<template>
  <div class='ki-pagination' :class='{mini: mini}' v-if='!(hideOnSinglePage && paginationCount === 1)'>
    <div class='total' v-if='isTotal'>共 {{total}} 条</div>
    <ki-select v-if='pageSizes.length && !mini' v-model='privatePageSize' height='100%'>
      <ki-option
        v-for='(size, index) in pageSizes'
        :key='size + index'
        :value='size'
        :label='size + "条/页"'
      />
    </ki-select>
    <ul class='ki-pagination-container' :class='{background: background}'>
      <li class='ki-pagination-item prev' @click='handlePrevPage'>
        <icon type='angle-left'/>
      </li>
        <!-- 页数量少 -->
        <template v-if='paginationCount < 10'>
          <li
            class='ki-pagination-item'
            :class='{active: privateCurrentPage === item}'
            v-for='item in paginationCount'
            :key='item'
            @click='handleClickPaginationItem(item)'
          >
            {{item}}
          </li>
        </template>
        <!-- 页数量多 -->
        <template v-else>
          <li
            class='ki-pagination-item'
            :class='{active: privateCurrentPage === item}'
            v-for='item in leftPaginationArr'
            :key='item + "left"'
            @click='handleClickPaginationItem(item)'
          >
            {{item}}
          </li>
          <li class='ki-pagination-item' >...</li>
          <template v-if='isShowCenterArr'>
            <li
              class='ki-pagination-item'
              :class='{active: privateCurrentPage === item}'
              v-for='item in centerPaginationArr'
              :key='item + "center"'
              @click='handleClickPaginationItem(item)'
            >
              {{item}}
            </li>
          </template>
          <li class='ki-pagination-item' v-if='isShowCenterArr'>...</li>
          <li
            class='ki-pagination-item'
            :class='{active: privateCurrentPage === item}'
            v-for='item in rightPaginationArr'
            :key='item + "right"'
            @click='handleClickPaginationItem(item)'
          >
            {{item}}
          </li>
        </template>
      <li class='ki-pagination-item next' @click='handleNextPage'>
        <icon type='angle-right'/>
      </li>
    </ul>
    <div class='elevator' v-if='elevator'>
      前往 <input type='number' :value='1' @blur='handleElevatorBlur' /> 页
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  computed,
  ref,
  reactive,
  watch,
  PropType,
  toRef,
} from 'vue';
import Icon from 'packages/icon';
import { Select } from 'packages/select';

export default defineComponent({
  name: 'ki-pagination',
  components: {
    Icon,
    KiSelect: Select,
    KiOption: Select.Option,
  },
  props: {
    background: Boolean,
    total: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    elevator: {
      type: Boolean,
    },
    currentPage: {
      type: Number,
      default: 1,
      validator: (val: number) => val >= 1,
    },
    isTotal: Boolean,
    mini: Boolean,
    hideOnSinglePage: Boolean, // 只有一页时隐藏分页
  },
  emits: ['currentChange', 'pageSizeChange', 'update:currentPage'],
  setup(props, { emit }) {
    const count = 5;
    const diff = (count - 1) / 2;
    const privateCurrentPage = ref<number>(props.currentPage);
    const privatePageSize = ref<number>(0);
    const pageRef = toRef(props, 'pageSize');
    if (props.pageSizes.length) {
      let pages = -1;
      if (props.pageSize) {
        const index = props.pageSizes.findIndex((item) => item === props.pageSize);
        if (index !== -1) {
          const pageSizesRef = toRef(props, 'pageSizes');
          pages = pageSizesRef.value[index];
        }
      }
      privatePageSize.value = pages === -1 ? props.pageSizes[0] : pages;
    } else {
      privatePageSize.value = pageRef.value;
    }
    const paginationCount = computed<number>(() => Math.ceil(props.total / privatePageSize.value));

    // 分页数组
    function generatePaginationArr() {
      const before = Array(diff).fill(1).map((_, index) => privateCurrentPage.value - diff + index);
      const after = Array(diff).fill(1).map((_, index) => privateCurrentPage.value + (index + 1));
      return [...before, privateCurrentPage.value, ...after];
    }
    const leftPaginationArr = reactive(Array(count).fill(1).map((_, index) => index + 1));
    const centerPaginationArr = computed(() => generatePaginationArr());
    const rightPaginationArr = reactive<number[]>([paginationCount.value]);

    // 是否显示 centerArr
    const isShowCenterArr = computed(() => leftPaginationArr.length === 1 && rightPaginationArr.length === 1);

    // 下一页
    const handleNextPage = (page: number | MouseEvent) => {
      if (privateCurrentPage.value >= paginationCount.value) {
        return;
      }

      privateCurrentPage.value += 1;
      if (typeof page === 'number') {
        privateCurrentPage.value = page;
      }

      // 当前页超出 count 时，将 leftArr 置为 1，显示 centerArr
      if (privateCurrentPage.value >= count) {
        leftPaginationArr.splice(0, leftPaginationArr.length, 1);
      }
      if (privateCurrentPage.value - diff + count >= paginationCount.value && rightPaginationArr.length === 1) {
        // 通过总页数 - 当前页，计算出 rightArr 应该在当前页面的基础上补充多少页码（+1 是为了算上当前页码）
        const excess = (paginationCount.value - privateCurrentPage.value) + 1;
        const arr: number[] = []; // 页码数组
        /**
         * 循环添加页码，生成数组如：[当前页，excess -（0+1), excess -（1+1)],
         * 假如总页数为 10，当前页为 7，那么就是
         *  excess = 10 - 7 = 3
         *  [7 - ( 3 - (0+1)), 7- (3-(1+1)), ...] -> [5, 6, 7]
         */
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < excess; i++) {
          arr.push(paginationCount.value - (excess - (i + 1)));
        }
        /**
         * 根据 arr.length 和 count 来判断应该在 arr 前面补充几个页码
         */
        arr.unshift(...Array(count - arr.length).fill(1).map((_, index) => arr[0] - (count - arr.length - index)));
        // 生成 rightArr
        rightPaginationArr.splice(0, rightPaginationArr.length, ...arr);
      }
    };

    // 上一页
    const handlePrevPage = (page: number | MouseEvent) => {
      if (privateCurrentPage.value <= 1) {
        return;
      }

      privateCurrentPage.value -= 1;
      if (typeof page === 'number') {
        privateCurrentPage.value = page;
      }
      if (privateCurrentPage.value - count <= 0) {
        leftPaginationArr.splice(0, leftPaginationArr.length, ...Array(count).fill(1).map((_, index) => index + 1));
      }
      if (privateCurrentPage.value - diff + count < paginationCount.value && rightPaginationArr.length > 1) {
        rightPaginationArr.splice(0, rightPaginationArr.length, paginationCount.value);
      }
    };

    // 点击分页
    const handleClickPaginationItem = (page: number) => {
      switch (true) {
        case page === paginationCount.value:
          if (rightPaginationArr.length === 1) {
            rightPaginationArr.unshift(...Array(count - 1).fill(1).map((_, index) => paginationCount.value - (count - 1) + index));
            leftPaginationArr.splice(0, leftPaginationArr.length, 1);
          }
          privateCurrentPage.value = page;
          break;
        case page > privateCurrentPage.value:
          handleNextPage(page);
          break;
        case page < privateCurrentPage.value:
          handlePrevPage(page);
          break;
        default: break;
      }
    };

    // 电梯
    const handleElevatorBlur = (event: FocusEvent) => {
      const value = parseInt((event.target as HTMLInputElement)?.value, 10);
      if (!(value > paginationCount.value || value < 1)) {
        handleClickPaginationItem(value);
      }
    };

    watch(privateCurrentPage, (value) => {
      emit('currentChange', value);
      emit('update:currentPage', value);
    });

    watch(privatePageSize, (val) => {
      rightPaginationArr.splice(rightPaginationArr.length - 1, 1, paginationCount.value);
      handlePrevPage(1);
      emit('pageSizeChange', val);
    });

    watch(props, (val) => {
      if (val.currentPage !== privateCurrentPage.value) {
        handleClickPaginationItem(val.currentPage);
      }
    });

    return {
      paginationCount,
      privateCurrentPage,
      privatePageSize,
      leftPaginationArr,
      centerPaginationArr,
      rightPaginationArr,
      handleClickPaginationItem,
      handleNextPage,
      handlePrevPage,
      isShowCenterArr,
      handleElevatorBlur,
    };
  },
});
</script>

<style scoped lang='less'>
  @import './style.less';
</style>
