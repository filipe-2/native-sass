<div align="center">
    <img src="./assets/nativesass-banner.png" alt="NativeSass">
    <h1>NativeSass</h1>
    <p><strong>Syntactically Awesome StyleSheets the Native Way</strong><br>
    Use Sass styling features with React Native</p>

[![NPM Version](https://img.shields.io/npm/v/native-sass?logo=npm&logoColor=cb3837&label=Version&color=cc6699)](https://npmjs.com/package/native-sass)
[![NPM Downloads](https://img.shields.io/npm/dw/native-sass?logo=npm&logoColor=cb3837&label=Downloads&color=cc6699)](https://npmjs.com/package/native-sass)
[![Github](https://img.shields.io/badge/License-MIT-cc6699)](https://github.com/filipe-2/native-sass/blob/main/LICENSE)
[![runs-with-expo](https://img.shields.io/badge/Runs%20with%20Expo%20Go-cc6699.svg?logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)
</div>

<br>

## About

A React Native library that lets you create StyleSheets with Sass- and CSS-like functionality, like nesting and shared styles. With this library, you can nest styles, use shared styles to apply properties to multiple style objects at once, and much more, without losing the default experience of creating StyleSheets the React Native way.

## Installation

To use `native-sass` in your project, just run this command from your terminal if you're using `npm`:

```bash
npm install native-sass
```

Or use the following if you're using `yarn`:

```bash
yarn add native-sass
```

NativeSass works with **both** the [React Native CLI](https://reactnative.dev/docs/getting-started-without-a-framework) and [Expo CLI](https://docs.expo.dev/more/expo-cli/), and the installation steps are the same.

## Features

This section covers features included in this library, together with code snippets to exemplify. A separate documentation website will be available in the future.

### Nesting

Consider the following StyleSheet:

```js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // ...
  dialogWrapper: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },

  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },

  dialogMsg: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },

  dialogActionsBtn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#007BFF',
    borderRadius: 4,
  },

  dialogActionsBtnText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // ...
});
```

This `StyleSheet` defines styles for a dialog component, with separate styles for its wrapper, title, message, and action buttons. However, we might want to nest those style rules for organization, maintainability, and to avoid redundancy (notice that we're repeating the name of the component in each object).

To use nesting, we can just pass our custom `StyleSheet` with nested objects to the `sassy` function from `native-sass` as follows:

```js
import { StyleSheet } from 'react-native';
import { sassy } from 'native-sass';

const styles = StyleSheet.create(sassy({
  // ...
  dialog: {
    wrapper: {
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: 'black',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 4,
    },

    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    },

    msg: {
      fontSize: 16,
      color: '#666',
      marginBottom: 20,
    },

    actions: {
      btn: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#007BFF',
        borderRadius: 4,

        text: {
          fontSize: 14,
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
        },
      },
    },
  },
  // ...
}));
```

This object passed to `sassy` will be flattened into the `StyleSheet` of the previous snippet. The nested keys are capitalized and concatenated with the parent keys, so `dialog.actions.btn.text` becomes `dialogActionsBtnText`. The nested styles are then merged in order to return the object that the `StyleSheet.create()` method expects.

Notice that the amount of nesting is up to you to decide, while some degree of nesting helps organizing styles, too much nesting may cause confusion.

### Shared values

Suppose we have the following stylesheet:

```javascript
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // ...
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
  // ...
});
```

We can recycle these shared styles as follows with the `sassy` function:

```javascript
import { StyleSheet } from 'react-native';
import { sassy } from 'native-sass';

const styles = StyleSheet.create(sassy({
  // ...
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
  // ...
}));
```

We wrap the keys we want to apply the shared styles to with quotes and separate them with commas.

### Shorthand properties

In NativeSass, shorthand properties help you define multiple related style values with a more concise syntax. These shorthand properties are designed to make your stylesheets more efficient and readable by consolidating related properties into a single declaration. If you're familiar with CSS, you’ll find these shorthand properties quite similar to how you would define them in a traditional stylesheet.

The following shorthand properties are available:

1. **Margin & Padding**: These properties allow you to define all four directions (top, right, bottom, left) in a single declaration.  
   - **Syntax**:  
     - Single value: `margin: 10;` applies 10px to all sides.
     - Two values: `margin: [10, 20];` applies 10px to top and bottom, and 20px to left and right.
     - Three values: `margin: [10, 20, 30];` applies 10px to top, 20px to left and right, and 30px to bottom.
     - Four values: `margin: [10, 20, 30, 40];` applies 10px to top, 20px to right, 30px to bottom, and 40px to left.
    
     These values can be any of the following types:
     - **number**: A plain number (e.g., `10`).
     - **'auto'**: The `auto` keyword, which can be used for flexible positioning.
     - **Percentage**: A quoted percentage string (e.g., `'10%'`).
     - **AnimatedNode**: If you're using React Native's animation API, this can be an animated value (e.g., `Animated.Value`).
   
2. **Inset**: This shorthand property combines the `top`, `right`, `bottom`, and `left` properties into a single value, making it easier to position elements in a box.
   - **Syntax**:  
     - Single value: `inset: 10;` applies 10px to all sides.
     - Two values: `inset: [10, 20];` applies 10px to top and bottom, and 20px to left and right.
     - Three values: `inset: [10, 20, 30];` applies 10px to top, 20px to left and right, and 30px to bottom.
     - Four values: `inset: [10, 20, 30, 40];` applies 10px to top, 20px to right, 30px to bottom, and 40px to left.
    
     The values in `inset` are the same as the ones for `margin` and `padding`.

3. **Gap**: This shorthand property defines the space between items in a flex container. It is similar to how you would define the `row-gap` and `column-gap` in CSS.
   - **Syntax**:
     - Single value: `gap: 10;` applies 10px for both row and column gaps.
     - Two values: `gap: [10, 20];` applies 10px for row gap and 20px for column gap.

     The values in `gap` can be either a `number` or `string`.

Here's a concrete example of how you can use the shorthand properties in your project:

```ts
const styles = StyleSheet.create(sassy({
  container: {
    flexDirection: 'row',
    gap: 10,
    margin: [10, 20],
    padding: ['auto', '20%', 'auto', 10],  // Applies 'auto' to top padding, 20% right, 'auto' bottom, and 10px left
  },
  box: {
    inset: ['auto', '20%'],  // 'auto' for top and bottom, 20% for left and right
  }
}));
```

## Built-in JS functionalities

Some Sass functionalities, like mixins and maps, can be mimicked using built-in JS capabilities.

### Mixins

Mixins can be applied to a style object using the built-in JavaScript spread operator `...`, so no need to use `sassy` (unless you're using another feature of this library). Example:

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

## 🌟 Did you like? Star the repo!

If you find this project helpful, inspiring, or just plain awesome, please give it a ⭐!  Your support encourages us and helps us keep the project growing more and more.
To star the repo, just click the <strong>Star</strong> button at the top of this page.
