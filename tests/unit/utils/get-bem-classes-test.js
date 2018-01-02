import getBemClasses from 'dummy/utils/get-bem-classes';
import {
  module,
  test
} from 'qunit';
import Ember from 'ember';

module('Unit | Utility | get bem classes');

test('test returns correct modifiers', function(assert) {
  let context = Ember.Object.create({
      active: true,
      disabled: false,
      primary: true,
    }),
    baseClass = 'component',
    modifiers = ['active', 'disabled', 'primary'];

  let result = getBemClasses(baseClass, modifiers, context);

  assert.equal(result, 'component component--active component--primary');
});

test('test returns correct custom modifiers', function(assert) {
  let context = Ember.Object.create({
      active: true,
      disabled: false,
      primary: true,
    }),
    baseClass = 'component',
    modifiers = ['active', 'disabled', 'primary:my-custom-mod'];

  let result = getBemClasses(baseClass, modifiers, context);

  assert.equal(result, 'component component--active component--my-custom-mod');
});

test('test returns no modifiers', function(assert) {
  let context = Ember.Object.create({
      active: false,
      disabled: false,
      primary: false,
    }),
    baseClass = 'component',
    modifiers = ['active', 'disabled', 'primary:my-custom-mod'];

  let result = getBemClasses(baseClass, modifiers, context);

  assert.equal(result, 'component');
});
