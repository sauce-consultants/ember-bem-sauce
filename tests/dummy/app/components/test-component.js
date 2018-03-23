import Ember from 'ember';
import layout from '../templates/components/test-component';
import BemComponent from 'ember-bem-sauce/mixins/bem-component';

export default Ember.Component.extend(BemComponent, {
  base: 'test',
  layout,
  init() {
    this.set('modifiers', [
      'active',
      'disabled',
      'primary',
      'secondary',
      '*style',
    ]);
    this._super(...arguments);
  },
});