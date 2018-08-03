import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

const extractPixels = function(value) {
  let match = /(\d+)px/i.exec(value || '');
  return match ? parseInt(match[1], 10) : 0;
};

export default Mixin.create({

  classNames: ['resize-text'],

  minSize: 2,
  maxSize: 80,

  // NOTE: shrink and grow are shortcuts (as mentioned below)
  // the reasoning: often times the template developer does not have access to (or does not know)
  // the specified font size (in pixels)
  // obviously that can be computed by you, the developer, but these shortcuts handle it for you

  // passed-in: set to false if you only want to grow the text (never shrink)
  // setting to false is an alternative to setting maxSize to your current font size
  shrink: true,

  // passed-in: set to false if you only want to shrink the text (never grow)
  // setting to false is an alternative to setting minSize to your current font size
  grow: true,

  textMeasurer: service(),

  didInsertElement() {
    this._super(...arguments);
    window.addEventListener('resize', this.set('_resizeHandler', this.scaleFont.bind(this)), false);
    this.element.style['white-space'] = 'nowrap';
    this.scaleFont();
  },

  willDestroyElement: function() {
    this._super(...arguments);
    window.removeEventListener('resize', this.get('_resizeHandler'), false);
  },

  scaleFont() {
    const container = this.get('containerElement') || this.element;
    const style = getComputedStyle(container);
    const currentFontSize = extractPixels(style.fontSize);

    // if shrink or grow are set to false, use the currentFontSize
    const { shrink, grow } = this.getProperties('shrink', 'grow');
    const minSize = !shrink ? currentFontSize : this.get('minSize');
    const maxSize = !grow ? currentFontSize : this.get('maxSize');

    // the computed style.width is the given width, w/o padding, which is what we want
    let elementWidth = extractPixels(style.width) || container.clientWidth;
    // remove the padding, which is the actual inner/renderable width
    elementWidth -= extractPixels(style.paddingLeft);
    elementWidth -= extractPixels(style.paddingRight);

    let fontSize = this.get('textMeasurer')
        .fitTextSize(this.element.innerText, elementWidth,
          `${style.fontStyle} ${style.fontSize} ${style.fontFamily}`);
    if (fontSize > maxSize) {
      fontSize = maxSize;
    } else if (fontSize < minSize) {
      fontSize = minSize;
    }

    // only set the style if it actually changed
    if (fontSize !== currentFontSize) {
        this.element.style['font-size'] = fontSize + 'px';
    }
  },

  didUpdate() {
    this._super(...arguments);
    this.scaleFont();
  }
});
