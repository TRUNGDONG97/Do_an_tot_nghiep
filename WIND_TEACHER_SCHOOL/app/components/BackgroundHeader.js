import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Platform } from "react-native";
import Svg, { Circle, Rect, Path } from "react-native-svg";
import theme from "@theme";
import NavigationUtil from "../navigation/NavigationUtil";
const width10 = width - 10;

export default class BackgroundHeader extends Component {
  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Svg height="100%" width="100%">
          <Rect
            x="0"
            y="0"
            width={width}
            height="151"
            fill={theme.colors.backgroundHeader}
          />
          <Path
            d={"M0,150 C10,170 " + width10 + ",170 " + width + ",150"}
            fill={theme.colors.backgroundHeader}
          />
        </Svg>
      </View>
    );
  }
}