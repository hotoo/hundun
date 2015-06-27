
var pangu = require('./pangu');

function repeat(text, times) {
  return new Array(times + 1).join(text);
}

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang) {
  return '```' + lang + '\n' + code + '\n```\n\n'
};

Renderer.prototype.blockquote = function(quote) {
  return '> ' + pangu.convert(quote).split(/\r\n|\r|\n/).join('\n> ') + '\n\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return repeat('#', level) + ' ' + pangu.convert(text) + '\n\n';
};

Renderer.prototype.hr = function() {
  return '----';
};

Renderer.prototype.list = function(body, ordered) {
  this._list_ordered = ordered;
  return body + '\n';
};

Renderer.prototype.listitem = function(text) {
  return (this._list_ordered ? '1. ' : '* ') + pangu.convert(text) + '\n';
};

Renderer.prototype.paragraph = function(text) {
  console.log("P", text)
  return pangu.convert(text) + '\n\n';
};

Renderer.prototype.table = function(header, body) {
  return header + '\n|----|----|\n' + body;
};

Renderer.prototype.tablerow = function(content) {
  return content + '\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  return '|' + pangu.convert(content) + '|';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '**' + pangu.convert(text) + '**';
};

Renderer.prototype.em = function(text) {
  return '_' + pangu.convert(text) + '_';
};

Renderer.prototype.codespan = function(text) {
  return '`' + pangu.convert(text) + '`';
};

Renderer.prototype.br = function() {
  return '\n';
};

Renderer.prototype.del = function(text) {
  return '~~' + pangu.convert(text) + '~~';
};

Renderer.prototype.link = function(href, title, text) {
  // TODO: link title.
  return '[' + pangu.convert(text) + '](' + href + ')';
};

Renderer.prototype.image = function(href, title, text) {
  // TODO: image title.
  return '![' + pangu.convert(text) + '](' + href + ')';
};

module.exports = Renderer;
