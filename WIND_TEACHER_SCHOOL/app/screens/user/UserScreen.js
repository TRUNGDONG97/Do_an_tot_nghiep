import React, { Component } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Alert,
    Image,
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    RefreshControl
} from 'react-native';
import { connect } from 'react-redux'
import theme from '@theme'
import R from '@R'
import NavigationUtil from '@app/navigation/NavigationUtil';
import { SCREEN_ROUTER, STATUS_ACCESS } from '@app/constants/Constant';
import DropdownAlertUtil from '@app/components/DropdownAlertUtil';
import OneSignal from "react-native-onesignal";
import reactotron from 'reactotron-react-native';
import { showConfirm } from '@app/utils/Alert';
import {
    WindsHeader,
    Block,
    Loading,
    Error,
    FastImage,
    BackgroundHeader,
    Icon
} from '@component'
import { Avatar } from "react-native-elements";
import AsyncStorage from "@react-native-community/async-storage"
import {requestLogout} from '@api'
export class UserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        };
    }
    componentDidMount() {

    }

    render() {
        return (

            <Block >
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader style={{ backgroundColor: "red" }}
                        title={R.strings.user} />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
    _renderBody() {
        return (
            <Block style={{
                backgroundColor: theme.colors.primary,
                marginHorizontal: 15,
                marginTop: 20,
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
                                style={[theme.fonts.bold18, { flex: 1 }]}
                                numberOfLines={1}
                            >
                                Lê Trung Đông
                            </Text>

                            <Text style={[theme.fonts.bold16, { color: theme.colors.black2, flex: 1 }]}>
                                0329563942
                        </Text>
                        </Block>
                    </View>
                    <View style={styles._viewInfo}>
                        {this._renderInfo(R.strings.name, 'Lê Trung Đông')}
                        {this._renderInfo('Email', 'letrungdong1997.bg@gmail.com')}
                        {this._renderInfo(R.strings.phone, '0329563942')}
                        {this._renderInfo(R.strings.address, 'số 29,Khương Hạ,Thanh Xuân,Hà Nội')}
                    </View>
                    <View style={styles._viewInfo}>
                        {this._renderOption(R.strings.update_user_info, () => {
                        })}
                        {this._renderOption(R.strings.my_post, () => {
                            NavigationUtil.navigate(SCREEN_ROUTER.MY_POST, { status: STATUS_ACCESS.USER })
                        })}
                        {this._renderOption(R.strings.change_pass, () => {
                            NavigationUtil.navigate(SCREEN_ROUTER.CHANGE_PASS)
                        })}
                        {this._renderOption(R.strings.logout, () => {
                            showConfirm('Thông báo', 'Bạn có chắc chắn muốn đăng xuất không?', this._logout)
                        })}
                    </View>
                </ScrollView>
            </Block>
        )

    }
    _logout = async () => {
        try {
            const response = await requestLogout();
            if (response) {
                await AsyncStorage.setItem("token", "");
                AsyncStorage.clear();
                NavigationUtil.navigate(SCREEN_ROUTER.AUTH_LOADING);
            }
        } catch (error) {
            Toast.show("Vui lòng thử lại", BACKGROUND_TOAST.FAIL);
            //showMessages(I18n.t("notification"), I18.t("error"));
        }
    };
    _renderInfo(field, info) {
        return (
            <View style={{
                justifyContent: "space-between",
                flexDirection: "row",
                paddingVertical: 10
            }}>
                <Text style={[theme.fonts.bold16, { flex: 1 }]} numberOfLines={1}>{field}</Text>
                <Text style={[theme.fonts.bold16, { flex: 2, paddingLeft: 15, textAlign: "right" }]}
                    numberOfLines={1}>{info}</Text>
            </View>
        )
    }
    _renderOption(title, onPress) {
        return (
            <TouchableOpacity style={{
                justifyContent: "space-between",
                flexDirection: "row",
                paddingVertical: 10
            }}
                onPress={onPress}
            >
                <Text style={theme.fonts.bold16}>{title}</Text>
                <Icon.AntDesign size={18}
                    name='right'
                    //type='feathericons'
                    color='black'
                // containerStyle={{backgroundColor:"red"}}
                />
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen)

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
        paddingVertical: 15,
        backgroundColor: theme.colors.white,
        paddingHorizontal: 15,
        borderRadius: 5
    }
})