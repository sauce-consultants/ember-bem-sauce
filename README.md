# ember-bem-sauce

ember-bem-sauce helps you write BEM components. Make your templates cleaner with the help of the bem helper and the bem component mixin. By defining all your components modifiers in one place you will dry up your template files.

## Installation

- `ember install ember-bem-sauce`

## Usage

### The Bem Component Mixin

You should add the `BEMComponent` mixin to any components you wish to use the BEM class style.

```
import Ember from 'ember';
import BEMComponent from 'ember-bem-sauce/mixins/bem-component';

export default Ember.Component.extend(BEMComponent, {
  //...
});
```

Define the components **base** class. This should be a plain string.

```
export default Ember.Component.extend(BEMComponent, {
  base: 'test',
});
```

Define an array of global **modifiers** you wish to use in your component. This should be an array of property names as strings. If a property is truthy then a modifier is added.

```
export default Ember.Component.extend(BEMComponent, {
  base: 'test',
  modifiers: [
    'active',
    'disabled',
  ],
});
```

Sometimes you may wish to use a **different modifier** string from the property name. In this case you can define a colon seperated argument, the first section is the truthy/falsey property, the last is the modifier string.

```
export default Ember.Component.extend(BEMComponent, {
  base: 'test',
  modifiers: [
    'active',
    'disabled',
    'isPrimary:primary',
    'isSecondary:secondary',
  ],
  isPrimary:computed.equal('theme', 'primary'),
  isSecondary:computed.equal('theme', 'secondary'),
});
```

The following will ensure all your modifiers are added to the component base when they are truthy. An example is shown below. To add BEM classess to internal component elements use the **bem helper**

```
<div class="test test--active  test--primary">
  // content...
<div>
```

### The BEM template helper

The BEM helper can be used to add bem style classes to any element in your handlebars markup. It takes three required arguments, the base string, element string and an array of modifiers to add.

_Note: the following code is just for demonstration purposes_

```
<div class="{{bem 'test' 'heading' ['active', 'primary']}}">
  {{heading}}
</div>
<div class="{{bem 'test' 'button' ['active', 'primary']}}">
  {{button}}
</div>
```

When using the bem heper within a component template you can use two convient properties **b** & **m** to dry up your code. **b** is an alias of the components base class. **m** is a reference to all the current active modifiers on the components.

```
<div class="{{bem b 'heading' m}}">
  {{heading}}
</div>
<div class="{{bem b 'button' m]}}">
  {{button}}
</div>
```

If you want some elements to have additional custom modifiers that are not global, these can be passed in to the helper to as named parameters.

```
<div class="{{bem b 'heading' m large=hasLargeHeading black=hasBlackHeading}}">
  {{heading}}
</div>
<div class="{{bem b 'button' m]}}">
  {{button}}
</div>
```

Bringing this all together would look somthing like this.

#### Usage (route.hbs)

```
{{demo-component
  active=true
  theme="primary"
  hasLargeHeading=true
  hasBlackHeading=false
  heading="Hello"
  button="Go"
}}
```

#### Rendered markup

```
<div class="test test--active  test--primary">
  <div class="test__heading test__heading--active test__heading--primary test__heading--large">
    Hello
  </div>
  <div class="test__button test__button--active test__button--primary">
    Go
  </div>
<div>
```

## Utility functions

BEM Sauce has a few utility methods you can use if needed

### getBemClasses(baseClass, modifiers, context)

This function will return a string containing the genereated BEM classes for the given context object.

#### baseClass (string)

This the BEM class without any modifiers can be 'base' or 'base__element' depending on your use.

#### modifiers (array)

Array of property names as strings that exist on the context object. Colon seperate property string to customize the modifier string.

#### context (object)

The object the modifier properties exist on, usually this would be a reference to the component.

#### Return

A string of active BEM classes.

```
import getBemClasses from 'ember-bem-sauce/utils/get-bem-classes';

getBemClasses('button__icon', ['active', primary', 'secondary'], this)

// Return 'button__icon--active button__icon--primary'
```

### getBemModifiers(modifiers, context)

#### modifiers (array)

Array of property names as strings that exist on the context object. Colon seperate property string to customize the modifier string.

#### context (object)

The object the modifier properties exist on, usually this would be a reference to the component.

#### Return

An array of active BEM modifers.

```
import getBemModifiers from 'ember-bem-sauce/utils/get-bem-modifers';

getBemModifiers(['active', 'primary', 'secondary'], this)

// Return ['active', 'primary']
```

## Running the Dummy App

- `ember serve`
- Visit your app at <http://localhost:4200>.

## Running Tests

- `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
- `ember test`
- `ember test --server`

## Building

- `ember build`

For more information on using ember-cli, visit <https://ember-cli.com/>.
