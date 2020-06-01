import React, { Component } from 'react'
import {
    View, Text, SafeAreaView,
    ScrollView, RefreshControl,
     StyleSheet, ActivityIndicator,
     TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { getDetailClass } from '@app/constants/Api'
import reactotron from 'reactotron-react-native';
import Toast, { BACKGROUND_TOAST } from "@app/utils/Toast";
import NavigationUtil from '@app/navigation/NavigationUtil';
import theme from '@theme'
import R from '@R'
import { SCREEN_ROUTER } from '@constant'
import {
    AppHeader, Block, Button,
    Empty, Checkbox, BackgroundHeader, WindsHeader, Icon, Loading, Error
} from '@component'
import { Avatar } from "react-native-elements";
import LinearGradient from 'react-native-linear-gradient'
import {absent} from '@api'
import Geolocation from '@react-native-community/geolocation';
export class ClassDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            isLoading: true,
            data: {},
            error: null
        };
    }
    componentDidMount() {
        const class_id = this.props.navigation.getParam('class_id')
        reactotron.log(class_id)
        this._getData(class_id);
    }
    async _getData(class_id) {
        this.setState({
            ...this.state,
            isLoading: true
        })
        try {
            const response = await getDetailClass(class_id);
            reactotron.log(response, 'response');
            this.setState({
                ...this.state,
                isLoading: false,
                data: response.data
            });
        } catch (error) {
            if (error.message == "Network Error") {
                Toast.show('Lỗi mạng', BACKGROUND_TOAST.FAIL);
            }
            Toast.show('Đã có lỗi xảy ra', BACKGROUND_TOAST.FAIL);
            //   reactotron.log(error, "error");
            this.setState({
                ...this.state,
                isLoading: false,
                error: error
            });
        }
    }
    _absent = async (gps_latitude, gps_longitude) => {
        const { class_id } = this.state
        if (!gps_latitude || !gps_longitude) {
            Toast.show('Chưa định vị được vị trí của máy', BACKGROUND_TOAST.SUCCESS);
            return;
        }
        const payload = {
            class_id,
            gps_latitude,
            gps_longitude
        }
        this.setState({
            ...this.state,
            isLoading: true
        });
        try {
            const response = await absent(payload);
            reactotron.log(response, 'res');
            Toast.show(response.message, BACKGROUND_TOAST.SUCCESS);
            this.setState({
                ...this.state,
                isLoading: false,
            });
            // NavigationUtil.navigate(SCREEN_ROUTER.DETAIL_ABSENT, {
            //     absent_class_id: response.data.classAbsent.id
            // })
        } catch (error) {
            if (error.message == "Network Error") {
                Toast.show(I18n.t("network_err"), BACKGROUND_TOAST.FAIL);
            }
            //showMessages(I18n.t("notification"),I18n.t("error") );
            Toast.show('Vui lòng thử lại', BACKGROUND_TOAST.FAIL)
            this.setState({
                ...this.state,
                isLoading: false
            });
            reactotron.log(error);
        }
    }
    getLocationUser = async () => {
        await Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                //  this.setState({
                //     ...this.state,
                //     region: {
                //         longitude: longitude,
                //         latitude: latitude,
                //       }
                // });
                // this._absent(latitude, longitude)
                reactotron.log(latitude, longitude)
                // return;
            },
            error => {
                reactotron.log(error, 'error getCurrentPosition')
                Toast.show("Chưa lấy được vị trí", BACKGROUND_TOAST.FAIL);
            },
        );
    }
    render() {
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader title={"Chi tiết lớp học"} />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
    _renderBody() {
        const { data, error, isLoading } = this.state
        const class_id = this.props.navigation.getParam('class_id')
        if (isLoading) return <Loading />;
        if (error)
            return (
                <Error
                    onPress={() => {
                        this.props.getListClassAction();
                    }}
                />
            );

        return (
            <ScrollView
                style={{ marginTop: 40 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => { this.props.getDetailClass(class_id) }}
                    />
                }
            >
             
                <View style={styles._viewInfo}>
                    <View style={{ flexDirection: 'row', alignItems: "center", marginBottom: 10 }}>
                        <Icon.AntDesign
                            name='infocirlceo'
                            color={theme.colors.backgroundHeader}
                            size={18} />
                        <Text style={[theme.fonts.bold18, { color: theme.colors.backgroundHeader, marginLeft: 8 }]}>
                            Thông tin lớp</Text>
                    </View>

                    {this._renderInfo('Môn học', data.Subject.subject_name)}
                    {this._renderInfo('Mã lớp', data.class_code)}
                    {this._renderInfo('Số tín chỉ', data.Subject.credit_hour)}
                    {this._renderInfo('Số tín học phí', data.Subject.coefficient)}

                </View>
                <View style={styles._viewInfo}>
                    <View style={{ flexDirection: 'row', alignItems: "center", marginBottom: 10 }}>
                        <Icon.AntDesign
                            name='infocirlceo'
                            color={theme.colors.backgroundHeader}
                            size={18} />
                        <Text style={[theme.fonts.bold18, { color: theme.colors.backgroundHeader, marginLeft: 8 }]}>
                            Thông tin giáo viên</Text>
                    </View>
                    <Avatar
                        // rounded
                        source={{
                            uri: data.Teacher.url_avatar
                            // uri:
                        }}
                        size={100}
                        renderPlaceholderContent={<ActivityIndicator />}
                        placeholderStyle={{ backgroundColor: theme.colors.primary }}
                        containerStyle={{ alignSelf: "center", borderRadius: 5 }}
                    />
                    {this._renderInfo('Tên giáo viên', data.Teacher.name)}
                    {this._renderInfo('Số điện thoại', data.Teacher.phone)}
                    {this._renderInfo('Email', data.Teacher.email)}
                </View>

                <TouchableOpacity style={{ flex: 1, borderRadius: 5 }}
                    onPress={() => {
                        this.getLocationUser();
                        // alert('dds')
                        // reactotron.log(this.state.region)
                    }}>
                    <LinearGradient
                        style={styles.bgButton}
                        colors={["#ff740d", "#F7D358"]}
                        start={{ x: 0.7, y: 1 }} //transparent
                        end={{ x: 0, y: 0.1 }}
                    >
                        <Text style={styles.text}>Điểm danh</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        )
    }
    _renderInfo(title, text) {
        return (
            <View style={{ flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5 }}>
                <Text style={[theme.fonts.medium15, {
                    color: theme.colors.backgroundHeader,
                    flex: 3
                }]}>{title}</Text>
                <Text style={[theme.fonts.medium15, {
                    color: theme.colors.backgroundHeader,
                    flex: 5,
                }]}>:  {text}</Text>

            </View>
        )
    }
    // _renderInfo(field, info) {
    //     return (
    //         <View style={{
    //             justifyContent: "space-between",
    //             flexDirection: "row",
    //             paddingVertical: 10
    //         }}>
    //             <Text style={[theme.fonts.regular15, { flex: 1, color: theme.colors.primaryText }]}>{field}</Text>
    //             <Text
    //                 style={[theme.fonts.regular15, { flex: 2, paddingLeft: 15, textAlign: "right" }]}
    //                 numberOfLines={1}
    //             >{info}</Text>
    //         </View>
    //     )
    // }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailScreen)
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
        marginHorizontal: 10
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
        marginHorizontal: 10
    },
    bgButton: {
        marginTop: 40,
        height: 43,
        marginHorizontal:20,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:4
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
})