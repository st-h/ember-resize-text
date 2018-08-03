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

  test('when a containerElement is specified, this elements width should be used to scale', async function(assert) {

    const container = getRootElement();
    container.style.width = '20px';
    this.set('containerElement', container);
    getRootElement().getElementsByClassName('ember-view')[0].style.width = '200px';

    await render(hbs`
      {{#resize-text containerElement=containerElement minSize=2}}
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

  test('do not grow if we are told not to', async function(assert) {

    // in some situations you may want to only shrink the text if it can't fit in the container

    getRootElement().getElementsByClassName('ember-view')[0].style.width = '800px';
    getRootElement().style.fontSize = '10px';

    await render(hbs`
      {{#resize-text grow=false}}
        template block text
      {{/resize-text}}
    `);

    assert.dom('.resize-text').hasText('template block text');
    assert.equal(getComputedStyle(find('.resize-text'))['font-size'], '10px');
  });

  test('do not shrink if we are told not to', async function(assert) {

    getRootElement().getElementsByClassName('ember-view')[0].style.width = '100px';
    getRootElement().style.fontSize = '20px';

    await render(hbs`
      {{#resize-text shrink=false}}
        template block text
      {{/resize-text}}
    `);

    assert.dom('.resize-text').hasText('template block text');
    assert.equal(getComputedStyle(find('.resize-text'))['font-size'], '20px');
  });

  test('resize with padding taken into account', async function(assert) {

    // first compute without padding
    let container = getRootElement();
    container.style.width = '100px';
    container.style['font-size'] = '10px';
    this.set('containerElement', container);
    await render(hbs`
      {{#resize-text containerElement=containerElement}}
        template block text
      {{/resize-text}}
    `);
    assert.dom('.resize-text').hasText('template block text');
    assert.equal(getComputedStyle(find('.resize-text'))['font-size'], '13px');

    // now, adding padding - we increase the width of the container, but add padding
    container = getRootElement();
    container.style.width = '140px';
    container.style['font-size'] = '10px';
    container.style.paddingLeft = '20px';
    container.style.paddingRight = '20px';
    this.set('containerElement', container);
    await render(hbs`
      {{#resize-text containerElement=containerElement}}
        template block text
      {{/resize-text}}
    `);
    assert.dom('.resize-text').hasText('template block text');
    assert.equal(getComputedStyle(find('.resize-text'))['font-size'], '13px');
  });
});
