/**
 * Take a base class name and add modifiers to it if they
 * are true on the context.
 * Modifiers should be an array of property names to add if
 * they are true on the context. Use 'property:modifier' syntax
 * if modifier should be different from property name.
 *
 * @prop baseClass  String  The base__element class name
 * @prop modifiers  Array   Array of modifiers ()
 * @prop context    Object  The object that has the modifiers properties
 */
export default function getBemClasses(baseClass, modifiers, context) {

  let classNames = [baseClass];

  modifiers.forEach((modifier) => {
    let property = modifier;

    if (modifier.indexOf(':') !== -1) {
      let arr = modifier.split(':');
      property = arr[0];
      modifier = arr[1];
    }

    if (context.get(property)) {
      classNames.push(`${baseClass}--${modifier}`);
    }
  });
  return classNames.sort().join(' ');
}