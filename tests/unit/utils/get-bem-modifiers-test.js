import getBemModifiers from 'dummy/utils/get-bem-modifiers';
import {
  module,
  test
} from 'qunit';
import Ember from 'ember';

module('Unit | Utility | get bem modifiers');

// Replace this with your real tests.

test('test returns correct modifiers', function(assert) {
  let context = Ember.Object.create({
      active: true,
      disabled: false,
      primary: true,
    }),
    modifiers = ['active', 'disabled', 'primary'];

  let result = getBemModifiers(modifiers, context);

  assert.equal(result.length, 2);
  assert.equal(result[0], 'active');
  assert.equal(result[1], 'primary');
});

test('test returns correct custom modifiers', function(assert) {
  let context = Ember.Object.create({
      active: true,
      disabled: false,
      primary: true,
    }),
    modifiers = ['active', 'disabled', 'primary:my-custom-mod'];

  let result = getBemModifiers(modifiers, context);

  assert.equal(result.length, 2);
  assert.equal(result[0], 'active');
  assert.equal(result[1], 'my-custom-mod');
});

test('test returns no modifiers', function(assert) {
  let context = Ember.Object.create({
      active: false,
      disabled: false,
      primary: false,
    }),
    modifiers = ['active', 'disabled', 'primary:my-custom-mod'];

  let result = getBemModifiers(modifiers, context);

  assert.equal(result.length, 0);
});
