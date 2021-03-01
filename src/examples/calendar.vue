<template>
  <div>
    <Container
      title='基本使用'
    >
      <ki-calendar />
    </Container>
    <Container
      title='自定义内容'
    >
      <ki-calendar>
        <template #dateCell='{date}'>
          {{date.day}}
          <div v-if='[6, 12, 18, 22].includes(date.day)' class='prompt'>
            <div class='info'>
              提示信息
            </div>
          </div>
        </template>
      </ki-calendar>
    </Container>
    <Attributes :attributes='attributes' />
    <Attributes :attributes='events' target='event' title='Events' />
    <Attributes :attributes='slots' target='slot' title='Slots' />
    <Attributes :attributes='slotAttributes' target='slot' title='Date Attributes' />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { Calendar } from '@/components';
import { Container, Attributes } from './component';

export default defineComponent({
  name: 'CalendarExample',
  components: {
    Container,
    Attributes,
    KiCalendar: Calendar,
  },
  setup() {
    return {
      attributes: [
        {
          attribute: 'itemHeight',
          description: '日历格子高度',
          type: 'number',
          option: '——',
          default: '88',
        },
      ],
      events: [
        {
          name: 'on-click',
          description: '点击日历格子触发',
          type: '(date: Date) => void',
        },
      ],
      slots: [
        {
          name: 'dateCell',
          description: '日历格子的作用域插槽，通过 date 获取, date 内含属性见下方',
        },
        {
          name: 'header',
          description: '日历头部插槽',
        },
      ],
      slotAttributes: [
        {
          name: 'year',
          description: '年份',
        },
        {
          name: 'month',
          description: '月份',
        },
        {
          name: 'day',
          description: '日期',
        },
        {
          name: 'next',
          description: '是不是下个月',
        },
        {
          name: 'prev',
          description: '是不是上个月',
        },
        {
          name: 'current',
          description: '是不是当前月',
        },
      ],
    };
  },
});
</script>

<style scoped lang='less'>
  .prompt {
    margin-top: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--success-shallow-color);
    position: relative;

    .info {
      width: 80px;
      position: absolute;
      right: -80px;
      top: 10px;
      border: 1px solid var(--border-color);
      padding: 2px 5px;
      box-sizing: border-box;
      text-align: center;
      display: none;
    }

    &:hover .info {
      display: block;
    }
  }
</style>
