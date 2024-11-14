import { NativeStyle, NestedStyle } from './src/types';
import { ignoredKeys, capitalize, handleSharedStyles } from './src/utils';

export function sassy(nestedStyles: NestedStyle, parentKey: string = ''): NativeStyle {
  const nativeStyles: NativeStyle = {};
  const sharedStylesMap: { [key: string]: NestedStyle; } = {};
  // Traverse each key-value pair in the nested styles object
  for (const key in nestedStyles) {
    const value = nestedStyles[key];
    
    // Handle comma-separated keys (shared styles)
    if (key.includes(',')) {
      handleSharedStyles(key, parentKey, value, sharedStylesMap);
    } else {
      const newKey = parentKey ? `${parentKey}${capitalize(key)}` : key;

      if (typeof value === 'object' && !Array.isArray(value)) {
        if (ignoredKeys.includes(key)) {
          // If the key is in ignoredKeys, keep it as-is without flattening
          if (!nativeStyles[parentKey]) nativeStyles[parentKey] = {};
          nativeStyles[parentKey][key] = value;
        } else {
          // Recursively flatten nested styles with updated parent context
          const nestedNativeStyles = sassy(value, newKey);
          Object.assign(nativeStyles, nestedNativeStyles);
        }
      } else {
        if (!nativeStyles[parentKey]) nativeStyles[parentKey] = {};
        nativeStyles[parentKey][key] = value as string | number;
      }
    }
  }

  // Apply shared styles within the appropriate nested contexts
  for (const selector in sharedStylesMap) {
    if (!nativeStyles[selector]) nativeStyles[selector] = {};
    Object.assign(nativeStyles[selector], sharedStylesMap[selector]);
  }

  return nativeStyles;
}