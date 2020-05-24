import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput
} from "react-native";
import { LoginButton, AccessToken, LoginManager } from "react-native-fbsdk";
import {
  GoogleSignin,
  statusCodes
} from "@react-native-community/google-signin";
import AsyncStorage from "@react-native-community/async-storage";
import theme from "@theme";
import { SCREEN_ROUTER } from "@constant";
import Icon from "@component/Icon";
import NavigationUtil from "@app/navigation/NavigationUtil";
import { Block, LoadingProgressBar, Button, FastImage } from "@component";
import { connect } from "react-redux";
import R from "@R";
import { showMessages } from "@app/utils/Alert";
import OneSignal from "react-native-onesignal";
import { requestLogin } from "@api";

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    username: "",
    password: "",
    deviceID: "",
    isLoading: false,
    error: null,
    data: {}
  };

  componentDidMount() {
    OneSignal.getPermissionSubscriptionState(async status => {
      this.setState({
        deviceID: status.userId
      });
    });
  }

  login = async () => {
    if (
      this.state.username.trim().length == 0 ||
      this.state.password.trim().length == 0
    ) {
      message = "Mời bạn cập nhật đầy đủ thông tin";
      showMessages(R.strings.notification, message);
      return;
    }
    this.setState({ ...this.state, isLoading: true });
    try {
      const response = await requestLogin({
        phone: this.state.username,
        password: this.state.password,
        deviceID: this.state.deviceID
      });

      this.setState(
        {
          ...this.state,
          error: null,
          isLoading: false,
          data: response.result
        },
        () => {
          AsyncStorage.setItem("token", response.result.token, () =>
            NavigationUtil.navigate(SCREEN_ROUTER.MAIN)
          );
        }
      );
    } catch (err) {
      this.setState({ ...this.state, error: err, isLoading: false });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        {this.state.isLoading && <LoadingProgressBar />}
        <FastImage
          style={styles.img}
          resizeMode="contain"
          source={R.images.logoWindSky}
        />
        <TextInput
          onSubmitEditing={() => {
            this.passwordInput.focus();
          }}
          value={this.state.username}
          onChangeText={text => this.setState({ username: text })}
          autoCapitalize="none"
          keyboardType="phone-pad"
          clearButtonMode="while-editing"
          returnKeyType="next"
          placeholder={R.strings.account}
          style={[styles.tvInput, { marginBottom: "7%" }]}
        />
        <TextInput
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={text => this.setState({ password: text })}
          ref={passwordInput => (this.passwordInput = passwordInput)}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          returnKeyType="done"
          placeholder={R.strings.password}
          style={styles.tvInput}
          onSubmitEditing={this.login}
        />
        <TouchableOpacity style={{ width: "85%" }}>
          <Text style={[theme.fonts.bold15, styles.textForgotPassword]}>
            {R.strings.forgot_password}
          </Text>
        </TouchableOpacity>
        <Button title={R.strings.login} onPress={this.login} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center"
  },
  img: {
    width: width / 1.5,
    height: 200,
    marginTop: height / 10
  },
  tvInput: {
    paddingLeft: "5%",
    height: 43,
    width: "85%",
    borderColor: "#07c9e7",
    borderWidth: 0.9,
    borderRadius: 3
  },
  textForgotPassword: {
    marginTop: 10,
    textAlign: "right"
  },
  textLogin: {
    color: "white",
    fontSize: 16
  },
  bgButton: {
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3
  }
});
