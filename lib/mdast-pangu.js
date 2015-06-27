
var pangu = require('./pangu');

function renderRaw(type, value) {
  return {
    'type': type,
    'value': (value),
  };
}

function inlineText(eat, $0) {
  return eat($0)(renderRaw('text', $0));
}

function attacher(mdast) {
  var proto = mdast.Parser.prototype;
  var scope = proto.inlineTokenizers;
  scope.inlineText = inlineText;
}

module.exports = attacher;
