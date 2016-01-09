ShakaCode's JavaScript Style Guide (Also see our Ruby one: https://github.com/shakacode/style-guide-ruby)

# ShakaCode JavaScript Style Guide

Our **JavaScript Style Guide** is relatively simpler because we're simply using the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with it's associated `.eslintrc` and `.jscsrc` files.

Here's a few notes on top of that:

1. **Line Length**: We're sticking with the AirBnb Standard of 120, and any strings greater than 100 should be broken up to multiple lines. Airbnb moved to 120, here's [why](https://github.com/airbnb/javascript/pull/458).
2. Definitely follow the [AirBnb React Guide](https://github.com/airbnb/javascript/blob/master/react/README.md)


# Exceptions (React Guide only)

## Use the Official Docs from Facebook
We follow the official [FB docs on ES6 for React](https://facebook.github.io/react/docs/reusable-components.html#es6-classes)

For example:

```javascript
import _ from 'lodash';
export class Counter extends React.Component {
  static propTypes = {
    initialCount: React.PropTypes.number,
  };
  
  static defaultProps = {
    initialCount: 0,
  };
  
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
    
    _.bindAll("tick");
  }
  tick() {
    this.setState({count: this.state.count + 1});
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

**Compared to the official docs**, we use ES7 static syntax for the propTypes and defaultProps. We initialize state per the above aexample in the constructor. We also use lodash `_.bindAll` for callback bindings.

We also 

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
