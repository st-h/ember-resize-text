import $ from 'jquery';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('resize-text', 'Integration | Component | resize text', {
  integration: true
});

test('render scaled font size', function(assert) {

  $('#ember-testing-container').width(400);

  this.render(hbs`
    {{#resize-text}}
      template block text
    {{/resize-text}}
  `);

  assert.equal($('.resize-text').text().trim(), 'template block text');
  assert.equal($('.resize-text').css('font-size'), '80px');
});

test('do not scale below minSize', function(assert) {
  $('#ember-testing-container').width(20);

  this.set('minSize', 20);
  this.render(hbs`
    {{#resize-text minSize=minSize}}
      template block text
    {{/resize-text}}
  `);

  assert.equal($('.resize-text').text().trim(), 'template block text');
  assert.equal($('.resize-text').css('font-size'), '20px');
});

test('do not scale above maxSize', function(assert) {
  $('#ember-testing-container').width(400);

  this.set('maxSize', 20);
  this.render(hbs`
    {{#resize-text maxSize=maxSize}}
      template block text
    {{/resize-text}}
  `);

  assert.equal($('.resize-text').text().trim(), 'template block text');
  assert.equal($('.resize-text').css('font-size'), '20px');
});
