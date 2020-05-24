import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
  StyleSheet
} from "react-native";
import {
  WindsHeader,
  Block,
  Loading,
  Error,
  FastImage,
  BackgroundHeader,
  Icon,
  Empty
} from "@component";
import theme from "@theme";
import R from "@R";
import { connect } from "react-redux";
import Mockup from "@app/constants/Mockup";
import reactotron from "reactotron-react-native";
export class NotificationScreen extends Component {
  render() {
    return (
      <Block>
        <SafeAreaView style={theme.styles.containter}>
          <BackgroundHeader />
          <WindsHeader
            style={{ backgroundColor: "red" }}
            title={R.strings.notification}
          />
          {this._renderBody()}
        </SafeAreaView>
      </Block>
    );
  }
  _renderBody() {
    // reactotron.log(Mockup.Notification)
    if (Mockup.Notification.length == 0) return <Empty />;

    return (
      <Block
        style={{
          backgroundColor: theme.colors.primary,
          marginHorizontal: 15,
          marginTop: 20,
          borderRadius: 5
        }}
      >
        <FlatList
          contentContainerStyle={{ paddingBottom: 10 }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              // onRefresh={() => this.props.getNotification()}
            />
          }
          showsVerticalScrollIndicator={false}
          data={Mockup.Notification}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <NotiItem item={item} index={index} />
          )}
        />
      </Block>
    );
  }
}
export class NotiItem extends Component {
  render() {
    const { item, index } = this.props;
    return (
      <View style={styles._viewItem}>
        <View
          style={{
            width: 40,
            alignItems: "center",
            justifyContent: "center"
            // backgroundColor:"red"
          }}
        >
          <Icon.MaterialIcons size={40} name="notifications" color="#F17373" />
        </View>
        <Block style={{ marginLeft: 15 }}>
          <Text style={[theme.fonts.bold16]}>{item.title}</Text>

          <Text style={[theme.fonts.bold14, { color: theme.colors.black2 }]}>
            {item.datetime}
          </Text>
        </Block>
      </View>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationScreen);

const styles = StyleSheet.create({
  _viewItem: {
    flexDirection: "row",
    marginBottom: 10,
    paddingVertical: 10,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 15,
    borderRadius: 5
  }
});
