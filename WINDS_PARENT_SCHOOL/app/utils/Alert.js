import I18n from "../i18n/i18n";
import React, { Component } from "react";
import { Alert } from "react-native";

export const showConfirm = (title, content, action) => {
  Alert.alert(
    title,
    content,
    [
      {
        text: 'Hủy',
        style: "cancel"
      },
      {
        text: 'Xác nhận',
        onPress: action
      }
    ],
    { cancelable: false }
  );
};

export const showMessages = (title, content, action) => {
  setTimeout(() => {
    Alert.alert(
      title,
      content,
      [
        {
          text: "OK",
          onPress: action
        }
      ],
      { cancelable: false }
    );
  }, 100);
};

export const _showDialogWaring = (title, content, action, option) => {
  setTimeout(() => {
    Alert.alert(
      title,
      content,
      [
        {
          text: I18n.t("cancel"),
          style: "cancel"
        },
        {
          text: option,
          onPress: action
        }
      ],
      { cancelable: false }
    );
  }, 100);
};
