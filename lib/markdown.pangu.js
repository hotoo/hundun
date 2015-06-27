
var mdast = require('mdast')
//var pangu = require('./mdast-pangu');

//var processor = mdast().use(pangu);

//module.exports = function(markdown) {
  //return processor.process(markdown);
//}



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
  });
};
