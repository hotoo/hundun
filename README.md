
# pangu

[![NPM version][npm-badge]][npm-url]
[![Build status][travis-badge]][travis-url]
[![Coveralls status][Coveralls-badge]][coveralls-url]

[npm-badge]: https://img.shields.io/npm/v/hundun.svg?style=flat
[npm-url]: https://www.npmjs.com/package/hundun
[travis-badge]: https://travis-ci.org/hotoo/pangu.svg
[travis-url]: https://travis-ci.org/hotoo/pangu
[coveralls-badge]: https://coveralls.io/repos/hotoo/pangu/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/r/hotoo/pangu

盘古之白。中文自动规范化工具。

## INSTALL

via npm:

```
$ npm install hundun [-g]
```

## USAGE

### CLI

```
$ pangu file.md
$ pangu ./dir
$ pangulint file.md
```

### NodeJS

```js
var pangu = require('hundun');
pangu(text);
pangu.markdown(markdown);
```

## API

### pangu(text, options)

自动规范化修复文本格式。

### pangu.fixup(text, options)

同 `pangu(text, options)`。

### pangu.lint(markdown options)

校验文档。

## Options

* file_type: 目前支持 `[text, markdown]`，默认为 `text`。
* trailling_whitespace: 允许行尾空白字符。默认为 `true`，如果设置为 `false`，则剔除行尾空白。
* pangu_spacing: 盘古之白，中英文之间的空白。默认为 `" "`，你也可以设置为 `""` 或双宽度空白 `"TODO"`。

## 寓言

浑沌之死

> 南海之帝为倏，北海之帝为忽，中央之帝为浑沌。
> 倏与忽时相与遇于浑沌之地，浑沌待之甚善。
> 倏与忽谋报浑沌之德，曰：“人皆有七窍以视听食息，此独无有，尝试凿之。”
> 日凿一窍，七日而浑沌死。
>
> 出自《庄子·应帝王》

盘古开天地

> 天地浑沌如鸡子，盘古生其中。万八千岁，天地开辟，阳清为天，阴浊为地。
> 盘古在其中，一日九变，神于天，圣于地。
> 天日高一丈，地日厚一丈，盘古日长一丈，如此万八千岁。
> 天数极高，地数极深，盘古极长。后乃有三皇。
> 数起于一，立于三，成于五，盛于七，处于九，故天去地九万里。
>
> 《三五历纪》三国时期吴国徐整著
