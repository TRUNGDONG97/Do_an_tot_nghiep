import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppNavigator from './AppNavigator'
import OneSignal from "react-native-onesignal";
import reactotron from 'reactotron-react-native'

export class AppContainer extends Component {
    constructor(properties) {
        super(properties);
        // OneSignal.init("6b13a5c4-571f-4244-b5f6-d220309f4f4d"); // android
        OneSignal.init("195238a2-829c-47fc-a581-dfbfea31b822"); // ios
        OneSignal.addEventListener("received", this.onReceived.bind(this));
        OneSignal.addEventListener("opened", this.onOpened.bind(this));
        OneSignal.addEventListener("ids", this.onIds.bind(this));
        OneSignal.configure();
    }

    componentWillUnmount() {
        OneSignal.removeEventListener("received", this.onReceived);
        OneSignal.removeEventListener("opened", this.onOpened);
        OneSignal.removeEventListener("ids", this.onIds);
    }

    onReceived(notification) {
        Reactotron.log("Notification received: ", notification);
    }

    onOpened(openResult) {
        Reactotron.log("Message: ", openResult.notification.payload.body);
        Reactotron.log("Data: ", openResult.notification.payload.additionalData);
        Reactotron.log("isActive: ", openResult.notification.isAppInFocus);
        Reactotron.log("openResult: ", openResult);
    }

    componentDidMount() {
        // userID = OneSignal.getPermissionSubscriptionState().getUserId();
        // reactotron.log('userID', userID)

    }

    render() {
        return (
            <AppNavigator
                ref={navigatorRef => NavigationUtil.setTopLevelNavigator(navigatorRef)}
            />
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
