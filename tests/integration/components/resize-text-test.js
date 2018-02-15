import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render, find, getRootElement } from '@ember/test-helpers';

module('Integration | Component | resize text', function(hooks) {

  setupRenderingTest(hooks);


  test('render scaled font size', async function(assert) {

    getRootElement().style.width = '800px';

    await render(hbs`
      {{#resize-text}}
        template block text
      {{/resize-text}}
    `);

    assert.dom('.resize-text').hasText('template block text');
    assert.equal(getComputedStyle(find('.resize-text'))['font-size'], '80px');
  });


  test('do not scale below minSize', async function(assert) {

    getRootElement().style.width = '20px';

    this.set('minSize', 20);
    await render(hbs`
      {{#resize-text minSize=minSize}}
        template block text
      {{/resize-text}}
    `);

    assert.dom('.resize-text').hasText('template block text');
    assert.equal(getComputedStyle(find('.resize-text'))['font-size'], '20px');
  });


  test('do not scale above maxSize', async function(assert) {

    getRootElement().style.width = '400px';

    this.set('maxSize', 20);
    await render(hbs`
      {{#resize-text maxSize=maxSize}}
        template block text
      {{/resize-text}}
    `);

    assert.dom('.resize-text').hasText('template block text');
    assert.equal(getComputedStyle(find('.resize-text'))['font-size'], '20px');
  });
});
