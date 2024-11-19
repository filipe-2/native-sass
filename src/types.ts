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

type DimensionValueArray = [
  DimensionValue | undefined, ...(DimensionValue | undefined)[]
] & { length: 1 | 2 | 3 | 4 };

type GapValueArray = [number | string, number | string?];

type ReducedViewStyle = Omit<ViewStyle, keyof SassyFlexStyle | keyof ShadowStyleIOS | keyof TransformsStyle>;

interface SassyFlexStyle extends FlexStyle {
  inset?: DimensionValue | DimensionValueArray | undefined;
  margin?: DimensionValue | DimensionValueArray | undefined;
  padding?: DimensionValue | DimensionValueArray | undefined;
  gap?: number | string | GapValueArray | undefined;
}

interface SassyViewStyle extends SassyFlexStyle, ShadowStyleIOS, TransformsStyle, ReducedViewStyle {}

type ReducedTextStyleIOS = Omit<TextStyleIOS, keyof ViewStyle>;

interface SassyTextStyleIOS extends SassyViewStyle, ReducedTextStyleIOS {}

type ReducedTextStyleAndroid = Omit<TextStyleAndroid, keyof ViewStyle>;

interface SassyTextStyleAndroid extends SassyViewStyle, ReducedTextStyleAndroid {}

type ReducedTextStyle = Omit<TextStyle, keyof TextStyleIOS, keyof TextStyleAndroid, keyof ViewStyle>;

interface SassyTextStyle extends SassyTextStyleIOS, SassyTextStyleAndroid, SassyViewStyle, ReducedTextStyle {}

type ReducedImageStyle = Omit<ImageStyle, keyof FlexStyle, keyof ShadowStyleIOS, keyof TransformsStyle>;

interface SassyImageStyle extends SassyFlexStyle, ShadowStyleIOS, TransformsStyle, ReducedImageStyle {}

export interface NativeStyle {
  [key: string]: ViewStyle | TextStyle | ImageStyle;
}

export interface NestedStyle {
  [key: string]: SassyViewStyle | SassyTextStyle | SassyImageStyle | NestedStyle;
}
