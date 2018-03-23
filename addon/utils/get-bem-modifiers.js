/**
 * Return an array of active modifiers.
 * Modifiers should be an array of property names to add if
 * they are true on the context. Use 'property:modifier' syntax
 * if modifier should be different from property name.
 *
 * @prop modifiers  Array   Array of modifiers ()
 * @prop context    Object  The object that has the modifiers properties
 */
export default function getBemModifiers(modifiers, context) {

  let classNames = [];

  modifiers.forEach((modifier) => {
    let property = modifier;

    if (modifier.indexOf(':') !== -1) {
      let arr = modifier.split(':');
      property = arr[0];
      modifier = arr[1];
    }

    if (context.get(property)) {
      classNames.push(modifier);
    }

    if (modifier.indexOf('*') === 0) {
      let property = modifier.substr(1),
        value = context.get(property);

      if (value) {
        value
          .split(' ')
          .forEach(modifier => {
            classNames.push(modifier);
          });
      }
    }
  });
  return classNames.sort();
}