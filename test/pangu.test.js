
var should = require('should');
var pangu = require('../');

describe('pangu.fixup()', function () {

  // 默认选项，中英文之间使用盘古之白，标点符号等自动处理。
  var testcases_fixup = [
    ['english', 'english'],
    ['english.', 'english.'],
    ['中文', '中文'],
    ['中文.', '中文。'],
    ['fixup("中文english中文english中文.")', 'fixup("中文 english 中文 english 中文。")'],
  ];

  testcases_fixup.forEach(function(testcase) {
    it('fixup("' + testcase[0] + '") = ' + testcase[1], function () {
      pangu(testcase[0]).should.be.eql(testcase[1]);
    });
  });

  // 浑沌世界，中英文之间不使用空白。
  var testcases_fixup_2 = [
    ['fixup(" 中文 english 中文 english 中文.")', 'fixup(" 中文english中文english中文。")'],
  ];

  testcases_fixup_2.forEach(function(testcase) {
    it('fixup("' + testcase[0] + '", {pangu_spacing:""}) = ' + testcase[1], function () {
      pangu(testcase[0], {pangu_spacing: ''}).should.be.eql(testcase[1]);
    });
  });

  // 剔除行尾空白。
  var testcases_fixup_trailling_whitespace = [
    ['english ', 'english'],
    ['english 2   ', 'english 2'],
    ['中文 ', '中文'],
    ['中文 2    ', '中文 2'],
    ['中文2    ', '中文 2'],
  ];

  testcases_fixup_trailling_whitespace.forEach(function(testcase) {
    it('fixup("' + testcase[0] + '", {trailling_whitespace:false}) = ' + testcase[1], function () {
      pangu(testcase[0], {trailling_whitespace: false}).should.be.eql(testcase[1]);
    });
  });

  // 中英文混沌状态。
  var testcases_fixup_pangu_spacing = [
    ['english 2', 'english 2'],
    ['中文2', '中文2'],
    ['中文 2', '中文2'],
    ['中文  2', '中文2'],
  ];

  testcases_fixup_pangu_spacing.forEach(function(testcase) {
    it('fixup("' + testcase[0] + '", {pangu_spacing:""}) = ' + testcase[1], function () {
      pangu(testcase[0], {pangu_spacing: ''}).should.be.eql(testcase[1]);
    });
  });

});

describe('pangu.lint()', function () {
  // 默认选项，中英文之间使用盘古之白，标点符号等自动处理。
  var testcases_fixup = [
    ['english', []],
    ['english.', []],
    ['中文', []],
    ['中文.', [{colno:3, lineno:1, message:'Use full-width punctuation please.', type:'error'}]],
    ['(中文)', [
      {colno:1, lineno:1, message:'Use full-width punctuation please.', type:'error'},
      {colno:4, lineno:1, message:'Use full-width punctuation please.', type:'error'},
    ]],
    //['fixup("中文english中文english中文.")', 'fixup("中文 english 中文 english 中文。")'],
  ];

  testcases_fixup.forEach(function(testcase) {
    it('lint("' + testcase[0] + '") = ' + testcase[1], function () {
      pangu.lint(testcase[0]).should.be.eql(testcase[1]);
    });
  });
});
