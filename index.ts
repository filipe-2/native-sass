import { NativeStyle, NestedStyle } from './src/types';
import { capitalize } from './src/utils';

// List of keys that should not be flattened (compound styles)
const ignoredKeys = ['shadowOffset'];

export function sassy(nestedStyles: NestedStyle, parentKey: string = ''): NativeStyle {
  const nativeStyles: NativeStyle = {};
  const sharedStylesMap: { [key: string]: NestedStyle; } = {};

  for (const key in nestedStyles) {
    const value = nestedStyles[key];

    if (key.includes(',')) {
      // Handle shared styles for multiple selectors within the current parentKey context
      const selectors = key.split(',').map((s) => s.trim());
      selectors.forEach((selector) => {
        const scopedKey = parentKey ? `${parentKey}${capitalize(selector)}` : selector;

        if (!sharedStylesMap[scopedKey]) {
          sharedStylesMap[scopedKey] = {};
        }
        Object.assign(sharedStylesMap[scopedKey], value);
      });
    } else {
      const newKey = parentKey ? `${parentKey}${capitalize(key)}` : key;

      if (typeof value === 'object' && !Array.isArray(value)) {
        if (ignoredKeys.includes(key)) {
          // If the key is in ignoredKeys, keep it as-is without flattening
          if (!nativeStyles[parentKey]) {
            nativeStyles[parentKey] = {};
          }
          nativeStyles[parentKey][key] = value;
        } else {
          // Recursively flatten nested styles with updated parent context
          const nestedNativeStyles = sassy(value, newKey);
          Object.assign(nativeStyles, nestedNativeStyles);
        }
      } else {
        if (!nativeStyles[parentKey]) {
          nativeStyles[parentKey] = {};
        }
        nativeStyles[parentKey][key] = value as string | number;
      }
    }
  }

  // Apply shared styles within the appropriate nested contexts
  for (const selector in sharedStylesMap) {
    if (!nativeStyles[selector]) {
      nativeStyles[selector] = {};
    }
    Object.assign(nativeStyles[selector], sharedStylesMap[selector]);
  }

  return nativeStyles;
}