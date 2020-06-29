import React, { Component } from 'react'
import { View, Text, AppState } from 'react-native'
import { connect } from 'react-redux'
import AppNavigator from './AppNavigator'
import OneSignal from "react-native-onesignal";
import reactotron from 'reactotron-react-native'
import NavigationUtil from './NavigationUtil'
import { SCREEN_ROUTER, NOTIFICATION } from '@constant'
export class AppContainer extends Component {
    constructor(properties) {
        super(properties);
        OneSignal.init("b820e2f8-d15f-4c53-97eb-26716bab1b46");
        OneSignal.addEventListener("received", this.onReceived.bind(this));
        OneSignal.addEventListener("opened", this.onOpened.bind(this));
        OneSignal.addEventListener("ids", this.onIds.bind(this));
        // OneSignal.configure();
        // OneSignal.inFocusDisplaying(2);
        AppState.addEventListener("change", state => {
            console.log(state);
            // if (state == "active") {
            //   dismissAllNotification();
            // }
        });
    }

    componentWillUnmount() {
        OneSignal.removeEventListener("received", this.onReceived);
        OneSignal.removeEventListener("opened", this.onOpened);
        OneSignal.removeEventListener("ids", this.onIds);
    }

    onReceived(notification) {
        reactotron.log("Notification received: abc", notification);

    }

    onOpened(openResult) {
        reactotron.log("Message: ", openResult.notification.payload.body);
        reactotron.log("Data: ", openResult.notification.payload.additionalData);
        reactotron.log("isActive: ", openResult.notification.isAppInFocus);
        reactotron.log("openResult: ", openResult);
        const absent_class_id = openResult.notification.payload.additionalData.absent_class_id;
        const class_id = openResult.notification.payload.additionalData.class_id;
        reactotron.log("absent_class_id",absent_class_id);
        reactotron.log("class_id",class_id);
        let type =  openResult.notification.payload.additionalData.type;
        reactotron.log(type)
        if (type == NOTIFICATION.ABSENT_CLASS_END) {
            NavigationUtil.navigate(SCREEN_ROUTER.DETAIL_ABSENT, { absent_class_id });
        }else{
            NavigationUtil.navigate(SCREEN_ROUTER.CLASS_DETAIL,{class_id})
        }

        // return;
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
        reactotron.log("Device info: ", device);
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
