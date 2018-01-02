import Ember from 'ember';
import layout from '../templates/components/test-component';
import BemComponent from 'ember-bem-sauce/mixins/bem-component';

const {
  computed
} = Ember;

export default Ember.Component.extend(BemComponent, {
  base: 'test',
  modifiers: [
    'active',
    'disabled',
    'primary',
    'secondary',
  ],
  classNameBindings: ['fooClass'],
  layout,
  fooClass: computed(function() {
    return 'foo';
  })
});
