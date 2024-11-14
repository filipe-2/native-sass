import { NestedStyle } from './types';


// List of keys that should not be flattened (compound styles)
export const ignoredKeys: string[] = ['shadowOffset'];


// Utility function to capitalize the first letter of each key segment
export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);


// Handles shared styles
export const handleSharedStyles = (
  key: string,
  parentKey: string,
  value: string | number | NestedStyle,
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