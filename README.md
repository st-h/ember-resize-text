# ember-resize-text

[![Greenkeeper badge](https://badges.greenkeeper.io/st-h/ember-resize-text.svg)](https://greenkeeper.io/)
[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![Code Climate][codeclimate-badge]][codeclimate-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-badge-url]
[![Dependencies][dependencies-badge]][dependencies-badge-url]
[![Dev Dependencies][devDependencies-badge]][devDependencies-badge-url]

ember addon that makes use of [ember-text-measurer](https://github.com/cibernox/ember-text-measurer) to efficiently resize the font of a single line of text to make it fit within its bounds.

## Installation

`ember install ember-resize-text`

## Demo

checkout out the [demo page](https://st-h.github.io/ember-resize-text/)

## Usage

Using ember-resize-text is easy. Just wrap your text within `resize-text` block-style.
```
{{#resize-text minSize=12 maxSize=20}}
  Please resize me!
{{/resize-text}}
```

### Notice on resizing the window

This addon automatically registers event listeners on the windows resize event to make sure text still fits after the window is resized. If you want the text to increase its font size whenever the window is resized, make sure to add the appropriate styling to the add-ons `resize-text` css class. For instance consider this markup:

```
<nav>
  <span>first</span>
  {{#resize-text}}
    second
  {{/resize-text}}
</nav>
```
and the following css:
```
nav {
  width: 100%;
  display: flex
}

.resize-text {
  flex-grow: 1; /* allow the resize-text elements to increase its size */
}
```
The size of the font will not be increased if the element with `resize-text` class will not be able to increase its width in dependency to the parent's width. This is not built into the addon as this depends on the context in which the addon is used.

### Parameters

- **minSize**: minimum font size in px
- **maxSize**: maximum font size in px

## Contribute

Please open issues to discuss further improvement of this add on. Corresponding PRs are very welcome!

[npm-badge]: https://img.shields.io/npm/v/ember-resize-text.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-resize-text
[travis-badge]: https://img.shields.io/travis/st-h/ember-resize-text/master.svg?label=TravisCI
[travis-badge-url]: https://travis-ci.org/st-h/ember-resize-text
[codeclimate-badge]: https://api.codeclimate.com/v1/badges/8688ab1cea89cb7cb918/maintainability
[codeclimate-badge-url]: https://codeclimate.com/github/st-h/ember-resize-text/maintainability
[ember-observer-badge]: http://emberobserver.com/badges/ember-resize-text.svg
[ember-observer-badge-url]: http://emberobserver.com/addons/ember-resize-text
[dependencies-badge]: https://img.shields.io/david/st-h/ember-resize-text.svg
[dependencies-badge-url]: https://david-dm.org/st-h/ember-resize-text
[devDependencies-badge]: https://img.shields.io/david/dev/st-h/ember-resize-text.svg
[devDependencies-badge-url]: https://david-dm.org/st-h/ember-resize-text#info=devDependencies
