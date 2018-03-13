import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({

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
    const container = this.get('containerElement');
    let elementWidth;
    if (container) {
      elementWidth = container.clientWidth;
    } else {
      elementWidth = this.element.clientWidth;
    }
    let fontSize = this.get('textMeasurer')
        .fitTextSize(this.element.innerText, elementWidth, style.fontStyle + ' 14px ' + style.fontFamily);
    if (fontSize > maxSize) {
      fontSize = maxSize;
    } else if (fontSize < minSize) {
      fontSize = minSize;
    }
    this.element.style['font-size'] = fontSize + 'px';
  },

  didUpdate() {
    this._super(...arguments);
    this.scaleFont();
  }
});
