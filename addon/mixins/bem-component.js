import Ember from 'ember';
import getBemModifiers from 'ember-bem-sauce/utils/get-bem-modifiers';
import config from 'ember-get-config';
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
  debugBem: false,
  // Computed
  b: alias('base'),
  componentBaseClasses: computed('base', 'm', 'tagName', function() {
    // do not add class bindings for naked components
    if (get(this, 'tagName') === '') {
      return;
    }
    let globalBase = get(config, 'bem-sauce.globalBaseClass'),
      base = get(this, 'base'),
      classNames = Ember.A();

    if (globalBase) {
      classNames.pushObject(globalBase);
    }
    classNames.pushObject(base);

    get(this, 'm').forEach(function(modifier) {
      classNames.pushObject(`${base}--${modifier}`);
    });
    return classNames.join(' ');
  }),
  // Methods
  init() {
    this._super(...arguments);
    this._defineModifierComputedProperty();
    this._addCompomentClassBindings();
  },
  registerModifier(modifier) {
    let m = get(this, 'modifiers');
    if (isEmpty(m)) {
      m = A([]);
      set(this, 'modifiers', m);
    }
    m.pushObject(modifier);

    this._defineModifierComputedProperty();
  },
  registerModifiers(modifiers) {
    let m = get(this, 'modifiers');
    if (isEmpty(m)) {
      m = A([]);
      set(this, 'modifiers', m);
    }
    m.pushObjects(modifiers);

    this._defineModifierComputedProperty();
  },
  /**
   * Add a classNameBinding computed property
   * that will add base classes
   */
  _addCompomentClassBindings() {
    if (get(this, 'tagName') === '') {
      return;
    }
    if (get(this, 'debugBem')) {
      Ember.Logger.log('_addCompomentClassBindings');
    }
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
    if (get(this, 'debugBem')) {
      Ember.Logger.log('_defineModifierComputedProperty');
    }
    // get all modifier property strings
    let args = copy(get(this, 'modifiers'))
      .map((mod) => {
        // remove any custom modifiers so we
        // observe the correct property
        return mod.split(':')[0];
      });
    if (get(this, 'debugBem')) {
      Ember.Logger.log(args);
    }
    // add the computed function
    args.push(
      function() {
        let modifiers = getBemModifiers(get(this, 'modifiers'), this);
        if (get(this, 'debugBem')) {
          Ember.Logger.log(modifiers);
        }
        return modifiers;
      }
    );
    // define computed using spread operator
    defineProperty(this, 'm', computed(
      ...args,
    ));
  },
});