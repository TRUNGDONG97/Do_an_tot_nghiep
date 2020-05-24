import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient'
import Icon from "./Icon";

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        style={[
          {
            width: this.props.disabled || this.props.customStyle ? "100%" : "85%",
            marginTop: this.props.disabled ? 0 : "5%",
            // position:'absolute'
          },
          this.props.style
        ]}
        onPress={this.props.onPress}
      >
        <LinearGradient
          style={styles.bgButton}
          colors={["#ff740d", "#f9ad2e"]}
          start={{ x: 0.7, y: 1 }} //transparent
          end={{ x: 0, y: 0.1 }}
        >
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            marginLeft: 15
          }}>
            {this.props.email && (
              <Icon.Ionicons
                name='md-mail'
                size={20}
                color='white'
              />
            )}
            <Text style={styles.text}>{this.props.title}</Text>

          </View>
          {this.props.right && (
            <View style={{ height: 20, width: 20, marginRight: 10 }}>
              <Icon.Feather
                name='chevron-right'
                size={20}
                color='white'
              />
            </View>
          )}
        </LinearGradient>

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 18,
    marginLeft: 6,
    fontWeight: "bold",
  },
  bgButton: {
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    flexDirection: 'row',

  }
});
