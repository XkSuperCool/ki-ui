## Pagination 分页
当数据量过多时，使用分页分解数据。

### 基础用法
::: demo
```html
  <template>
    <div>
      <p class='tip'>数量多时：</p>
      <ki-pagination :current-page='1' :page-size='10' :total='100' />
      <p class='tip'>数量少时：</p>
      <ki-pagination :current-page='1' :page-size='10' :total='40' />
    </div>
  </template>

  <script>
    export default {
      setup() {
        return {};
      },
    }
  </script>
```
:::

### 带有背景色

::: demo
```html
  <template>
    <div>
      <ki-pagination :current-page='1' :page-size='10' :total='100' background />
    </div>
  </template>

  <script>
    export default {
      setup() {
        return {};
      },
    }
  </script>
```
:::

### 小型分页
在空间有限的情况下，可以使用简单的小型分页。

::: demo
```html
  <template>
    <div>
      <ki-pagination :current-page='1' :page-size='10' :total='100' background mini />
      <ki-pagination :current-page='1' :page-size='10' :total='100' mini style='margin-top: 20px;'/>
    </div>
  </template>

  <script>
    export default {
      setup() {
        return {};
      },
    }
  </script>
```
:::

### 附加功能
根据场景需要，可以添加其他功能模块。

::: demo
```html
  <template>
    <div>
      <p class='tip'>显示总数：</p>
      <ki-pagination :current-page='1' :page-size='10' :total='100' background is-total />
      <p class='tip'>调整每页条数：</p>
      <ki-pagination :current-page='1' :page-size='10' :total='100' background :pageSizes='[10, 20, 30, 40]' />
      <p class='tip'>电梯：</p>
      <ki-pagination :current-page='1' :page-size='10' :total='100' background elevator />
      <p class='tip'>完整功能：</p>
      <ki-pagination :current-page='1' :page-size='10' :total='100' background :pageSizes='[10, 20, 30, 40]' is-total elevator />
    </div>
  </template>

  <script>
    export default {
      setup() {
        return {};
      },
    }
  </script>
```
:::

### 只有一页时隐藏
当只有一页时，通过设置 `hide-on-single-page` 属性来隐藏分页。

::: demo
```html
  <template>
    <div>
      <ki-button @click='hide = !hide' style='margin-bottom: 20px;' size='small'>显示/隐藏</ki-button>
      <ki-pagination :current-page='1' :page-size='10' :total='10' background :hide-on-single-page='hide' />
    </div>
  </template>

  <script>
    export default {
      data() {
        return {
          hide: false,
        };
      },
    }
  </script>
```
:::


### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| currentPage | 当前页 | number | — | 1 |
| pageSize | 每页条数 | number | — | 10 |
| total | 总条数 | number | — | — |
| pageSizes | 调整分页总数，格式如：[10, 20, 30] | number[] | — | — |
| background | 是否显示背景颜色 | boolean | true / false | false |
| elevator | 电梯 | boolean | true / false | false |
| isTotal | 是否展示出总条数 | boolean | true / false | false |
| mini | 电梯 | 迷你模式 | true / false | false |
| hideOnSinglePage | 只有一页时隐藏分页 | boolean | true / false | false |

### Events
| 事件名称 | 说明 | 回调函数 |
| --- | ---  | --- |
| currentChange | 当前页发生变化时触发 | (current: number) => void |
| pageSizeChange | 每页条数发生变化时触发 | (pageSize: number) => void | 
