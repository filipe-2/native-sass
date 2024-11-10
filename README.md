<div align="center">
<p align="center">
    <img src="./assets/nativesass.png" alt="NativeSass" width="150" height="150">
    <h1 align="center" style="color:red;">NativeSass</h1>
</p>

[![npm version](https://img.shields.io/npm/v/native-sass)](https://www.npmjs.com/package/native-sass)
[![npm downloads](https://img.shields.io/npm/dw/native-sass)](https://www.npmjs.com/package/native-sass)
[![Github](https://img.shields.io/github/license/filipe-2/native-sass)](https://github.com/filipe-2/native-sass)
[![runs-with-expo](https://img.shields.io/badge/Runs%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)
</div>

## About

A React Native library that allows you to use Sass- and CSS-like functionalities, like nesting and shared styles. With this library, you can nest styles and use shared styles to apply properties to multiple style objects at once, without losing the default experience of creating React Native stylesheets.

## Installation

To use `native-sass`, just run this command from your terminal if you're using `npm`:

```bash
npm install native-sass
```

Or use the following if you're using `yarn`:

```bash
yarn add native-sass
```

## Features

### Nesting

Suppose we have the following StyleSheet:

```javascript
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // More style rules...
  dialogWrapper: {
    // dialogWrapper styles
  },
  dialogTitle: {
    // dialogTitle styles
  },
  dialogMsg: {
    // dialogMsg styles
  },
  dialogActionsBtn: {
    // dialogActionsBtn styles
  },
  dialogActionsBtnText: {
    // dialogActionsBtnText styles
  },
  // More style rules...
});
```

This stylesheet has a lot of style objects that we might want to nest. We can do that by using the `sassy` function from `native-sass` as follows:

```javascript
import { StyleSheet } from 'react-native';
import { sassy } from 'native-sass';

const styles = StyleSheet.create(sassy({
  // More style rules...
  dialog: {
    wrapper: {
      // dialogWrapper styles
    },
    
    title: {
      // dialogTitle styles
    },

    msg: {
      // dialogMsg styles
    },

    actions: {
      btn: {
        // dialogActionsBtn styles

        text: {
          // dialogActionsBtnText styles
        }
      }
    }
  },
  // More style rules...
}));
```

This object passed to `sassy` will be flattened into the object of the previous snippet. The nested keys are capitalized and concatenated with the parent keys, so `dialog.actions.btn.text` becomes `dialogActionsBtnText`. The nested styles are then merged in order to return the object that the `StyleSheet.create()` method expects.

### Shared values

Suppose we have the following stylesheet:

```javascript
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // More style rules...
  cards: {
    width: 200,
    minHeight: 200,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'black'
  },

  card: {
    width: 50,
    minHeight: 50,
    borderWidth: 2,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink'
  },
  // More style rules...
});
```

We can recycle this shared styles as follows with the `sassy` function:

```javascript
import { StyleSheet } from 'react-native';
import { sassy } from 'native-sass';

const styles = StyleSheet.create(sassy({
  // More style rules...
  'cards, card': {
    borderWidth: 2,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },

  cards: {
    width: 200,
    minHeight: 200,
    borderRadius: 25,
    gap: 8,
    backgroundColor: 'black'
  },

  card: {
    width: 50,
    minHeight: 50,
    backgroundColor: 'pink'
  }
  // More style rules...
}));
```

We wrap the keys we want to apply the shared styles to with quotes and separate them with commas.

## Built-in JS functionalities

Some Sass functionalities, like mixins and maps, can be mimicked using built-in JS capabilities.

### Mixins

Mixins can be applied to a style object using the built-in JavaScript spread operator `...`, so no need to use `sassy` (unless nesting or shared styles are present). Example:

```javascript
import { StyleSheet } from 'react-native';

const calculateSpacing = (value) => ({
  padding: value,
  margin: value / 2
});

const styles = StyleSheet.create({
  card: {
    color: 'white',
    width: 50,
    height: 50,
    ...calculateSpacing(20),
  }
});
```
