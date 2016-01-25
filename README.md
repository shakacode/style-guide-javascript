ShakaCode's JavaScript Style Guide (Also see our Ruby one: https://github.com/shakacode/style-guide-ruby)

See [eslint-config-shakacode](./eslint-config-shakacode/README.md) for an automated way to follow our guidelines.

# ShakaCode JavaScript Style Guide

Our **JavaScript Style Guide** is relatively simpler because we're simply using the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with it's associated `.eslintrc` and `.jscsrc` files.

Here's a few notes on top of that:

1. **Line Length**: We're sticking with the AirBnb Standard of 120, and any strings greater than 100 should be broken up to multiple lines. Airbnb moved to 120, here's [why](https://github.com/airbnb/javascript/pull/458).
2. Definitely follow the [AirBnb React Guide](https://github.com/airbnb/javascript/blob/master/react/README.md)
3. Use ES6 classes for React.

# Exceptions From AirBnb JavaScript Style Guide (React Guide only)

## Use the Official Docs from Facebook
We mostly folow the official [FB docs on ES6 for React](https://facebook.github.io/react/docs/reusable-components.html#es6-classes). We initialize state in the constructor.

Notable differences:

1. ES7 static syntax for the propTypes and defaultProps
2. Use lodash `_.bindAll` for callback bindings.

For example:

```javascript
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

Along with React component we keep styles + tests files side by side in component directory, so it looks like this:

```
MyComponent/
  |-- MyComponent.jsx
  |-- MyComponent.scss
  |-- MyComponent.spec.jsx
```

With AirBnb rule applied, it looks inconsistent:

```
MyComponent/
  |-- index.jsx
  |-- MyComponent.scss
  |-- MyComponent.spec.jsx
```

So we stick with first pattern for now.

## Ordering
[Airbnb on Ordering](https://github.com/airbnb/javascript/blob/master/react/README.md#ordering)

Ordering is almost the same, except one change: we keep all `static`s **before** `constructor`.

Here is why:

* As we define `propTypes` as a [`class static properties`](https://github.com/jeffmo/es-class-fields-and-static-properties) and use `props` in the `constructor`, so `propTypes` should be described first.
* We use `static` methods as router transition hooks (especially `onEnter`), so these methods run first (before any instance is created) and in common they are not related to the instance, but `constructor` is.
* One more case when `static` may be used is to describe some constants for component, which can also be used in `constructor`.

# Miscellaneous JavaScript

* Use [Redux](https://github.com/rackt/redux) for your flux store.
* Use [Lodash](https://lodash.com/) rather than Underscore.
* With a Rails app, place all JavaScript for the client app in `/client`
* Organize your app into high level domains which map to JavaScript bundles. These are like mini-apps that live within your entire app. Create directories named like `/client/app/<bundle>` and configure Webpack to generate different corresponding bundles.
* Carefully organize your React components into [Smart and Dumb Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.ygdkh1l7b):
   1. "dumb" components that live in the `/client/app/<bundle>/components/` directories. These components should take props, including values and callbacks, and should not talk directly to Redux or any AJAX endpoints.
   2. "smart" components that live in the `/client/app/<bundle>/containers/` directory. These components will talk to the Redux store and AJAX endpoints.
* Place common code shared across bundles in `/client/app/libs` and configure Webpack to generate a common bundle for this one.
* Prefix Immutable.js variable names and properties with `$$`. By doing this, you will clearly know that you are dealing with an Immutable.js object and not a standard JavaScript Object or Array.
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
    {
      someBoolean ?
      <SomeComponent /> :
      <OtherComponent />
    }
  );
}
```
