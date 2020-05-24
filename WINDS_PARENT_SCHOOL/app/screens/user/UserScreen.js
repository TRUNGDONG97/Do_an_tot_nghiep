import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import i18 from '@i18';
import theme from '@theme'
import R from '@R'
import NavigationUtil from '@app/navigation/NavigationUtil';
import { SCREEN_ROUTER } from '@app/constants/Constant';
import DropdownAlertUtil from '@app/components/DropdownAlertUtil';
import OneSignal from "react-native-onesignal";
import reactotron from 'reactotron-react-native';
import {
    WindsHeader,
    Block,
    Loading,
    Error,
    FastImage,
    BackgroundHeader,
    Icon,
} from '@app/components'
import { Avatar } from "react-native-elements";
import { showConfirm } from '@app/utils/Alert';

export default class UserScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            test: null
        };
    }
    async componentDidMount() {

    }
    _renderInfo(field, info) {
        return (
            <View style={{
                justifyContent: "space-between",
                flexDirection: "row",
                paddingVertical: 10
            }}>
                <Text style={[theme.fonts.regular15, { flex: 1, color: theme.colors.primaryText }]}>{field}</Text>
                <Text
                    style={[theme.fonts.regular15, { flex: 2, paddingLeft: 15, textAlign: "right" }]}
                    numberOfLines={1}
                >{info}</Text>
            </View>
        )
    }
    _renderOption(title, onPress) {
        return (
            <TouchableOpacity style={{
                justifyContent: "space-between",
                flexDirection: "row",
                paddingVertical: 5,
            }}
                onPress={onPress}
            >
                <Text style={[theme.fonts.regular15, { color: theme.colors.primaryText }]}>{title}</Text>
                <Icon.Entypo
                    name='chevron-small-right'
                    // type='feathericons'
                    color={theme.colors.backgroundHeader}
                    size={20} />
            </TouchableOpacity>
        )
    }
    _renderBody() {
        return (
            <Block style={{
                marginHorizontal: 15,
                marginTop: 30,
                borderRadius: 5
            }}>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 50 }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                        // onRefresh={() => this._onRefresh()}
                        />
                    }
                >
                    <View
                        style={styles._viewUser}
                    >
                        <Avatar
                            rounded
                            source={{
                                uri: "https://zicxa.com/hinh-anh/wp-content/uploads/2019/09/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-Luffy-m%C5%A9-r%C6%A1m-%C4%91%E1%BA%B9p-nh%E1%BA%A5t-24.jpg"
                            }}
                            size={65}
                            renderPlaceholderContent={<ActivityIndicator />}
                            placeholderStyle={{ backgroundColor: "white" }}
                        />

                        <Block style={{ flex: 1, marginLeft: 15 }}>
                            <Text
                                style={[theme.fonts.bold18, { flex: 1, color: theme.colors.primaryText }]}
                                numberOfLines={1}
                            >
                                Erik
                            </Text>

                            <Text style={[theme.fonts.bold16, { color: theme.colors.black2, flex: 1 }]}>
                                0329563942
                        </Text>
                        </Block>
                    </View>
                    <View style={styles._viewInfo}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={[theme.fonts.bold16, { color: theme.colors.primaryText }]}>{R.strings.user_info}</Text>
                            <TouchableOpacity>
                                <Icon.FontAwesome size={20}
                                    name='edit'
                                    type='feathericons'
                                    color={theme.colors.backgroundHeader}
                                    size={30} />
                            </TouchableOpacity>
                        </View>
                        {/* {this._renderInfo(R.strings.user_info, null)} */}
                        {this._renderInfo(R.strings.name, 'Nguyễn Tú')}
                        {this._renderInfo('Email', 'tund@gmail.com')}
                        {this._renderInfo(R.strings.phone, '0329563942')}
                        {this._renderInfo(R.strings.address, 'số 29,Khương Hạ,Thanh Xuân,Hà Nội')}
                    </View>
                    <View style={styles._viewInfo}>
                        <Text style={[theme.fonts.bold16, { color: theme.colors.primaryText, marginBottom: 5 }]}>{R.strings.forum}</Text>
                        {this._renderOption(R.strings.forum, () => {
                            NavigationUtil.navigate(SCREEN_ROUTER.FORUM)
                        })}
                        {this._renderOption(R.strings.my_post, () => {
                            NavigationUtil.navigate(SCREEN_ROUTER.MY_POST)
                        })}
                    </View>
                    <View style={styles._viewInfo}>
                        <Text style={[theme.fonts.bold16, { color: theme.colors.primaryText, marginBottom: 5 }]}>{R.strings.study}</Text>
                        {this._renderOption(R.strings.propose_ideas, () => {
                            NavigationUtil.navigate(SCREEN_ROUTER.CREATE_REVIEW)
                        })}
                        {this._renderOption(R.strings.exam, () => { })}
                    </View>
                    <View style={{ marginTop: 15, paddingHorizontal: 15 }}>
                        {this._renderOption(R.strings.change_pass, () => {
                            NavigationUtil.navigate(SCREEN_ROUTER.CHANGE_PASSWORD)
                        })}
                        {this._renderOption(R.strings.logout, () => {
                            showConfirm('Bạn có chắc chắn muốn đăng xuất không?')
                        })}
                    </View>
                </ScrollView>
            </Block>
        )
    }
    render() {
        return (
            <Block >
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader
                        style={{ backgroundColor: "red" }}
                        title={R.strings.user}
                    />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
            // <View style={{
            //     flex: 1,
            //     justifyContent: 'center',
            //     alignItems: 'center'
            // }}>
            //     <TouchableOpacity
            //         onPress={() => {

            //             OneSignal.getPermissionSubscriptionState((status) => {
            //                 userID = status.userId;
            //                 DropdownAlertUtil.showAlert("Thông báo", "DeviceID của OneSignal là : " + userID,()=>{
            //                     alert("tap action")
            //                 })
            //             });
            //         }}>
            //         <Text
            //             style = {theme}
            //         >{R.strings.update_user_info}</Text>
            //         <Image
            //             style={{
            //                 width: 100,
            //                 height: 100
            //             }}
            //             source={R.images.ic_home}
            //         />
            //     </TouchableOpacity>
            // </View>
        )
    }
}

const styles = StyleSheet.create({
    _viewUser: {
        alignItems: "center",
        flexDirection: "row",
        // marginTop: 10,
        // marginHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: theme.colors.white,
        paddingHorizontal: 15,
        borderRadius: 5,

        // flex: 1
    },
    _viewInfo: {
        marginTop: 15,
        // marginHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 8,
        backgroundColor: theme.colors.white,
        paddingHorizontal: 15,
        borderRadius: 5,
    }
})