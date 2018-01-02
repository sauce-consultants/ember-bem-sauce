import Ember from 'ember';
import BemComponentMixin from 'ember-bem-sauce/mixins/bem-component';
import {
  module,
  test
} from 'qunit';

module('Unit | Mixin | bem component');

test('it works', function(assert) {
  let BemComponentObject = Ember.Object.extend(BemComponentMixin);
  let subject = BemComponentObject.create();
  assert.ok(subject);
});

test('test class modifier bindings', function(assert) {
  let BemComponentObject = Ember.Object.extend(BemComponentMixin, {
      base: 'component',
      modifiers: ['active', 'disabled', 'primary'],
    }),
    subject = BemComponentObject.create();

  subject.set('active', true);
  subject.set('primary', true);

  assert.equal(subject.get('componentBaseClasses'), 'component component--active component--primary', 'Check correct base classess bound');
});

test('test class modifiers ignored on tagless component', function(assert) {
  let BemComponentObject = Ember.Object.extend(BemComponentMixin, {
      tagName: '',
      base: 'component',
      modifiers: ['active', 'disabled', 'primary'],
    }),
    subject = BemComponentObject.create();

  subject.set('active', true);
  subject.set('primary', true);

  assert.equal(subject.get('componentBaseClasses'), null);
});
