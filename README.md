# ember-resize-text

[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![CircleCI Build Status][circle-badge]][circle-badge-url]
[![Test Coverage][coveralls-badge]][coveralls-badge-url]
[![Code Climate][codeclimate-badge]][codeclimate-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-badge-url]
[![Dependencies][dependencies-badge]][dependencies-badge-url]
[![Dev Dependencies][devDependencies-badge]][devDependencies-badge-url]

[npm-badge]: https://img.shields.io/npm/v/{{REPO_NAME}}.svg
[npm-badge-url]: https://www.npmjs.com/package/{{REPO_NAME}}
[travis-badge]: https://img.shields.io/travis/{{USER_NAME}}/{{REPO_NAME}}/master.svg?label=TravisCI
[travis-badge-url]: https://travis-ci.org/{{USER_NAME}}/{{REPO_NAME}}
[circle-badge]: https://circleci.com/gh/{{USER_NAME}}/{{REPO_NAME}}/tree/master.svg?style=svg&circle-token={{CIRCLE_TOKEN}}
[circle-badge-url]: https://circleci.com/gh/{{USER_NAME}}/{{REPO_NAME}}/tree/master
[coveralls-badge]: https://coveralls.io/repos/github/{{USER_NAME}}/{{REPO_NAME}}/badge.svg?branch=master
[coveralls-badge-url]: https://coveralls.io/github/{{USER_NAME}}/{{REPO_NAME}}?branch=master
[codeclimate-badge]: https://img.shields.io/codeclimate/github/{{USER_NAME}}/{{REPO_NAME}}.svg
[codeclimate-badge-url]: https://codeclimate.com/github/{{USER_NAME}}/{{REPO_NAME}}
[ember-observer-badge]: http://emberobserver.com/badges/{{REPO_NAME}}.svg
[ember-observer-badge-url]: http://emberobserver.com/addons/{{REPO_NAME}}
[dependencies-badge]: https://img.shields.io/david/{{USER_NAME}}/{{REPO_NAME}}.svg
[dependencies-badge-url]: https://david-dm.org/{{USER_NAME}}/{{REPO_NAME}}
[devDependencies-badge]: https://img.shields.io/david/dev/{{USER_NAME}}/{{REPO_NAME}}.svg
[devDependencies-badge-url]: https://david-dm.org/{{USER_NAME}}/{{REPO_NAME}}#info=devDependencies

ember addon that makes use of [ember-text-measurer](https://github.com/cibernox/ember-text-measurer) to efficiently resize the font of a single line of text to make it fit within its bounds.

## Installation

`ember install ember-resize-text`

## Demo

checkout out the [demo page](https://st-h.github.io/ember-resize-text/)

## Usage

Using ember-resize-text is easy. Just wrap your text within `resize-text` block-style.
```
{{#resize-text min-font=12 max-font=20}}
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

- **min-font**: minimum font size in px
- **max-font**: maximum font size in px

## Contribute

Please open issues to discuss further improvement of this add on. Corresponding PRs are very welcome!
