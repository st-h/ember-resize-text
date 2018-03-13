import Component from '@ember/component';
import layout from '../templates/components/resize-text';
import ResizeText from '../mixins/resize-text';

export default Component.extend(ResizeText, {
  layout,
});
