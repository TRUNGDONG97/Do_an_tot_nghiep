import React, { Component } from "react";
import {
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import reactotron from "reactotron-react-native";
// import { Icon } from "react-native-elements";
// import FastImage from "react-native-fast-image";
import { Icon, FastImage } from '@component'

export default class ImageViewerScreen extends Component {
  render() {
    const { navigation } = this.props;
    const listUrl = navigation.getParam("url", {});
    const index = navigation.getParam("index");
    const images = Array.from(listUrl, item => {
      return {
        url: item
      };
    });
    reactotron.log(images);
    return (
      <Modal
        visible={true}
        transparent={true}
        onRequestClose={() => {
          navigation.goBack();
        }}
      >
        <ImageViewer
          imageUrls={images}
          index={index}
          loadingRender={() => <ActivityIndicator />}
          renderImage={(props) => (
            <FastImage
              style={{flex: 1}}
              source={{
                uri: props.source.uri,
                // priority: FastImage.priority.normal
              }}
              resizeMode={'cover'}
            />
          )}
          enableSwipeDown={true}
          enablePreload={true}
          swipeDownThreshold={200}
          onSwipeDown={() => {
            navigation.goBack();
          }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 30,
            left: 10,
          }}
          onPress={() => navigation.goBack()}
        >
          <Icon.AntDesign name="arrowleft" size={30} color="#fff" />
        </TouchableOpacity>
      </Modal>
    );
  }
}
