## Tree 树形控件
用清晰的层级结构展示信息，可展开或折叠。

### 基础用法
基础的树形结构展示。

:::demo
```html
  <template>
    <ki-tree
      :data='treeData'
    />
  </template>

  <script>
    export default {
      data() {
        return {
          treeData: [
            {
              checked: true,
              label: '一级 1',
              key: '1',
              children: [{
                label: '二级 1-1',
                key: '1-1',
                children: [
                  {
                    label: '三级 1-1-1',
                    key: '1-1-1',
                    children: [
                      {
                        label: '四级 1-1-1-1',
                        key: '1-1-1-1',
                      },
                    ],
                  },
                  {
                    label: '三级 1-1-2',
                    key: '1-1-2',
                  },
                ],
              }],
            },
            {
              label: '一级 2',
              key: '2',
              children: [
                {
                  label: '二级 2-1',
                  key: '2-1',
                  children: [{
                    label: '三级 2-1-1',
                    key: '2-1-1',
                  }],
                },
                {
                  label: '二级 2-2',
                  key: '2-2',
                },
              ],
            },
          ]
        };
      },
    }
  </script>
```
:::

### 可选择
适用于需要选择层级时使用。

:::demo
```html
  <template>
    <ki-tree
      :data='treeData'
      show-checkbox
    />
  </template>

  <script>
    export default {
      data() {
        return {
          treeData: [
            {
              checked: true,
              label: '一级 1',
              key: '1',
              children: [{
                label: '二级 1-1',
                key: '1-1',
                children: [
                  {
                    label: '三级 1-1-1',
                    key: '1-1-1',
                    children: [
                      {
                        label: '四级 1-1-1-1',
                        key: '1-1-1-1',
                      },
                    ],
                  },
                  {
                    label: '三级 1-1-2',
                    key: '1-1-2',
                  },
                ],
              }],
            },
            {
              label: '一级 2',
              key: '2',
              children: [
                {
                  label: '二级 2-1',
                  key: '2-1',
                  children: [{
                    label: '三级 2-1-1',
                    key: '2-1-1',
                  }],
                },
                {
                  label: '二级 2-2',
                  key: '2-2',
                },
              ],
            },
          ]
        };
      },
    }
  </script>
```
:::

### 默认选中和默认展开
可将 Tree 的某些节点设置为默认展开或默认选中。

:::demo
```html
  <template>
    <ki-tree
      :data='treeData'
      show-checkbox
      :default-expanded-keys='["1", "1-2", "1-1", "2"]'
      :default-checked-keys='["1-1-1", "2-1"]'
    />
  </template>

  <script>
    export default {
      data() {
        return {
          treeData: [
            {
              checked: true,
              label: '一级 1',
              key: '1',
              children: [{
                label: '二级 1-1',
                key: '1-1',
                children: [
                  {
                    label: '三级 1-1-1',
                    key: '1-1-1',
                    children: [
                      {
                        label: '四级 1-1-1-1',
                        key: '1-1-1-1',
                      },
                    ],
                  },
                  {
                    label: '三级 1-1-2',
                    key: '1-1-2',
                  },
                ],
              }],
            },
            {
              label: '一级 2',
              key: '2',
              children: [
                {
                  label: '二级 2-1',
                  key: '2-1',
                  children: [{
                    label: '三级 2-1-1',
                    key: '2-1-1',
                  }],
                },
                {
                  label: '二级 2-2',
                  key: '2-2',
                },
              ],
            },
          ]
        };
      },
    }
  </script>
```
:::

### 禁用状态
可将 Tree 的某些节点设置为禁用状态。

:::demo
```html
  <template>
    <ki-tree
      :data='treeData'
      show-checkbox
      :default-expanded-keys='["1", "1-2", "1-1", "2"]'
      :default-checked-keys='["1-1-1", "2-1"]'
    />
  </template>

  <script>
    export default {
      data() {
        return {
          treeData: [
            {
              checked: true,
              label: '一级 1',
              key: '1',
              children: [{
                label: '二级 1-1',
                key: '1-1',
                disabled: true,
                children: [
                  {
                    label: '三级 1-1-1',
                    key: '1-1-1',
                    children: [
                      {
                        label: '四级 1-1-1-1',
                        key: '1-1-1-1',
                      },
                    ],
                  },
                  {
                    label: '三级 1-1-2',
                    key: '1-1-2',
                    disabled: true,
                  },
                ],
              }],
            },
            {
              label: '一级 2',
              key: '2',
              children: [
                {
                  label: '二级 2-1',
                  key: '2-1',
                  disabled: true,
                  children: [{
                    label: '三级 2-1-1',
                    key: '2-1-1',
                  }],
                },
                {
                  label: '二级 2-2',
                  key: '2-2',
                },
              ],
            },
          ],
        };
      },
    }
  </script>
```
:::

### 自定义节点内容
节点的内容支持自定义，可以在节点区添加按钮或图标等内容。

:::demo
```html
  <template>
    <ki-tree
      :data='treeData'
      show-checkbox
      :default-expanded-keys='["1", "1-2", "1-1", "2"]'
      :default-checked-keys='["1-1-1", "2-1"]'
    >
      <template #default='scoped'>
        <a class='btn'>Button</a>
      </template>
    </ki-tree>
  </template>

  <script>
    export default {
      data() {
        return {
          treeData: [
            {
              checked: true,
              label: '一级 1',
              key: '1',
              children: [{
                label: '二级 1-1',
                key: '1-1',
                children: [
                  {
                    label: '三级 1-1-1',
                    key: '1-1-1',
                    children: [
                      {
                        label: '四级 1-1-1-1',
                        key: '1-1-1-1',
                      },
                    ],
                  },
                  {
                    label: '三级 1-1-2',
                    key: '1-1-2',
                  },
                ],
              }],
            },
            {
              label: '一级 2',
              key: '2',
              children: [
                {
                  label: '二级 2-1',
                  key: '2-1',
                  children: [{
                    label: '三级 2-1-1',
                    key: '2-1-1',
                  }],
                },
                {
                  label: '二级 2-2',
                  key: '2-2',
                },
              ],
            },
          ]
        };
      },
    }
  </script>
```
:::

### Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | ---  | --- | ---   | ---   |
| data | 树形结构所需的数据 | TreeData[] | — | — |
| showCheckbox | 是否显示 checkbox 框 | boolean | true / false | false |
| defaultExpandedKeys | 默认展开项 | string[] / number[] | — | — |
| defaultCheckedKeys | 默认选中项 | string[] / number[] | — | — |


### TreeData 类型
  * `label`: 展示的名称，`string`
  * `key`  : 每个节点的唯一标示，`string / number`
  * `disabled`: 是否禁用
  * `children`: 子级，`TreeData[]`