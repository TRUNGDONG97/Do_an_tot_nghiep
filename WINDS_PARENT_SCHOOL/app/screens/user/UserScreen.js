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
// import OneSignal from "react-native-onesignal";
import reactotron from 'reactotron-react-native';
import AsyncStorage from "@react-native-community/async-storage"
import { requestLogout } from "@app/constants/Api";
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
import { getUserInfo } from "../../redux/actions";
import { connect } from 'react-redux'

export class UserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            // isLoading: false,
        };
    }

    async componentDidMount() {
        this.props.getUserInfo();
    }

    render() {
        return (
            <Block >
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader
                        title={R.strings.user}
                    />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
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
        const { UserInfoState } = this.props
        // reactotron.log('UserInfoState',UserInfoState)
        if (UserInfoState.isLoading) return <Loading />;
        if (UserInfoState.error)
            return (
                <Error
                    onPress={() => {
                        this.props.getUserInfo();
                    }}
                />
            );
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
                            onRefresh={() => this.props.getUserInfo()}
                        />
                    }
                >
                    <View
                        style={styles._viewUser}
                    >
                        <Avatar
                            rounded
                            source={{
                                uri: UserInfoState.data.url_avatar
                                // uri:
                            }}
                            size={65}
                            renderPlaceholderContent={<ActivityIndicator />}
                            placeholderStyle={{ backgroundColor: "white" }}
                        />

                        <Block style={{ flex: 1, marginLeft: 15 }}>
                            <View style={{ flexDirection: "row", alignItems: "center",marginTop:10 }}>
                                <Text
                                    style={[theme.fonts.bold18, { flex: 1, color: theme.colors.primaryText }]}
                                    numberOfLines={1}
                                >
                                    {UserInfoState.data.name}
                                </Text>
                                <FastImage
                                    style={{ width: 20, height: 20, marginRight: 5 }}
                                    source={UserInfoState.data.sex==1? R.images.ic_male:R.images.ic_female}
                                />
                            </View>
                            <Text style={[theme.fonts.bold16, { color: theme.colors.black2, flex: 1,marginTop:5 }]}>
                                {UserInfoState.data.phone}
                            </Text>
                        </Block>
                    </View>
                    <View style={styles._viewInfo}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={[theme.fonts.bold16, { color: theme.colors.primaryText }]}>{R.strings.user_info}</Text>
                            <TouchableOpacity
                                onPress={() => NavigationUtil.navigate(SCREEN_ROUTER.CHANGE_USER_INFO)}
                            >
                                <Icon.FontAwesome size={25}
                                    name='edit'
                                    color={theme.colors.backgroundHeader} />
                            </TouchableOpacity>
                        </View>

                        {this._renderInfo('Email', UserInfoState.data.email)}
                        {this._renderInfo('Mssv', UserInfoState.data.mssv)}
                        {this._renderInfo('Ngày sinh', UserInfoState.data.birthday)}
                        {/* {this._renderInfo(R.strings.phone,  UserInfoState.data.phone)} */}
                        {this._renderInfo(R.strings.address, UserInfoState.data.address)}
                    </View>

                    <View style={styles._viewInfo}>
                        {this._renderOption(R.strings.change_pass, () => {
                            NavigationUtil.navigate(SCREEN_ROUTER.CHANGE_PASSWORD)
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
}

const styles = StyleSheet.create({
    _viewUser: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
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
const mapStateToProps = (state) => ({
    UserInfoState: state.userReducer,
})

const mapDispatchToProps = {
    getUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen)