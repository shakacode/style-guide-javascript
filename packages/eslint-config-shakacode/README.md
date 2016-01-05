# eslint-config-shakacode

Shakacode `eslint` config.

## Install

```bash
npm install --save-dev eslint-config-shakacode eslint-config-airbnb eslint

# We need Babel as we use experimental features and flow syntax
npm install --save-dev babel-eslint

# If it's React project
npm install --save-dev eslint-plugin-react
```

## Use

React project:

```yml
---
extends: eslint-config-shakacode
```

Non-React project:

```yml
---
extends: eslint-config-shakacode/base
```
