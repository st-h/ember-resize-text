# ember-resize-text

ember addon that makes use of [ember-text-measurer](https://github.com/cibernox/ember-text-measurer) to efficiently resize the font of a single line of text to make it fit within its bounds.

## Installation

`ember install ember-resize-text`

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
