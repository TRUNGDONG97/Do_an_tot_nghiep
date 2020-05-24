import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Platform } from "react-native";
import Icon from "./Icon";
import NavigationUtil from "../navigation/NavigationUtil";
import theme from "@theme";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import { SCREEN_ROUTER } from '@constant'

class WindsHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    hideBackButton: PropTypes.bool,
    rightComponent: PropTypes.element,
  };
  static defaultProps = {
    hideBackButton: false,
    rightComponent: null
  };

  render() {
    const { title, hideBackButton, backAction,
      rightComponent, navigation, searchButton, onPressSearch,
      top, bottom, fontTitle,
      ...props
    } = this.props;
    const parent = navigation.dangerouslyGetParent();
    const showBackButton = !hideBackButton && parent && parent.state && parent.state.routeName !== SCREEN_ROUTER.MAIN

    return (
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          // marginTop: Platform.OS == "android" ? 35 : 30,
          marginTop: top ? top : 30,
          marginBottom: bottom ? bottom : 20,
          alignItems:"baseline"
        }}
      >
        {showBackButton && (
          <TouchableOpacity
            style={{ position: "absolute", left: 20 }}
            onPress={NavigationUtil.goBack}
          >
            <Icon.AntDesign name="left" size={25} color="#fff" />
          </TouchableOpacity>
        )}
        <Text
          style={[
            fontTitle ? fontTitle : theme.fonts.bold22,
            {
              // marginTop: '1.5%',
              color: "white"
            }
          ]}
        >
          {title}
        </Text>
        {searchButton && (
          <TouchableOpacity
            style={{ position: "absolute", right: 20 }}
            onPress={onPressSearch}
          >
            <Icon.FontAwesome name="search" size={25} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default withNavigation(WindsHeader);
