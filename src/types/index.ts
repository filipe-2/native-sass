export type NestedStyle = {
  [key: string]: string | number | NestedStyle;
};

export type NativeStyle = {
  [key: string]: { [property: string]: string | number | NestedStyle; };
};