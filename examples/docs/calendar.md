## Calendar 日历
显示日期

### 基本使用

:::demo
```html
  <template>
    <ki-calendar />
  </template>

  <script></script>
```
:::

### 自定义内容
使用插槽自定义显示内容

:::demo
```html
  <template>
    <ki-calendar>
      <template
        v-slot:dateCell='scoped'
      >
        {{scoped ? `${scoped.date.month}-${scoped.date.day}` : ''}}
      </template>
    </ki-calendar>
  </template>

  <script>
    
  </script>
```
:::

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| itemHeight | 日历格子高度 | number | — | 88 |

### Events
| 事件名称 | 说明 | 回调函数 |
| --- | ---  | --- |
| on-click | 点击日历格子触发 | (date: Date) => void | 

### Slots
| name | 说明 |
| --- | ---  |
| dateCell | 日历格子的作用域插槽，通过 date 获取, date 内含属性见下方 |
| header | 日历头部插槽 |

### Date Attributes
| 参数 | 说明 |
| --- | ---  |
| year | 年份 |
| month | 月份 |
| day | 日期 |
| next | 是不是下个月 |
| prev | 是不是上个月 |
| current | 是不是当前月 |
