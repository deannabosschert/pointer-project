# Pointer project
> Project for KRO-NCRV Pointer.

[![Netlify Status](https://api.netlify.com/api/v1/badges/a7051b30-5d80-41f2-ad42-0121a4c43777/deploy-status)](https://app.netlify.com/sites/pointer-project/deploys)

## Getting started
```bash
# Install dependencies
npm install

# Spin up a dev server with hot-reloads for development
npm run dev

# Generate a static site for production
npm run generate
```

## Branches
Branch names should have the following prefixes:
- `feat/`: a branch that adds new functionality
- `docs/`: a branch that adds documentation
- `fix/`: a branch that resolves bugs

## Commit messages
We like to apply to the Angular JS commit message conventions. You can find the docs [here](https://gist.github.com/stephenparish/9941e89d80e2bc58a153).

## Pull Requests
I've written a PR template for this project, you should use that at all times. Right now it's written in Dutch, you can also translate it to English.

## Small style guide
A small style guide to improve consistency in the project.

### File names
You should always use `kebab-case` in file names. Also if you create a `lib` function.

### Vue component names
Vue component names can be written in a number of different ways. We prefer to use `PascalCase` after an import statement and in the `components` section of a Vue component. In the Vue template, we use `kebab-case` to make it web component-like, like so:

```js
// After import
import MyAwesomeComponent from 'components/my-awesome-component'

// In components section
components: {
    MyAwesomeComponent
}

// In Vue template
<template>
    <my-awesome-component>
</template>
```

In this way the template stays close to HTML.
