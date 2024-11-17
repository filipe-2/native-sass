import { Transform, NestedStyle, NativeStyle } from './types';

/**
 * List of keys that should not be flattened (compound styles).
 */
export const ignoredKeys: string[] = ['shadowOffset'];

/**
 * List of special shorthand keys.
 */
export const specialShorthandKeys: string[] = ['inset', 'margin', 'padding', 'gap'];

/**
 * Capitalizes the first letter of each key segment.
 */
export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Handles shared styles.
 */
export const handleSharedStyles = (
  key: string,
  parentKey: string,
  value: string | number | Transform | NestedStyle,
  map: { [key: string]: NestedStyle; }
) => {
  // Handle shared styles for multiple selectors within the current parentKey context
  const selectors = key.split(',').map((s) => s.trim());

  selectors.forEach((selector) => {
    const scopedKey = parentKey ? `${parentKey}${capitalize(selector)}` : selector;

    if (!map[scopedKey]) map[scopedKey] = {};

    Object.assign(map[scopedKey], value);
  });
};

/**
 * Checks if a value is an object.
 */
export const isObject = (value: any): boolean => typeof (value) === 'object' && !Array.isArray(value);

/**
 * Assigns ignored keys without flattening.
 */
export const assignFlatStyle = (
  nativeStyles: NativeStyle,
  parentKey: string,
  key: string,
  value: string | number | Transform | NestedStyle
) => {
  if (!nativeStyles[parentKey]) nativeStyles[parentKey] = {};
  nativeStyles[parentKey][key] = value;
};

/**
 * Assigns ignored keys without flattening.
 */
export const assignIgnoredKeyStyle = (
  nativeStyles: NativeStyle,
  parentKey: string,
  key: string,
  value: string | number | Transform | NestedStyle
) => {
  if (!nativeStyles[parentKey]) nativeStyles[parentKey] = {};
  nativeStyles[parentKey][key] = value;
};

/**
 * Applies shared styles to each relevant selector in the nativeStyles object.
 */
export const applySharedStyles = (
  nativeStyles: NativeStyle,
  sharedStylesMap: {
    [key: string]: NestedStyle;
  }
) => {
  for (const selector in sharedStylesMap) {
    if (!nativeStyles[selector]) nativeStyles[selector] = {};
    Object.assign(nativeStyles[selector], sharedStylesMap[selector]);
  }
};

/**
 * Handles shorthand inset key.
 */
const handleShorthandInset = (_key: string, value: NestedStyle): NestedStyle => {
  if (typeof value === 'number') {
    return { top: value, right: value, bottom: value, left: value };
  }

  if (Array.isArray(value)) {
    const [top, right, bottom, left] = value;

    switch (value.length) {
      case 1:
        return { top, right: top, bottom: top, left: top };
      case 2:
        return { top, right, bottom: top, left: right };
      case 3:
        return { top, right, bottom, left: right };
      case 4:
        return { top, right, bottom, left };
      default:
        throw new Error(`Invalid value for inset: ${JSON.stringify(value)}`);
    }
  }

  throw new Error(`Invalid value for inset: Expected a number or an array of numbers, but got ${typeof value}. Value: ${JSON.stringify(value)}`);
};

/**
 * Handles special shorthand spacing keys.
 */
const handleShorthandSpacing = (key: string, value: NestedStyle): NestedStyle => {
  if (typeof value === 'number') {
    return {
      [`${key}Vertical`]: value,
      [`${key}Horizontal`]: value,
    };
  }

  if (Array.isArray(value)) {
    const [top, right, bottom, left] = value;

    switch (value.length) {
      case 1:
        return { [key]: top };
      case 2:
        return {
          [`${key}Vertical`]: top,
          [`${key}Horizontal`]: right,
        };
      case 3:
        return {
          [`${key}Top`]: top,
          [`${key}Horizontal`]: right,
          [`${key}Bottom`]: bottom,
        };
      case 4:
        return {
          [`${key}Top`]: top,
          [`${key}Right`]: right,
          [`${key}Bottom`]: bottom,
          [`${key}Left`]: left,
        };
      default:
        throw new Error(`Invalid ${key} array length: Expected 1, 2, 3, or 4, but got ${value.length}. Value: ${JSON.stringify(value)}`);
    }
  }

  throw new Error(`Invalid value for ${key}: Expected a number or an array of numbers, but got ${typeof value}. Value: ${JSON.stringify(value)}`);
};

const handleShorthandGap = (_key: string, value: NestedStyle): NestedStyle => {
  if (typeof value === 'number') {
    return { gap: value };
  };

  if (Array.isArray(value)) {
    const [row, column] = value;

    switch (value.length) {
      case 1:
        return { gap: row };
      case 2:
        return {
          rowGap: row,
          columnGap: column,
        };
      default:
        throw new Error(`Invalid value for gap: ${JSON.stringify(value)}`);
    }
  }

  throw new Error(`Invalid value for gap: Expected a number or an array of numbers, but got ${typeof value}. Value: ${JSON.stringify(value)}`);
};

/**
 * Object containing the shorthand key handlers.
 */
export const shorthandHandlers: { [key: string]: (key: string, value: NestedStyle) => NestedStyle; } = {
  inset: handleShorthandInset,
  margin: handleShorthandSpacing,
  padding: handleShorthandSpacing,
  gap: handleShorthandGap,
};
