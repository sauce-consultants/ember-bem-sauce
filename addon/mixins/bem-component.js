import Ember from 'ember';
import getBemModifiers from 'ember-bem-sauce/utils/get-bem-modifiers';
import {
  A
} from '@ember/array';
import {
  get,
  set
} from '@ember/object';
const {
  isEmpty,
  copy,
  computed,
  computed: {
    alias,
  },
  defineProperty,
  Mixin
} = Ember;

export default Mixin.create({
  base: null,
  modifiers: [],
  classNameBindings: [],
  // Computed
  b: alias('base'),
  componentBaseClasses: computed('base', 'm', 'tagName', function() {
    // do not add class bindings for naked components
    if (get(this, 'tagName') === '') {
      return;
    }
    let base = get(this, 'base'),
      classNames = Ember.A([base]);

    get(this, 'm').forEach(function(modifier) {
      classNames.pushObject(`${base}--${modifier}`);
    });
    return classNames.join(' ');
  }),
  init() {
    set(this, 'modifiers', A([]));
    this._super(...arguments);
    this._defineModifierComputedProperty();
    this._addCompomentClassBindings();
  },
  /**
   * Add a classNameBinding computed property
   * that will add base classes
   */
  _addCompomentClassBindings() {
    // Get existing bindings
    let classNameBindings = get(this, 'classNameBindings');
    // Create of modify classNameBindings
    if (isEmpty(classNameBindings)) {
      classNameBindings = [];
    } else {
      classNameBindings = copy(classNameBindings);
    }
    // Add class computed property
    classNameBindings.push('componentBaseClasses');
    set(this, 'classNameBindings', classNameBindings);
  },
  /**
   * Create a computed property that will observe all properties
   * defined in the "modifiers" property.
   * This computed enables us to clean up use of the bem helper so
   * you only need pass one modifier argument.
   */
  _defineModifierComputedProperty() {
    // get all modifier property strings
    let args = copy(get(this, 'modifiers'))
      .map((mod) => {
        // remove any custom modifiers so we
        // observe the correct property
        return mod.split(':')[0];
      });
    // add the computed function
    args.push(
      function() {
        return getBemModifiers(get(this, 'modifiers'), this);
      }
    );
    // define computed using spread operator
    defineProperty(this, 'm', computed(
      ...args,
    ));
  },
});