
var pangu = require('./lib/pangu');
var mdpangu = require('./lib/markdown.pangu');
var merge = require('merge');

var DEFAULT_OPTIONS = {
  file_type: 'text',
  trailling_whitespace: true,
  pangu_spacing: ' ',
};


module.exports = function(text, options) {
  options = merge(true, DEFAULT_OPTIONS, options);

  switch(options.file_type){
  case 'markdown':
    return mdpangu(text, options);
  //case 'text':
  default:
    return pangu(text, options);
  }
};

module.exports.lint = function(text, options) {
  options = merge(true, DEFAULT_OPTIONS, options);

  switch(options.file_type){
  case 'markdown':
    return mdpangu.lint(text, options);
  //case 'text':
  default:
    return pangu.lint(text, options);
  }
};
