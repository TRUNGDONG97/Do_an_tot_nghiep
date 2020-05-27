import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import theme from '@theme'
export default class Checked extends Component {
  render() {
    const { status, text, onPress,left } = this.props;
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginLeft:left
        }}
        onPress={onPress}
      >
        <View
          style={{
            height: 18,
            width: 18,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: theme.colors.black,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              height: 13,
              width: 13,
              borderRadius: 13,
              backgroundColor:
                status? theme.colors.red : theme.colors.white
            }}
           
          />
        </View>
        <Text
          style={[
            theme.fonts.regular16,
            {
              marginLeft: 10,
              color: theme.colors.black
            }
          ]}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}
