# Contributing

Thank you for considering contributing to our ShakaCode extensions to the Airbnb Linter.

See also instructions for [contributing to the JavaScript rules](../../CONTRIBUTING.md).

## Updating for the latest Airbnb Linter
1. Find the current version.
2. Update [package.json](./package.json) for the [Airbnb linter peer dependencies](https://github.com/airbnb/javascript/blob/eslint-config-airbnb-v17.0.0/packages/eslint-config-airbnb/package.json)

## NPM Module For Linting

Please test changes locally. You may do this by installing locally in your test project.

Manual way that works:

```
cp -r <path to shakacode/style-guide-javascript/packages/eslint-config-shakacode>` node_modules
```

Here are a couple of ways that I wished would work:

### Via `yarn link`:

1. In this directory, run `yarn link`.
2. Link this library in your test project:

```
cd <directory containing node_modules>
yarn link eslint-config-shakacode
```

## Via npm
`npm i --save-dev <path to shakacode/style-guide-javascript/packages/eslint-config-shakacode>`

## Publishing to NPM
Before publishing to npm (for publishers):

```
cd packages/eslint-config-shakacode
```
