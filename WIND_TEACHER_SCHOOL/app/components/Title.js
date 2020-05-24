import React, { Component } from "react";
import { StyleSheet, View,Text } from "react-native";

import * as Theme from "../constants/Theme";
export default class Titile extends Component {
  render() {
    const title = this.props.title;
    return (
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={[{
            color: "#002D4A",
            // fontWeight: "bold",
            // fontSize: 20,
            padding: 15
          },Theme.fonts.bold20]}
        >
          {title}
        </Text>
      </View>
    );
  }
}
