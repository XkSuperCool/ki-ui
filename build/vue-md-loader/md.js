const MarkdownIt = require('markdown-it');
const highlight = require('highlight.js');

const md = new MarkdownIt({
  highlight: function(str, lang) {
    if (lang && highlight.getLanguage(lang)) {
      try {
        return highlight.highlight(lang, str).value;
      } catch {}
    }
    return '';
  }
}).use(require('markdown-it-container'), 'demo', {
  validate: function (params) {
    return params.trim().match(/^demo\s*(.*)$/);
  },
  render: function(tokens, idx) {
    const info = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
    // description 是在 :::demo 后面的文字描述
    const description = info && info.length > 1 ? info[1] : '';
    // 第一行代码增加开始标签
    if (tokens[idx].nesting === 1) {
      // content 就是 md 文件中书写的代码块
      const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
      // 1. 将表述文件通过 render 方法渲染
      // 2. 代码块使用特殊的注释(<!--demo: | -demo-->)包裹起来, 后面会循环利用这个注释来找到所有的代码块进行处理
      // 3. demo-block 中会包含如下代码：1. description、2. content（最后转为子组件）、3. 示例代码，
      //    也就是说 .md 文件中 ::: demo (content) :::, content 会被放入到 demo-block 标签中。
      return `
      <demo-block>
        ${description ? `<template v-slot:description><div>${md.render(description)}</div></template>` : ''}
        <!--demo: ${content}:-demo-->
      `;
    }
    // 最后闭合标签
    return '</demo-block>';
  },
});

module.exports = md;