
var mdast = require('mdast')
var pangu = require('./pangu');

function walk(ast_node, handler) {
  handler(ast_node);

  if (ast_node.children && ast_node.children.length) {
    ast_node.children.forEach(function(node) {
      walk(node, handler);
    });
  }

  return ast_node;
}

module.exports = function(markdown, options) {
  var ast = mdast.parse(markdown);
  walk(ast, function(node) {
    if (node.type === 'text') {
      node.value = pangu(node.value, options);
    }
  });
  //return ast;
  return mdast.stringify(ast, {
    bullet: '*',
    listItemIndent: '1',
  });
};

module.exports.lint = function(markdown, options) {
  var ast = mdast.parse(markdown);
  var output = [];

  walk(ast, function(node) {
    if (node.type === 'text') {
      var out = pangu.lint(node.value, options);
      out.forEach(function(error) {
        // FIXME: 更正确的行列信息。
        error.lineno = node.position.start.line;
        error.colno = node.position.start.column;
      });
      output.concat(out);
    }
  });
  return output;
};
