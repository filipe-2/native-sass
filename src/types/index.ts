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
  [key: string]: string | number | NestedStyle;
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
  [key: string]: { [property: string]: string | number | NestedStyle; };
};