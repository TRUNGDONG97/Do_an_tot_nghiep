import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import theme from "@theme";
import { Icon } from "@component";
import { Dropdown } from "react-native-material-dropdown";
import {
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native-gesture-handler";
export default class DropdownWindSky extends Component {
    render() {
        // console.log(this.props.data);
        // this._getDate()
        const {
            data,
            lable,
            action,
            value,
            onChangeText,
            containerStyle,
            valueExtractor,
            required
        } = this.props;
        return (
            <TouchableWithoutFeedback
                style={{}}
                onPress={() => this.dropdown.focus()}
            >
                {/* <Text style={[theme.fonts.medium12, { color: theme.colors.black }]}>
          {lable}{" "}
          {required && (
            <Text
              style={{
                color: theme.colors.red
              }}
            >
              *
            </Text>
          )}
        </Text> */}
                <Dropdown
                    ref={ref => {
                        this.dropdown = ref;
                    }}
                    //   disabled={this.props.active}
                    // itemTextStyle={{
                    //     color:theme.colors.backgroundHeader,
                    //     fontSize:20
                    // }}
                    value={value}
                    label={lable}
                    data={data}
                    containerStyle={[styles.textInput, containerStyle]}
                    // valueExtractor={(item, index) => item.name}
                    valueExtractor={valueExtractor}
                    dropdownOffset={{ top: 10, left: 16 }}
                    baseColor={theme.colors.white}
                    onChangeText={onChangeText}

                />
                <Icon.MaterialIcons
                    name="arrow-drop-down"
                    size={30}
                    style={{ position: "absolute", right: 0, top: 8 }}
                />
            </TouchableWithoutFeedback>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: "2%"
    },
    textInput: {
        width: "100%",
        height: 40,
        // marginTop: 5,
        // marginBottom: 15,
        paddingHorizontal: "2%",
        borderBottomWidth: 0.5,
        borderColor: theme.colors.gray2,
        // borderRadius: 4
    },
    price: {
        height: 40,
        width: 50,
        backgroundColor: theme.colors.primary,
        position: "absolute",
        top: 5,
        right: 0,
        justifyContent: "center",
        alignItems: "center"
    }
});
