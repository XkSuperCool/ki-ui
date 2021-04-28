const md = require('./md');
const { stripTemplate, stripScript, genInlineComponentText } = require('./utils');

module.exports = function(source) {
  // 渲染
  const content = md.render(source);
  // 定义注释标示
  const startTag = '<!--demo:';
  const startTagLength = startTag.length;
  const endTag = ':-demo-->';
  const endTagLength = endTag.length;

  let start = 0; // 记录开始匹配的位置
  let output = []; // 储存最终输出的内容
  // 每一个代码块的唯一 id，md 文件中每一个代码块都会生成一个 vue 组件，这个 id 就是组件 tag 中的一部分
  let id = 0;
  // 每一个代码块都会生成一个 key: value 值，通过 componentsStr 将所有代码块连接起来，最后放在 components
  let componentsStr = '';

  // 获取书写的代码在 content 中开始的下标
  let codeStartIndex = content.indexOf(startTag);
  // 获取书写的代码在 content 中结束的下标
  let codeEndIndex = content.indexOf(endTag, codeStartIndex + startTagLength);
  // 循环，找到处理所有代码块
  while (codeStartIndex !== -1 && codeEndIndex !== -1) {
    // 获取代码块之前的 html 标签代码，将其推到 output 中
    output.push(content.slice(start, codeStartIndex));
    // 获取 md 中书写的 vue 代码
    const codeContent = content.slice(codeStartIndex + startTagLength, codeEndIndex);
    // 获取 vue 代码中的 template 代码
    const html = stripTemplate(codeContent);
    // 获取 vue 代码中的 script 代码
    const script = stripScript(codeContent);
    // 生成 vue 组件代码，将 md 文件中的代码块设置为一个 vue 子组件
    const componentCode = genInlineComponentText(html, script);
    // 生成一个组件名称
    const componentName = `ki-demo${id++}`;
    // output 中推入这个组件, 同时插入到 demo-block, source 插槽中，source 插槽中的内容是显示的
    // 示例代码则默认插入了 default 插槽，default 插槽默认是隐藏的，需要通过点击按钮来切换显隐。
    output.push(`
      <template v-slot:source>
        <${componentName} />
      </template>
    `);
    
    // 生成挂载到 components 中的 key（组件名）: value (组件代码)
    componentsStr += `${JSON.stringify(componentName)}: ${componentCode},`;

    // 下标修改，处理下一个代码块
    start = codeEndIndex + endTagLength;
    codeStartIndex = content.indexOf(startTag, start);
    codeEndIndex = content.indexOf(endTag, codeStartIndex + startTagLength);
  };

  let vueScript = '';
  // 生成 vue 单文件组件的 script
  if (componentsStr) {
    vueScript = `
      <script>
        import { createTextVNode as _createTextVNode, resolveComponent as _resolveComponent, withCtx as _withCtx, createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock, toDisplayString as _toDisplayString, createSlots as _createSlots } from "vue"
        export default {
          name: 'component-doc',
          components: {
            ${componentsStr}
          },
        };
      </script>
    `;
  }

  // while 循环匹配完后，content 后面还存在其他代码（比如说：代码块后面还有 html 标签、markdown-it-container render 返回的闭合标签等）
  // ，将 循环匹配完后，content 剩余的代码也推入到 output
  output.push(content.slice(start));

  // 最后生成一个 vue 组件代码，（一整个 md 文件就是一个 vue 组件，md 文件中的代码块为这个组件的子组件）
  return `
    <template>
      <section>
        ${output.join('')}
      </section>
    </template>
    ${vueScript}
  `;
}