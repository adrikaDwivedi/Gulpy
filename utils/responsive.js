import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

// Width Percentage
export const wp = (percentage) => {
  return (width * percentage) / 100;
};

// Height Percentage
export const hp = (percentage) => {
  return (height * percentage) / 100;
};

// Responsive Font
export const rf = (size) => {
  const scale = width / 375; // iPhone 13 reference
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};