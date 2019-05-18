import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

let componentsToNotify = [];
let didSetupListener = false;

function setupListener() {
  didSetupListener = true;
  window.addEventListener('resize', () => {
    componentsToNotify.forEach(c => {
      c.scaleFont();
    });
  }, false);
}

export default Mixin.create({

  classNames: ['resize-text'],

  minSize: 2,
  maxSize: 80,

  textMeasurer: service(),

  didInsertElement() {
    if (!didSetupListener) {
      setupListener();
    }
    componentsToNotify.push(this);
    this.element.style['white-space'] = 'nowrap';
    this.scaleFont();
  },

  willDestroy() {
    for (let i = 0; i < componentsToNotify.length; i++) {
      if (componentsToNotify[i] === this) {
        componentsToNotify.splice(i, 1);
        break;
      }
    }
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
