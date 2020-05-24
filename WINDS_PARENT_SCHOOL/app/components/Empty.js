import React, { Component } from "react";
import { View, Text, Image, ScrollView, RefreshControl } from "react-native";
import theme from "@theme";

class Empty extends Component {
  render() {
    const { title, description, urlImage, onRefresh, isRefresh } = this.props

    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefresh}
            onRefresh={() => {
              onRefresh();
            }}
          />
        }
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: "5%"
          }}
        >
          <Image
            source={urlImage}
            style={{
              resizeMode: "contain",
              width: theme.dimension.width / 3,
              height: theme.dimension.width / 3
            }}
          />
          <Text
            style={[
              theme.fonts.bold16,
              {
                marginTop: 0,
                color: theme.colors.gray,
              }
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              theme.fonts.light16,
              {
                marginTop: 10,
                marginBottom: 10,
                color: theme.colors.gray,
                textAlign: "center"
              }
            ]}
          >
            {description}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

export default Empty;
