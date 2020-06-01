import { StyleSheet, Platform, StatusBar } from "react-native";
import { Dimensions } from "react-native";

const dimension = ({ width, height } = Dimensions.get("window"));

const colors = {
  // primary: "#FFF100",
  primary: "#F3F3F3",
  primaryDark: "#F6CB26",
  primaryDark1: "#2E384D",
  active: "#2E5BFF",
  blue: "#2E5BFF",
  lightblue: "rgba(46,92,255,0.2)",
  green: "#33AC2E",
  red: "#D63649",
  red1: "#BE1F24",
  yellow: "#F7C137",
  orange: "#FF740D",
  teal: "#00C1D4",
  purple: "#8C54FF",
  black: "#2E384D",
  dark: "#000000",
  black2: "#69707F",
  black3: "#8798AD",
  white: "#FFFFFF",
  gray: "#BFC5D2",
  gray2: "#7F7F7F",
  gray3: "#EEF3F5",
  gray4: "#f3f3f3",
  caption: "#B0BAC9",
  input: "rgba(224, 231, 255, 0.20)", // '#E0E7FF' 20%
  border: "#D6DDF6",
  line: "#002D4A",
  card: "rgba(46,91,255,0.08)",
  shadow: "rgba(46,91,255,0.07)",
  backgroundColorTable: "#A4EBF6",
  backgroundHeader: "#1d67a5",
  primaryText: '#0B4369',
  backgroundBlue:'#A7EEF9',
  backgroundBlueItem:'#E9FAFD'
};

const sizes = {
  font: 15,
  h1: 48,
  h2: 34,
  h3: 28,
  h4: 15,
  paragraph: 15,
  caption: 13,
  captionMedium: 12,

  // global sizes
  base: 16,
  font: 14,
  border: 2,
  padding: 25
};

const fonts = {
  bold12: {
    fontFamily: "roboto-bold",
    fontSize: 12,
    lineHeight: 14
  },
  bold17: {
    fontFamily: "roboto-bold",
    fontSize: 17,
    lineHeight: 45
  },
  bold15: {
    fontFamily: "roboto-bold",
    fontSize: 15,
    lineHeight: 18
  },
  bold16: {
    fontFamily: "roboto-bold",
    fontSize: 16,
    lineHeight: 19
  },
  bold18: {
    fontFamily: "roboto-bold",
    fontSize: 18,
    lineHeight: 21
  },
  bold20: {
    fontFamily: "roboto-bold",
    fontSize: 20,
    lineHeight: 24
  },
  bold22: {
    fontFamily: "roboto-bold",
    fontSize: 22,
    lineHeight: 24
  },
  bold23: {
    fontFamily: "roboto-bold",
    fontSize: 23,
    lineHeight: 27
  },
  bold25: {
    fontFamily: "roboto-bold",
    fontSize: 25,
    lineHeight: 29
  },
  bold49: {
    fontFamily: "roboto-bold",
    fontSize: 49
  },
  regular12: {
    fontFamily: "roboto-regular",
    fontSize: 12,
    lineHeight: 17,
  },
  regular14: {
    fontFamily: "roboto-regular",
    fontSize: 14,
    lineHeight: 17
  },
  regular15: {
    fontFamily: "roboto-regular",
    fontSize: 15,
    lineHeight: 18
  },
  regular16: {
    fontFamily: "roboto-regular",
    fontSize: 16,
    lineHeight: 19
  },
  regular20: {
    fontFamily: "roboto-regular",
    fontSize: 20,
    lineHeight: 19
  },

  light14: {
    fontFamily: "roboto-light",
    fontSize: 14,
    lineHeight: 17
  },
  light18: {
    fontFamily: "roboto-light",
    fontSize: 18,
    lineHeight: 21
  },

  light20: {
    fontFamily: "roboto-light",
    fontSize: 20,
    lineHeight: 23
  },

  light14i: {
    fontFamily: "roboto-light-italic",
    fontSize: 14,
    lineHeight: 21
  },

  medium12: {
    fontFamily: "roboto-medium",
    fontSize: 12,
    lineHeight: 15
  },
  medium15: {
    fontFamily: "roboto-medium",
    fontSize: 15,
    lineHeight: 18
  },

  paragraph: {
    fontFamily: "Rubik-Regular",
    fontSize: sizes.paragraph,
    color: colors.black,
    letterSpacing: 0,
    lineHeight: 22
  },
  paragraphGray: {
    fontFamily: "Rubik-Regular",
    fontSize: sizes.paragraph,
    color: colors.gray,
    letterSpacing: 0,
    lineHeight: 22
  },
  paragraphGray2: {
    fontFamily: "Rubik-Regular",
    fontSize: sizes.paragraph,
    color: colors.gray2,
    letterSpacing: 0,
    lineHeight: 22
  },
  caption: {
    fontFamily: "roboto-regular",
    fontSize: sizes.caption,
    color: colors.dark,
    letterSpacing: 1.12,
    lineHeight: 15
  },
  captionMedium: {
    fontFamily: "Rubik-Medium",
    fontSize: sizes.captionMedium,
    color: colors.black3,
    letterSpacing: 1.12,
    lineHeight: 14
  },
  button: {
    fontFamily: "Rubik-Medium",
    fontSize: sizes.font,
    color: colors.white,
    letterSpacing: 0,
    lineHeight: 21
  }
};

const styles = StyleSheet.create({
  androidSafeView: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },

  test: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center"
  },
  styleBlock: {
    flex: 1,
    backgroundColor: "white",
    // paddingVertical: 10,
    // paddingHorizontal: 8,
    marginTop: 8,
    borderRadius: 4,
    elevation: 2
  },

  styleBlockHeader: {
    flex: 1,
    backgroundColor: "#F58634",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    elevation: 2
  },
  containter: {
    flex: 1,
    backgroundColor: colors.primary
  },

  menu: {
    flex: 1,
    height: width * 0.25
  },

  scrollHoz: {
    width: width * 0.9,
    height: height * 0.3,
    backgroundColor: colors.white,
    borderRadius: 15
  },

  buttonDetail: {
    backgroundColor: "white",
    borderRadius: 50,
    // width: 120,
    // height: 40,
    width: width * 0.35,
    height: height * 0.06,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 15,
    bottom: 15
  },

  scrollMargin: {
    marginVertical: 20,
    marginRight: 15
  },

  rowBasicInfo: {
    flexDirection: "row",
    marginBottom: 25
  },

  button_red: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: 4,
    borderRadius: 10,
    width: width * 0.85,
    padding: 15,
    backgroundColor: "#BE1F24",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },

  input: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: 4,
    borderRadius: 30,
    width: width * 0.9,
    height: height * 0.07,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center"
  }
});

export default { colors, sizes, fonts, styles, dimension };
