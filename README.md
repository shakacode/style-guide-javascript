ShakaCode's JavaScript style guide. (You should also check out [our Ruby style guide](https://github.com/shakacode/style-guide-ruby))

See [eslint-config-shakacode](./eslint-config-shakacode/README.md) for setting up your linter to follow these style guidelines.

# ShakaCode JavaScript Style Guide
Our **JavaScript Style Guide** is relatively simple because we're leveraging the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and its associated `.eslintrc` and `.jscsrc` files.

Here's a few notes on top of that:

1. **Line Length**: We're sticking with the AirBnb standard of 120. See [their reasoning](https://github.com/airbnb/javascript/pull/458). Additionally, any strings greater than 100 should be broken up into multiple lines.
1. Check out the [AirBnb React Guide](https://github.com/airbnb/javascript/blob/master/react/README.md) keeping in mind the exceptions listed below.
1. Use ES6 classes for React components.

# Exceptions From AirBnb JavaScript Style Guide (React Guide only)
## Use the Official Docs from Facebook
We mostly folow the official [FB docs on ES6 for React](https://facebook.github.io/react/docs/reusable-components.html#es6-classes). We initialize state in the constructor.

Notable differences:

1. ES7 static syntax for the propTypes and defaultProps
1. Use lodash `_.bindAll` for callback bindings.

An example React component:

```js
import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class Counter extends React.Component {

  static propTypes = {
    initialCount: PropTypes.number,
  };

  static defaultProps = {
    initialCount: 0,
  };

  constructor(props) {
    super(props);
    this.state = { count: props.initialCount };

    _.bindAll(this, 'tick');
  }

  tick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div onClick={this.tick}>
        Clicks: {this.state.count}
      </div>
    );
  }
}
```

## Root Components
[AirBnb on Root components](https://github.com/airbnb/javascript/blob/master/react/README.md#naming)

> However, for root components of a directory, use index.jsx as the filename and use the directory name as the component name.

We keep React components together with their styles and test files (GOOD):

```
MyComponent/
  |-- MyComponent.jsx
  |-- MyComponent.scss
  |-- MyComponent.spec.jsx
```

The following is according to the AirBnb rule, which we believe to be somewhat inconsistent-looking (BAD):

```
MyComponent/
  |-- index.jsx
  |-- MyComponent.scss
  |-- MyComponent.spec.jsx
```

## Ordering
[Airbnb on Ordering](https://github.com/airbnb/javascript/blob/master/react/README.md#ordering)

Ordering is almost the same, except for one change: we keep all `static`s **before** the `constructor`.

Here is why:

* Since we use `props` in the `constructor`, it makes sense that we define `propTypes` as a [`class static property`](https://github.com/jeffmo/es-class-fields-and-static-properties) first.
* We use `static` methods as router transition hooks (especially `onEnter`). These methods run first (before any instance is created) and are not related to the instance, so it makes sense to group them separately by placing them above the constructor.
* Besides `propTypes`, there are sometimes other cases where `static` may be used to describe constants for a component. Since these very well may be used in the `constructor`, they should be declared first.

# Miscellaneous JavaScript

* Use [Redux](https://github.com/rackt/redux) for your state container.
* Use [Lodash](https://lodash.com/) rather than Underscore.
* With a Rails app, place all JavaScript for the client app in `/client`
* Organize your app into high level domains which map to JavaScript bundles. These are like mini-apps that live within your entire app. Create directories named like `/client/app/<bundle>` and configure Webpack to generate different corresponding bundles.
* Carefully organize your React components into [Smart and Dumb Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.ygdkh1l7b):
   1. "dumb" components (also known as "presentational components") live in the `/client/app/<bundle>/components/` directories. These components should take props, including values and callbacks, and should not talk directly to Redux or any AJAX endpoints.
   2. "smart" components live in the `/client/app/<bundle>/containers/` directory. These components will talk to the Redux store and AJAX endpoints.
* Place common code shared across bundles in `/client/app/libs` and configure Webpack to generate a common bundle for this one.
* Prefix Immutable.js variable names and properties with `$$`. Doing this makes it clear that you are dealing with an Immutable.js object and not a standard JavaScript Object or Array.
* Use ES6 classes rather than `React.createClass`.
* Bind callbacks passed to react components with `_.bindAll` in the constructor unless you need to bind additional parameters. In that case, you can call `_.bind` within the rendering.

### Ternary Conditionals Formatting
Ternary conditionals in a method that return JSX should take this form:

```es6
someMethod(someBoolean) {
  return (
    someBoolean ?
    <SomeComponent /> :
    <OtherComponent />
  );
}
```

When we use parenthesis, we can easily find the end of the expression by the indent guide. Otherwise we have to scan the lines for the end of the expression, and indent guides look like a fence (they actually lose their meaning):

```
return (
| ...
| ...
);
```

The same can be applied to assignments:

```
const myConst = ( // <-- Invitation to see the expression on the next line. Result of the expression will be returned.
 ... //  <-- Expression encapsulated here and looks solid, easier to read
);
```

### Ternary conditionals appearing directly in JSX should take this form:

```es6
render() {
  return (
    <div>
      {
        someBoolean ?
        <SomeComponent /> :
        <OtherComponent />
      }
    </div>
  );
}
```
