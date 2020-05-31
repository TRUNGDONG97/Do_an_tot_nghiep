import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import AuthLoadingScreen from '../screens/auth/AuthLoadingScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen'
import UserScreen from '../screens/user/UserScreen'
import ClassScreen from '@screen/class/ClassScreen'
import AbsentScreen from '@screen/class/AbsentScreen'
import NotificationScreen from '@screen/notification/NotificationScreen'
import ListClassAbsentScreen from '@app/screens/Absent/ListClassAbsentScreen'
import ForumScreen from '@screen/forum/ForumScreen'
import DetailPostScreen from '@screen/forum/DetailPostScreen'
import MyPostScreen from '@screen/user/MyPostScreen'
import CreatePostScreen from '@screen/forum/CreatePostScreen'
import PostScreen from '@screen/forum/PostScreen'
import { SCREEN_ROUTER } from '@constant'
import R from '@R';
import theme from "@theme";
import { Icon, ImageViewerScreen } from "@component";
import ClassDetailScreen from '@screen/class/ClassDetailScreen';
import ChangePassWordScreen from '@screen/user/ChangePassWordScreen';
import CreateReviewScreen from '@screen/class/CreateReviewScreen'
import ChangeUserInfo from '@screen/user/ChangeUserInfo'
import DetailAbsentScreen from '@app/screens/Absent/DetailAbsentScreen'
import AbsentStudentScreen from '@app/screens/Absent/AbsentStudentScreen'
import {
    Image
} from "react-native";
const TabBarComponent = props => <BottomTabBar {...props} />;

const Auth = createStackNavigator({
    [SCREEN_ROUTER.LOGIN]: LoginScreen,
    [SCREEN_ROUTER.REGISTER]: RegisterScreen,
    [SCREEN_ROUTER.FORGOT_PASS]: ForgotPasswordScreen
}, {
    defaultNavigationOptions: {
        header: null
    }
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
        case SCREEN_ROUTER.LIST_ABSENT_CLASS: {
            iconName = "earth";
            return (
                <Icon.Fontisto name={iconName} size={iconSize} color={tintColor} outline />
            );
        }
        // case SCREEN_ROUTER.FORUM: {
        //     iconName = "earth";
        //     return (
        //         <Icon.Fontisto
        //             name={iconName}
        //             size={iconSize}
        //             color={tintColor}
        //             outline
        //         />
        //     );
        // }
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
        [SCREEN_ROUTER.LIST_ABSENT_CLASS]: {
            screen: ListClassAbsentScreen,
            title:"Điểm danh",
            navigationOptions: {
                tabBarLabel: "Điểm danh",
            },
        },
        // [SCREEN_ROUTER.FORUM]: {
        //     screen: ForumScreen,
        //     title: R.strings.forum,
        //     navigationOptions: {
        //         tabBarLabel: R.strings.forum,
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
    [SCREEN_ROUTER.IMAGE_VIEWERS]: ImageViewerScreen,
    [SCREEN_ROUTER.DETAIL_POST]: DetailPostScreen,
    [SCREEN_ROUTER.MY_POST]: MyPostScreen,
    [SCREEN_ROUTER.CREATE_POST]: CreatePostScreen,
    [SCREEN_ROUTER.POST]: PostScreen,
    [SCREEN_ROUTER.CLASS_DETAIL]: ClassDetailScreen,
    [SCREEN_ROUTER.ABSENT]: AbsentScreen,
    [SCREEN_ROUTER.CHANGE_PASS]: ChangePassWordScreen,
    [SCREEN_ROUTER.REVIEW]: CreateReviewScreen,
    [SCREEN_ROUTER.CHANGE_USER_INFO]: ChangeUserInfo,
    [SCREEN_ROUTER.DETAIL_ABSENT]: DetailAbsentScreen,
    [SCREEN_ROUTER.ABSENT_STUDENT]: AbsentStudentScreen,

},
    {
        defaultNavigationOptions: {
            header: null
        }
    })

export default createAppContainer(
    createSwitchNavigator({
        [SCREEN_ROUTER.AUTH_LOADING]: AuthLoadingScreen,
        [SCREEN_ROUTER.AUTH]: Auth,
        MainStack
    },
        {
            initialRouteName: SCREEN_ROUTER.AUTH_LOADING
        }
    )
)
