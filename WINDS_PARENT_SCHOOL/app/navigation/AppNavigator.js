import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen'
import HomeScreen from '@screen/HomeScreen'
import UserScreen from '../screens/user/UserScreen'
import ForumScreen from '../screens/user/forum/ForumScreen'
import CreatePostScreen from '@screen/user/forum/CreatePostScreen'
import PostScreen from '@screen/user/forum/PostScreen'
import DetailPostScreen from '@screen/user/forum/DetailPostScreen'
import MyPostScreen from '@screen/user/forum/MyPostScreen'
import CreateReviewScreen from '@screen/user/CreateReviewScreen'
import ChangePassWordScreen from '@screen/user/ChangePassWordScreen'
import ClassScreen from '@screen/class/ClassScreen'
import FeeScreen from '@screen/fee/FeeScreen'
import PayFeeScreen from '@app/screens/fee/PayFeeScreen'
import StudyScreen from '@screen/study/StudyScreen'
import NotificationScreen from '@screen/notification/NotificationScreen'
import { SCREEN_ROUTER } from '@constant'
import R from '@R';
import theme from "@theme";
import { Icon, ImageViewerScreen } from '@component'

import {
    Image
} from "react-native";
const TabBarComponent = props => <BottomTabBar {...props} />;

const Auth = createStackNavigator({
    [SCREEN_ROUTER.LOGIN]: LoginScreen,
    [SCREEN_ROUTER.REGISTER]: RegisterScreen,
    [SCREEN_ROUTER.FORGOT_PASS]: ForgotPasswordScreen
})

const getTabBarIcon = (navigation, focused, tintColor) => {
    const { routeName } = navigation.state;
    let iconName = 'basket';
    let iconSize = focused ? 25 : 20
    switch (routeName) {
        case SCREEN_ROUTER.CLASS: {
            iconName = "school";
            return (
                <Icon.MaterialIcons
                    name={iconName}
                    size={iconSize}
                    color={tintColor}
                    outline
                />
            );
        }
        case SCREEN_ROUTER.FEE: {
            iconName = "money";
            return (
                <Icon.FontAwesome name={iconName} size={iconSize} color={tintColor} outline />
            );
        }
        case SCREEN_ROUTER.STUDY: {
            iconName = "wallet"
            break
        }
        case SCREEN_ROUTER.NOTIFICATION: {
            iconName = "bell"
            break
        }
        case SCREEN_ROUTER.USER: {
            iconName = "user"
            break
        }
    }
    return <Icon.SimpleLineIcons name={iconName} size={iconSize} color={tintColor} outline />
};


const Main = createBottomTabNavigator(
    {
        [SCREEN_ROUTER.CLASS]: {
            screen: ClassScreen,
            title: R.strings.class,
            navigationOptions: {
                tabBarLabel: R.strings.class,
            },
        },
        [SCREEN_ROUTER.STUDY]: {
            screen: StudyScreen,
            title: R.strings.study,
            navigationOptions: {
                tabBarLabel: R.strings.study,
            },
        },
        // [SCREEN_ROUTER.FEE]: {
        //     screen: FeeScreen,
        //     title: R.strings.fee,
        //     navigationOptions: {
        //         tabBarLabel: R.strings.fee,
        //     },
        // },
        [SCREEN_ROUTER.NOTIFICATION]: {
            screen: NotificationScreen,
            title: R.strings.notification,
            navigationOptions: {
                tabBarLabel: R.strings.notification,
            },
        },
        [SCREEN_ROUTER.USER]: {
            screen: UserScreen,
            title: R.strings.user,
            navigationOptions: {
                tabBarLabel: R.strings.user,
            },
        },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => getTabBarIcon(navigation, focused, tintColor),
        }),
        tabBarOptions: {
            activeBackgroundColor: theme.colors.bottombarBg,
            inactiveBackgroundColor: theme.colors.bottombarBg,
            inactiveTintColor: theme.colors.inactive,
            activeTintColor: theme.colors.active,
        },
        tabBarComponent: props => {
            return (
                <TabBarComponent
                    {...props}
                    onTabPress={props.onTabPress}
                    style={{
                        borderTopColor: theme.colors.borderTopColor,
                        backgroundColor: theme.colors.primary,
                        height: 58,
                    }}
                />
            );
        },
        initialRouteName: SCREEN_ROUTER.CLASS
    }
)

const MainStack = createStackNavigator({
    [SCREEN_ROUTER.MAIN]: Main,
    [SCREEN_ROUTER.PAY_FEE]: PayFeeScreen,
    [SCREEN_ROUTER.FORUM]: ForumScreen,
    [SCREEN_ROUTER.CREATE_POST]: CreatePostScreen,
    [SCREEN_ROUTER.POST]: PostScreen,
    [SCREEN_ROUTER.IMAGE_VIEWERS]: ImageViewerScreen,
    [SCREEN_ROUTER.DETAIL_POST]: DetailPostScreen,
    [SCREEN_ROUTER.MY_POST]: MyPostScreen,
    [SCREEN_ROUTER.CREATE_REVIEW]: CreateReviewScreen,
    [SCREEN_ROUTER.CHANGE_PASSWORD]: ChangePassWordScreen,
},
    {
        defaultNavigationOptions: {
            header: null
        }
    }
)


export default createAppContainer(
    createSwitchNavigator({
        [SCREEN_ROUTER.AUTH_LOADING]: AuthLoadingScreen,
        [SCREEN_ROUTER.AUTH]: Auth,
        MainStack,

    },
        {
            initialRouteName: SCREEN_ROUTER.AUTH_LOADING
        }
    )
)
