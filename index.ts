import { NativeStyle, NestedStyle } from './src/types';
import {
  ignoredKeys,
  capitalize,
  handleSharedStyles,
  isObject, 
  assignFlatStyle,
  assignIgnoredKeyStyle
} from './src/utils';

export function sassy(nestedStyles: NestedStyle, parentKey: string = ''): NativeStyle {
  const nativeStyles: NativeStyle = {};
  const sharedStylesMap: {
    [key: string]: NestedStyle;
  } = {};
  
  // Traverse each key-value pair in the nested styles object
  nestedStyles.forEach((key) => {
    const value = nestedStyles[key];
    
    // Handle comma-separated keys (shared styles)
    if (key.includes(',')) {
      handleSharedStyles(key, parentKey, value, sharedStylesMap);
      continue;
    }

    // Assign flat styles and non-objects directly
    if (!isObject(value)) {
      assignFlatStyle(nativeStyles, parentKey, key, value);
      continue;
    }
    
    // Assign ignored keys directly
    if (ignoredKeys.includes(key)) {
      assignIgnoredKeyStyle(nativeStyles, parentKey, key, value);
      continue;
    }

    // Recursively flatten nested styles
    const newKey = parentKey ? `${parentKey}${capitalize(key)}` : key;
    const nestedNativeStyles = sassy(value, newKey);
    Object.assign(nativeStyles, nestedNativeStyles);
  }

  // Apply shared styles within the appropriate nested contexts
  sharedStylesMap.forEach((selector) => {
    if (!nativeStyles[selector]) nativeStyles[selector] = {};
    Object.assign(nativeStyles[selector], sharedStylesMap[selector]);
  });

  // Return the flattened stylesheet
  return nativeStyles;
}
