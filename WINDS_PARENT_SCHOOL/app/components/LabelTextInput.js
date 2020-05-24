import React, { Component } from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";

export default class LabelTextInput extends Component {
  render() {
    return (
      <View style = {{paddingHorizontal: '7%', width: width}}>
        <Text style={styles.label}> {this.props.label} </Text>
        <TextInput
          secureTextEntry={this.props.secure}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          autoCapitalize="none"
          keyboardType={this.props.keyboardType}
          clearButtonMode="while-editing"
          placeholder={this.props.placeholder}
          style={[styles.tvInput, { marginBottom: "7%" }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: "#0b4369",
    marginBottom: 10
  },
  tvInput: {
    paddingLeft: "5%",
    height: 43,
    borderColor: "#07c9e7",
    borderWidth: 0.9,
    borderRadius: 3,
  }
});
