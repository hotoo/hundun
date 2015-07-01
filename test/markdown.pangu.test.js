
var should = require('should');
var pangu = require('../');

describe('pangu.fixup(text, {file_type: markdown})', function () {

  var testcases_fixup = [
    // list
    ['* english', '* english\n'],
    ['- english.', '* english.\n'],
    // format
    ['**中文en**', '**中文 en**\n'],
    ['_中文._', '_中文。_\n'],
    // header
    ['# test\n\n[中文](link.html)', '# test\n\n[中文](link.html)\n'],
    ['> 中文\n> 2中', '> 中文\n> 2 中\n'],
    // link
    ['[中文english中文english中文.](link.html#hash索引)', '[中文 english 中文 english 中文。](link.html#hash索引)\n'],
    ['加强前**加强strong弱化前_弱化em弱化_弱化后**加强后', '加强前**加强 strong 弱化前_弱化 em 弱化_弱化后**加强后\n'],
    ['加强前 **加强strong弱化前 _弱化em弱化_ 弱化后** 加强后', '加强前 **加强 strong 弱化前 _弱化 em 弱化_ 弱化后** 加强后\n'],
  ];

  testcases_fixup.forEach(function(testcase) {
    it('fixup("' + testcase[0] + '", {file_type: markdown})', function () {
      pangu(testcase[0], {file_type: 'markdown'}).should.be.eql(testcase[1]);
    });
  });

});
