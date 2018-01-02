import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bem', 'helper:bem', {
  integration: true
});

test('test helper returns correct modifier classes', function(assert) {

  this.set('b', 'component');
  this.set('m', ['active', 'primary']);

  this.render(hbs `{{bem b 'element' m}}`);

  assert.equal(this.$().text().trim(), 'component__element component__element--active component__element--primary');
});

test('test helper returns correct no modifier classes', function(assert) {

  this.set('b', 'component');
  this.set('m', []);

  this.render(hbs `{{bem b 'element' m}}`);

  assert.equal(this.$().text().trim(), 'component__element');
});

test('test helper returns additional custom modifiers', function(assert) {

  this.set('b', 'component');
  this.set('m', []);
  this.set('boop', true);
  this.set('bar', true);

  this.render(hbs `{{bem b 'element' m boop=boop foo=bar}}`);

  assert.equal(this.$().text().trim(), 'component__element component__element--boop component__element--foo');
});

test('test helper returns correct modifier classes with additional custom modifiers', function(assert) {

  this.set('b', 'component');
  this.set('m', ['active', 'primary']);
  this.set('boop', false);
  this.set('bar', true);

  this.render(hbs `{{bem b 'element' m boop=boop foo=bar}}`);

  assert.equal(this.$().text().trim(), 'component__element component__element--active component__element--primary component__element--foo');
});
