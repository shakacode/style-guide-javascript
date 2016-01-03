ShakaCode's JavaScript Style Guide (Also see our Ruby one: https://github.com/shakacode/style-guide-ruby)

# ShakaCode JavaScript Style Guide

Our **JavaScript Style Guide** is relatively simpler because we're simply using the [Airbnb JavaScript Style Guide][airbnb-javascript] with it's associated `.eslintrc` and `.jscsrc` files.

Here's a few notes on top of that:

1. **Line Length**: We're sticking with the AirBnb Standard of 120, and any strings greater than 100 should be broken up to multiple lines. Airbnb moved to 120, here's [why](https://github.com/airbnb/javascript/pull/458).
2. Definitely follow the [AirBnb React Guide](https://github.com/airbnb/javascript/blob/master/react/README.md)


# Exceptions:

## Root Components
[AirBnb on Root components](https://github.com/airbnb/javascript/blob/master/react/README.md#naming)

> However, for root components of a directory, use index.jsx as the filename and use the directory name as the component name.

We have scss + tests files in component directory, so now it looks like this:

```
MyComponent/
  |-- MyComponent.jsx
  |-- MyComponent.scss
  |-- MyComponent.spec.jsx
```

When we'll apply airbnb rule:

```
MyComponent/
  |-- index.jsx
  |-- MyComponent.scss
  |-- MyComponent.spec.jsx
```

Kinda ugly and not consistent.

To solve this we can use this pattern:

```
MyComponent/
  |-- index.jsx
  |-- styles.scss
  |-- specs.jsx
```

## Ordering
[Airbnb on Ordering](https://github.com/airbnb/javascript/blob/master/react/README.md#ordering)

Ordering. I'd put all `static` methods **before** `constructor`, b/c  as we are using `props` in the `constructor`, so `propTypes` should be described first. Also we use statics for transition hooks, so these methods are not related to instance methods, but `constructor` is. One more case when statics may be used is to describe some constants for component, which can also be used in `constructor`. Anyway all of these is not critical I guess.
