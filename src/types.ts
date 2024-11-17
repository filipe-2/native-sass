/**
 * A type representing transformation properties that can be applied within the `transform` style property.
 * Each transformation property is represented as an object with a single key-value pair.
 * 
 * Transformation properties include:
 * 1. Rotations (e.g., `rotate`, `rotateX`, `rotateY`, `rotateZ`), expecting a string with units like 'deg' or 'rad'.
 * 2. Scaling (e.g., `scale`, `scaleX`, `scaleY`), expecting a numeric value.
 * 3. Translation (e.g., `translateX`, `translateY`), expecting a numeric value.
 * 4. Skewing (e.g., `skewX`, `skewY`), expecting a string with units like 'deg'.
 * 5. Perspective (`perspective`), expecting a numeric value.
 * 
 * This type allows for modular transformation objects that can be passed as an array to the `transform` property.
*/
export type Transform = {
  rotate?: string;
  rotateX?: string;
  rotateY?: string;
  rotateZ?: string;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  translateX?: number;
  translateY?: number;
  skewX?: string;
  skewY?: string;
  perspective?: number;
};

/**
 * A type representing a style object that can contain other style objects nested within it.
 * 
 * It allows each key to have a value that is either:
 * 1. A string (e.g., a value like 'red', 'center')
 * 2. A number (e.g., a numeric value like 10, 0.5, etc.)
 * 3. Another `NestedStyle`, allowing the style to be nested further.
 * 
 * This is useful for scenarios where styles have to be deeply nested.
 */
export type NestedStyle = {
  [key: string]: string | number | Transform | NestedStyle;
};

/**
 * A type representing the default style object that is expected by the `StyleSheet.create()` method.
 * 
 * This allows for more complex style objects, where styles can be organized in 
 * a hierarchical way.
 * 
 * The key in this type can represent a compound or top-level style (e.g., 'container', 'button', etc.)
 * and the value is either a simple property or another `NestedStyle`, which accounts for style objects that shouldn't be denested/flattened, like `shadowOffset`.
 */
export type NativeStyle = {
  [key: string]: { [property: string]: string | number | Transform | NestedStyle; };
};

/**
 * A type representing a shorthand spacing key, like 'margin' and 'paddin'.
 */
export type ShorthandSpacingKey = 'margin' | 'padding';
