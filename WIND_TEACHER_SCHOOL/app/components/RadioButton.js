import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import theme from '@theme'
export default class RadioButton extends Component {
    
    render() {
        const { status, title, onPress } = this.props;
        return (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            //   marginLeft:left
            }}
            onPress={onPress}
          >
            <View
              style={{
                height: 18,
                width: 18,
                borderRadius: 18,
                borderWidth: 1,
                borderColor: theme.colors.black1,
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
                    status == true ? theme.colors.red : theme.colors.white
                }}
               
              />
            </View>
            <Text
              style={[
                theme.fonts.robotoRegular16,
                {
                  marginLeft: 10,
                  color: theme.colors.black
                }
              ]}
            >
              {title}
            </Text>
          </TouchableOpacity>
        );
      }
}

// const styles = StyleSheet.create({
//     _vRadio: {
//         flexDirection: "row",
//         width: 15,
//         height: 15,
//         borderRadius: 15 / 2,
//         borderColor: "black",
//         borderWidth: 1,
//         marginRight: 5,
//         justifyContent: "center",
//         alignItems: "center"
//     },
// })
