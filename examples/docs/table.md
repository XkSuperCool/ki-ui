## Table 表格
用于展示多条结构类似的数据，可对数据进行排序、筛选、对比或其他自定义操作。

### 基础用法
基础的表格展示用法。

:::demo
```html
  <template>
    <ki-table :columns='columns' :data='data' />
  </template>

  <script>
    export default {
      data() {
        return {
          data: [
            {
              id: 1,
              name: 'XiaoMing',
              age: 18,
              address: 'Jinan',
            },
            {
              id: 2,
              name: 'XiaoZhang',
              age: 20,
              address: 'Jinan',
            },
          ],
          columns: [
            {
              key: 'name',
              title: '名称',
              width: 200,
            },
            {
              key: 'age',
              title: '年龄',
              width: 150,
            },
            {
              key: 'address',
              title: '地址',
            },
            {
              title: '操作',
              width: 200,
              align: 'center',
              render(h) {
                return [
                  h('a', '查看'),
                  h('a', { style: { marginLeft: '10px', color: 'red' } }, '删除')
                ];
              },
            },
          ],
        };
      },
    };
  </script>
```
:::

### 带斑马纹表格
使用带斑马纹的表格，可以更容易区分出不同行的数据。

:::demo `stripe` 展示一个带有斑马纹的表格，他是一个 `Boolean` 值。
```html
  <template>
    <ki-table :columns='columns' :data='data' stripe />
  </template>

  <script>
    export default {
      data() {
        return {
          data: [
            {
              id: 1,
              name: 'XiaoMing',
              age: 18,
              address: 'Jinan',
            },
            {
              id: 2,
              name: 'XiaoZhang',
              age: 20,
              address: 'Jinan',
            },
            {
              id: 3,
              name: 'XiaoLi',
              age: 21,
              address: 'Jinan',
            },
            {
              id: 4,
              name: 'XiaoLiu',
              age: 22,
              address: 'Jinan',
            },
          ],
          columns: [
            {
              key: 'name',
              title: '名称',
              width: 200,
            },
            {
              key: 'age',
              title: '年龄',
              width: 150,
            },
            {
              key: 'address',
              title: '地址',
            },
            {
              title: '操作',
              width: 200,
              align: 'center',
              render(h) {
                return [
                  h('a', '查看'),
                  h('a', { style: { color: '#ff0f0f', marginLeft: '10px' }, }, '删除'),
                ];
              },
            },
          ],
        };
      },
    };
  </script>
```
:::

### 带表框的表格
基础的表格展示用法。

:::demo
```html
  <template>
    <ki-table :columns='columns' :data='data' border />
  </template>

  <script>
    export default {
      data() {
        return {
          data: [
            {
              id: 1,
              name: 'XiaoMing',
              age: 18,
              address: 'Jinan',
            },
            {
              id: 2,
              name: 'XiaoZhang',
              age: 20,
              address: 'Jinan',
            },
              {
                id: 3,
                name: 'XiaoLi',
                age: 21,
                address: 'Jinan',
              },
              {
                id: 4,
                name: 'XiaoLiu',
                age: 22,
                address: 'Jinan',
              },
          ],
          columns: [
            {
              key: 'name',
              title: '名称',
              width: 200,
            },
            {
              key: 'age',
              title: '年龄',
              width: 200,
            },
            {
              key: 'address',
              title: '地址',
            },
          ],
        };
      },
    };
  </script>
```
:::

### 带状态表格
可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。

:::demo `rowClassName` 属性是一个函数，它接收两个参数 `row`、`index`, 你可以根据需求返回一个 `css class`。
```html
  <template>
    <ki-table :columns='columns' :data='data' border :rowClassName='rowClassName' />
  </template>

  <script>
    export default {
      data() {
        return {
          data: [
            {
              id: 1,
              name: 'XiaoMing',
              age: 18,
              address: 'Jinan',
            },
            {
              id: 2,
              name: 'XiaoZhang',
              age: 20,
              address: 'Jinan',
            },
            {
              id: 3,
              name: 'XiaoLi',
              age: 21,
              address: 'Jinan',
            },
            {
              id: 4,
              name: 'XiaoLiu',
              age: 22,
              address: 'Jinan',
            },
          ],
          columns: [
            {
              key: 'name',
              title: '名称',
              width: 200,
            },
            {
              key: 'age',
              title: '年龄',
              width: 200,
            },
            {
              key: 'address',
              title: '地址',
            },
          ],
        };
      },
      methods: {
        rowClassName(row, index) {
          if (index === 1) {
            return 'warning-row';
          }
          if (index === 3) {
            return 'success-row';
          }
        },
      },
    };
  </script>
```
:::

### 固定表头
纵向内容过多时，可选择固定表头。

:::demo 指定 `height` 属性后即可实现固定表头，无需额外代码。
```html
  <template>
    <ki-table :columns='columns' :data='data' border :height='300' />
  </template>

  <script>
    export default {
      data() {
        return {
          data: Array(10).fill(0).map((_, index) => ({
            id: index,
            name: 'XiaoMing',
            age: 18,
            address: 'Jinan',
          })),
          columns: [
            {
              key: 'name',
              title: '名称',
              width: 200,
            },
            {
              key: 'age',
              title: '年龄',
              width: 200,
            },
            {
              key: 'address',
              title: '地址',
            },
          ],
        };
      },
    };
  </script>
```
:::
