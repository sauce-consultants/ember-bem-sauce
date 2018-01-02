import Ember from 'ember';
const {
  Controller
} = Ember;

export default Controller.extend({
  active: true,
  disabled: true,
  actions: {
    toggleDisabled() {
      this.toggleProperty('disabled');
    },
    toggleActive() {
      this.toggleProperty('active');
    },
  },
});
