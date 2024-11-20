import {
  DimensionValue,
  FlexStyle,
  ImageStyle,
  ShadowStyleIOS,
  TransformsStyle,
  TextStyle,
  TextStyleAndroid,
  TextStyleIOS,
  ViewStyle,
} from 'react-native';

/**
 * Represents an array of DimensionValue objects with a length of 1 to 4,
 * corresponding to shorthand notations like `margin` or `padding` in CSS.
 */
type DimensionValueArray = [
  DimensionValue | undefined, ...(DimensionValue | undefined)[]
] & { length: 1 | 2 | 3 | 4; };

/**
 * Represents an array of values for the `gap` property, supporting a row and column value.
 */
type GapValueArray = [number | string, (number | string)?];

/**
 * Represents a reduced version of the React Native ViewStyle interface,
 * excluding styles already accounted for in SassyFlexStyle, ShadowStyleIOS, and TransformsStyle.
 */
type ReducedViewStyle = Omit<ViewStyle, keyof SassyFlexStyle | keyof ShadowStyleIOS | keyof TransformsStyle>;

/**
 * Custom properties for flex-based layouts, extending the functionality of FlexStyle.
 */
interface SassyFlexProps {
  inset?: DimensionValue | DimensionValueArray | undefined;
  margin?: DimensionValue | DimensionValueArray | undefined;
  padding?: DimensionValue | DimensionValueArray | undefined;
  gap?: number | string | GapValueArray | undefined;
}

/**
 * Custom flex layout styles, combining FlexStyle and SassyFlexProps.
 * This allows for extended shorthand properties like `margin` and `gap`.
 */
interface SassyFlexStyle extends Omit<FlexStyle, keyof SassyFlexProps>, SassyFlexProps { }

/**
 * Custom version of ViewStyle,
 */
export interface SassyViewStyle extends SassyFlexStyle, ShadowStyleIOS, TransformsStyle, ReducedViewStyle { }

/**
 * Reduced version of the TextStyleIOS interface, excluding properties already included in ViewStyle.
 */
type ReducedTextStyleIOS = Omit<TextStyleIOS, keyof ViewStyle>;

/**
 * Extended TextStyle interface for iOS, adding SassyViewStyle and reduced TextStyleIOS.
 */
interface SassyTextStyleIOS extends SassyViewStyle, ReducedTextStyleIOS { }

/**
 * Reduced version of the TextStyleAndroid interface, excluding properties already included in ViewStyle.
 */
type ReducedTextStyleAndroid = Omit<TextStyleAndroid, keyof ViewStyle>;

/**
 * Extended TextStyle interface for Android, adding SassyViewStyle and reduced TextStyleAndroid.
 */
interface SassyTextStyleAndroid extends SassyViewStyle, ReducedTextStyleAndroid { }

/**
 * Reduced version of the core TextStyle, excluding platform-specific and view-related properties.
 */
type ReducedTextStyle = Omit<TextStyle, keyof TextStyleIOS | keyof TextStyleAndroid | keyof ViewStyle>;

/**
 * Custom text styles, combining iOS-specific, Android-specific, and core text styles.
 */
export interface SassyTextStyle extends SassyTextStyleIOS, SassyTextStyleAndroid, SassyViewStyle, ReducedTextStyle { }

/**
 * Reduced version of the ImageStyle interface, excluding properties already included in FlexStyle,
 * ShadowStyleIOS, and TransformsStyle.
 */
type ReducedImageStyle = Omit<ImageStyle, keyof FlexStyle | keyof ShadowStyleIOS | keyof TransformsStyle>;

/**
 * Custom image styles, extending flex, shadow, and transform styles.
 */
export interface SassyImageStyle extends SassyFlexStyle, ShadowStyleIOS, TransformsStyle, ReducedImageStyle { }

/**
 * Represents a flat, non-nested collection of React Native styles for views, texts, and images.
 */
export interface NativeStyle {
  [key: string]: ViewStyle | TextStyle | ImageStyle;
}

/**
 * Represents a nested collection of styles, which may include SassyViewStyle, SassyTextStyle, SassyImageStyle,
 * or further nested styles.
 */
export interface NestedStyle {
  [key: string]: SassyViewStyle | SassyTextStyle | SassyImageStyle | NestedStyle;
}
