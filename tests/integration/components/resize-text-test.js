import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render, find, getRootElement } from '@ember/test-helpers';

module('Integration | Component | resize text', function(hooks) {

  setupRenderingTest(hooks);


  test('font size should scale based on parent element width', async function(assert) {

    getRootElement().style.width = '20px';
    getRootElement().getElementsByClassName('ember-view')[0].style.width = '800px';

    await render(hbs`
      {{#resize-text}}
        template block text
      {{/resize-text}}
    `);

    assert.dom('.resize-text').hasText('template block text');
    assert.equal(getComputedStyle(find('.resize-text'))['font-size'], '80px');
  });

  test('when a container is specified, this elements width should be used to scale', async function(assert) {

    const container = getRootElement();
    container.style.width = '20px';
    this.set('container', container);
    getRootElement().getElementsByClassName('ember-view')[0].style.width = '200px';

    await render(hbs`
      {{#resize-text container=container minSize=2}}
        template block text
      {{/resize-text}}
    `);

    assert.dom('.resize-text').hasText('template block text');
    assert.equal(getComputedStyle(find('.resize-text'))['font-size'], '2px');
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
