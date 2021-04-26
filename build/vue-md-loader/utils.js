const { compile } = require('@vue/compiler-dom');
const { compileTemplate } = require('@vue/compiler-sfc/dist/compiler-sfc.cjs');

function stripTemplate(content) {
  content = content.trim();
  if (!content) {
    return content;
  }
  // 找到 </template> 开始的下标
  const templateEndIndex = content.indexOf('</template>')
  // 获取 template 标签中的内容，10 就是 <template> 的长度
  const html = content.slice(10,templateEndIndex)
  return html;
}

function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

function stripStyle(content) {
  const result = content.match(/(<style [\s\S]*>[\s\S]*<\/style>)/);
  return result && result[1] ? result[1].trim() : '';
}

function genInlineComponentText(template, script) {
  const options = {
    source: `<div>${template}</div>`,
    filename: 'inline-component',
    compiler: { compile },
  };
  // 编译 html
  const compiled = compileTemplate(options);
  /**
   * componentContent 生成的格式如下：
   * import { openBlock as _openBlock, createBlock as _createBlock } from "vue"
   *
   * export function render(_ctx, _cache) {
   *     return (_openBlock(), _createBlock("div", null, "efineComponent } from 'vue'"))
   *  }
   */
  let componentContent = `${compiled.code}`;
  const index = componentContent.indexOf('vue');
  // 去掉 import {} from 'vue'； 这段代码
  componentContent = componentContent.slice(index + 4);
  // 去除 export，现在只有剩下一个函数了 function render() {}
  componentContent = componentContent.replace(/export/, '');
  // 处理 script
  script = script.trim();
  if (script) {
    // 将 script 代码中的 export default 替换为一个常量
    script = script.replace(/export\s+default/, 'const componentExport =');
  } else {
    // 如果没有 script 代码，则默认为一个空对象
    script = 'const componentExport = {}';
  }

  return `(function() {
    ${componentContent}
    ${script}
    return {
      render,
      ...componentExport,
    };
  })()`;
}

module.exports = {
  stripTemplate,
  stripScript,
  stripStyle,
  genInlineComponentText,
};
