import Component from '@ember/component';
import layout from '../templates/components/resize-text';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,

  classNames: ['resize-text'],

  minSize: 2,
  maxSize: 80,

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
    const style = getComputedStyle(this.element);
    const minSize = this.get('minSize');
    const maxSize = this.get('maxSize');
    let fontSize = this.get('textMeasurer').fitTextSize(
        this.element.innerText, this.element.clientWidth, style.fontStyle + ' 14px ' + style.fontFamily);
    if (fontSize > maxSize) {
      fontSize = maxSize;
    }
    if (fontSize < minSize) {
      fontSize = minSize;
    }
    this.element.style['font-size'] = fontSize + 'px';
  },

  didUpdate() {
    this._super(...arguments);
    this.scaleFont();
  }
});
