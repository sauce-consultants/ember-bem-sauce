import Ember from 'ember';
import layout from '../templates/components/test-component';
import BemComponent from 'ember-bem-sauce/mixins/bem-component';
import {
  bool
} from '@ember/object/computed';

export default Ember.Component.extend(BemComponent, {
  // Attributes
  base: 'test',
  layout,
  // Computed
  hasTitle: bool('title'),
  // Methods
  init() {
    this._super(...arguments);
    this.registerModifiers([
      'disabled',
      '*style',
      'hasTitle:has-title',
    ]);
  },
});