import Ember from 'ember';
const {
  Controller
} = Ember;

export default Controller.extend({
  // Attributes
  style: '',
  title: '',
  disabled: false,
  // Actions
  actions: {
    toggleDisabled() {
      this.toggleProperty('disabled');
    },
  },
});