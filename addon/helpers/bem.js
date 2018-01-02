import Ember from 'ember';

export function bem(params, additionalModifiers) {

  // return params;
  let base = params[0],
    element = params[1],
    modifiers = params[2],
    baseClass = `${base}__${element}`,
    classNames = Ember.A([baseClass]);

  modifiers.forEach(function(modifier) {
    classNames.pushObject(`${baseClass}--${modifier}`);
  });

  if (additionalModifiers)
    for (var modifier in additionalModifiers) {
      if (additionalModifiers[modifier]) {
        classNames.pushObject(`${baseClass}--${modifier}`);
      }
    }

  return classNames.join(' ');
}

export default Ember.Helper.helper(bem);
