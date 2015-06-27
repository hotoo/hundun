
var merge = require('merge');

// 汉字后的半角标点符号。
var RE_PUNCTUATION_AFTER_HAN = /([\u4e00-\u9fa5\u3040-\u30FF])([ \t]*[.,;!:?\\\/]|[()\[\]{}<>'"])/g;
// 汉字前的半角标点符号。
var RE_PUNCTUATION_BEFORE_HAN = /([(\[{<'"])([\u4e00-\u9fa5\u3040-\u30FF])/g;
var RE_HAN_CHAR = /([\u4e00-\u9fa5\u3040-\u30FF])([ \t]?)([a-zA-Z0-9@&=\[\$\%\^\-\+\(\/\\])/g; // 汉字CH
var RE_CHAR_HAN = /([a-zA-Z0-9!&;=,.:?$%^+)\/\\\]-])([ \t]?)([\u4e00-\u9fa5\u3040-\u30FF])/g; // CH汉字

// 英文标点到中文标点。
var PUNCTUATION_EN = '.,;!:?\\()[]{}<>"\'';
var PUNCTUATION_CN = '。，；！：？、（）『』〖〗《》"\'';

// 中文标点到英文标点。
var PUNCTUATION_CN_2 = '～＠％＊';
var PUNCTUATION_EN_2 = '~@%*';
var RE_PUNCTUATION_2 = new RegExp('([' + PUNCTUATION_CN_2 + '])', 'g');

var NUMBER_CN = '０１２３４５６７８９';
var NUMBER_EN = '0123456789';
var RE_NUMBER = new RegExp('([' + NUMBER_CN + '])', 'g');

var CHAR_CN = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ';
var CHAR_EN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
var RE_CHAR = new RegExp('([' + CHAR_CN + '])', 'g');

/* global exports */
function pangu(text, options) {
  // 不允许行尾空白。
  if (!options.trailling_whitespace) {
    text = text.replace(/[ \t]+$/g, '');
  }

  // 汉字后的半角标点符号，转成全角标点符号。
  text = text.replace(RE_PUNCTUATION_AFTER_HAN, function($0, $1_han, $2_punctuate) {
    return $1_han + PUNCTUATION_CN.charAt( PUNCTUATION_EN.indexOf($2_punctuate) );
  });
  // 汉字前的半角标点符号，转成全角标点符号。
  text = text.replace(RE_PUNCTUATION_BEFORE_HAN, function($0, $1_punctuate, $2_han) {
    return PUNCTUATION_CN.charAt( PUNCTUATION_EN.indexOf($1_punctuate) ) + $2_han;
  });

  // 全角数字。
  text = text.replace(RE_NUMBER, function($0, $1_num_cn) {
    return NUMBER_EN.charAt( NUMBER_CN.indexOf($1_num_cn) );
  });

  // 全角英文字符转成半角英文字符。
  text = text.replace(RE_CHAR, function($0, $1_char_cn) {
    return CHAR_EN.charAt( CHAR_CN.indexOf($1_char_cn) );
  });

  // 全角英文标点转成半角英文标点。
  text = text.replace(RE_PUNCTUATION_2, function($0, $1_punctuation_cn) {
    return PUNCTUATION_EN_2.charAt( PUNCTUATION_CN_2.indexOf($1_punctuation_cn) );
  });

  // 汉字前后的英文字符、数字、标点间增加空白。
  text = text.replace(RE_HAN_CHAR, '$1' + options.pangu_spacing + '$3'); // 汉字在前。
  text = text.replace(RE_CHAR_HAN, '$1' + options.pangu_spacing + '$3'); // 汉字在后。

  return text;
};

function isHan(ch) {
  return /[\u4e00-\u9fa5\u3040-\u30FF]/.test(ch);
}

function execute(regexp, text, handler) {
  var match;
  while (match = regexp.exec(text)) {
    handler(match, text, regexp);
  }
}

function lintLine(line, lineno) {
  var output = [];
  var matchedTrailling = line.match(/\s+$/);
  if (matchedTrailling) {
    output.push({
      type: 'warning',
      lineno: lineno,
      colno: line.length - matchedTrailling.length,
      message: 'Trailling with whitespace.'
    });
  }

  var matchedPunctuationAfterHan;
  while (matchedPunctuationAfterHan = RE_PUNCTUATION_AFTER_HAN.exec(line)) {
    output.push({
      type: "error",
      lineno: lineno,
      colno: matchedPunctuationAfterHan.lastIndex,
      message: 'Use full width punctuation please.'
    });
  }

  var matchedRepeatedPunctuation;
  while (matchedRepeatedPunctuation = /([。，；！：？、《》])\1+/.exec(line)) {
    output.push({
      type: "error",
      lineno: lineno,
      colno: matchedRepeatedPunctuation.lastIndex,
      message: 'Don\'t duplicate punctuation.'
    });
  }

  execute(RE_NUMBER, line, function(match) {
    output.push({
      type: "error",
      lineno: lineno,
      colno: match.lastIndex,
      message: 'Don\'t use full width number.'
    });
  });

  execute(RE_CHAR, line, function(match) {
    output.push({
      type: "error",
      lineno: lineno,
      colno: match.lastIndex,
      message: 'Don\'t use full width char.'
    });
  });

  execute(RE_HAN_CHAR, line, function(match) {
    output.push({
      type: "warning",
      lineno: lineno,
      colno: match.lastIndex,
      message: 'With whitespace between HanZi and ASCII char.'
    });
  });

  execute(RE_CHAR_HAN, line, function(match) {
    output.push({
      type: "warning",
      lineno: lineno,
      colno: match.lastIndex - 1,
      message: 'With whitespace between ASCII char and HanZi.'
    });
  });

  return output;
}

function lint(text, options) {
  var lines = text.split(/\r\n|\r|\n/);
  var output = [];

  lines.forEach(function(line, lineno) {
    var out = lintLine(line, lineno);
    out.lineno = lineno;
    output.concat(out);
  });

  return output;
};

module.exports = pangu;
exports.fixup = pangu;
exports.lint = lint;
