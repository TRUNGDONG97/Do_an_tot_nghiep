import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import AppNavigator from './AppNavigator'
import OneSignal from "react-native-onesignal";
import reactotron from 'reactotron-react-native'
import NavigationUtil from './NavigationUtil'
export class AppContainer extends Component {
    constructor(properties) {
        super(properties);
        OneSignal.init("b820e2f8-d15f-4c53-97eb-26716bab1b46");
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
    async onIds(device) {
        if (device) {
            if (!!device.userId)
                await AsyncStorage.setItem("Device info: ", device.userId)
        }
        Reactotron.log("Device info: ", device);
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
