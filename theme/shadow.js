import { Platform } from "react-native";

export const Shadow = {
  card: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.1,
      shadowRadius: 12,
    },
    android: {
      elevation: 6,
    },
  }),
};