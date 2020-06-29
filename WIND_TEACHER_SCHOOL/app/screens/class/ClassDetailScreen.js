import React, { Component } from 'react'
import {
    View, Text,
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    TextInput, RefreshControl,
} from 'react-native'
import { connect } from 'react-redux'
import theme from '@theme'
import R from '@R'
import { SCREEN_ROUTER } from '@constant'
import {
    AppHeader, Block, Button,
    Empty, Checkbox, BackgroundHeader,
    WindsHeader, Icon, Loading,
    ModalDialog, Error
} from '@component'
import NavigationUtil from '@app/navigation/NavigationUtil'
import Mockup from '@app/constants/Mockup'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import reactotron from 'reactotron-react-native'
import Geolocation from '@react-native-community/geolocation';
import { showMessages, showConfirm } from '@app/utils/Alert'
import { createAbsent, cancelAbsent } from '@app/constants/Api'
import Toast, { BACKGROUND_TOAST } from "@app/utils/Toast";
import wifi from 'react-native-android-wifi'
import { getDetailClass } from '@action'
export class ClassDetailScreen extends Component {
    constructor(props) {
        super(props)
        const class_id = this.props.navigation.getParam('class_id')
        this.state = {
            class_id,
            region: {
                longitude: null,
                latitude: null
            },
            isLoading: false,
            isRefresh: false
            // isModalVisible: false,
            // mid_semester: null,
            // end_semester: null,
            // index: null,
            // itemStudent: null
        }
    }
    componentDidMount() {
        this.props.getDetailClass(this.state.class_id)
    }
    // getWifiNetworksOnPress() {
    //     wifi.reScanAndLoadWifiList((wifiStringList) => {
    //         // reactotron.log(wifiStringList);
    //         var wifiArray = JSON.parse(wifiStringList);
    //         this.setState({
    //             ...this.state,
    //             wifiList: wifiArray,
    //             //   modalVisible: true
    //         });
    //     },
    //         (error) => {
    //             reactotron.log(error);
    //         }
    //     );
    // }
    // serviceCheckOnPress() {
    //     wifi.isEnabled(
    //         (isEnabled) => {
    //             this.setState({
    //                 ...this.state,
    //                 isWifiNetworkEnabled: isEnabled
    //             });
    //             // console.log(isEnabled);
    //         });
    // }
    _startAbsent = async (gps_latitude, gps_longitude, listNameWifi) => {
        const { class_id } = this.state
        if (!gps_latitude || !gps_longitude) {
            Toast.show('Chưa định vị được vị trí của máy', BACKGROUND_TOAST.FAIL);
            return;
        }
        const payload = {
            class_id,
            gps_latitude,
            gps_longitude,
            listNameWifi
        }
        try {
            const response = await createAbsent(payload);
            reactotron.log(response, 'res');
            Toast.show(response.message, BACKGROUND_TOAST.SUCCESS);
            this.setState({
                ...this.state,
                isLoading: false,
            });
            NavigationUtil.navigate(SCREEN_ROUTER.DETAIL_ABSENT, {
                absent_class_id: response.data.classAbsent.id
            })
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
        this.setState({
            ...this.state,
            isLoading: true,
        });
        await Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                wifi.isEnabled(
                    (isEnabled) => {
                        reactotron.log(isEnabled)
                        if (!isEnabled) {
                            Toast.show('Bạn chưa bật wifi', BACKGROUND_TOAST.FAIL);
                            return;
                        }

                        wifi.reScanAndLoadWifiList((wifiStringList) => {
                            // reactotron.log(wifiStringList);
                            var wifiArray = JSON.parse(wifiStringList);
                            // reactotron.log(wifiArray,'wifiArray')
                            var listNameWifi = []
                            for (let index = 0; index < wifiArray.length; index++) {
                                listNameWifi.push(wifiArray[index].SSID)
                            }
                            reactotron.log(latitude, longitude)
                            this._startAbsent(latitude, longitude, listNameWifi)
                        },
                            (error) => {
                                this.setState({
                                    ...this.state,
                                    isLoading: false
                                });
                                reactotron.log(error);
                                Toast.show("Chưa lấy danh sách wifi có thể kết nối", BACKGROUND_TOAST.FAIL);

                            }
                        );
                    });

                // this._startAbsent(latitude, longitude)
                // reactotron.log(latitude, longitude)
                // return;
            },
            error => {
                this.setState({
                    ...this.state,
                    isLoading: false
                });
                reactotron.log(error, 'error getCurrentPosition')
                Toast.show("Chưa lấy được vị trí bạn cần cho phép ứng dụng truy cập vị trí bạn", BACKGROUND_TOAST.FAIL);
            },
            { enableHighAccuracy: Platform.OS != 'android', timeout: 2000 }
        );
    }
    _cancelAbsent = async () => {
        const { class_id } = this.state
        this.setState({
            ...this.state,
            isLoading: true
        });
        try {
            const response = await cancelAbsent({ class_id });
            reactotron.log(response, 'res');
            Toast.show(response.message, BACKGROUND_TOAST.SUCCESS);
            this.setState({
                ...this.state,
                isLoading: false,
            });
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
    showModal = () => {
        // alert('dfdkf')
        this.refDialog.handleVisible()
    }
    render() {
        // const item = this.props.navigation.getParam('class')
        const { detailClassState } = this.props
        // reactotron.log(!detailClassState.classInfo,'check');
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader
                        title={detailClassState.classInfo ? detailClassState.classInfo.Subject.subject_name : 'Chi tiết lớp học'} />
                    {/* {this._renderModalPoint()} */}
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
    _renderBody() {
        // const item = this.props.navigation.getParam('class')
        const { detailClassState } = this.props
        if (this.state.isLoading || detailClassState.isLoading) return <Loading />;
        reactotron.log('Student_classes', detailClassState)
        if (detailClassState.error)
            return (
                <Error
                    onPress={() => {
                        this.props.getDetailClass(this.state.class_id);
                    }}
                />
            );
        // if (detailClassState.data.length == 0)
        //     return <Empty description={"Chưa có sinh viên nào"}
        //     />
        return (
           
            <View
                style={{
                    marginTop: 5,
                    flex: 1,
                    // paddingBottom: 20
                }}
        
            >

                <View style={styles._viewUser}>
                    {this._renderUserItem('Mã lớp học',
                       detailClassState.classInfo? detailClassState.classInfo.class_code:'')}
                    {this._renderUserItem(R.strings.number_of_people, detailClassState.listStudent.length)}
                    {this._renderUserItem("Mã môn học",
                        detailClassState.classInfo?detailClassState.classInfo.Subject.subject_code:'')}
                    {this._renderUserItem("Số điểm danh",
                        detailClassState.totalAbsent?detailClassState.totalAbsent:'')}
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 15,
                }}>
                    <TouchableOpacity style={{ flex: 1, marginHorizontal: 20, borderRadius: 5 }}
                        onPress={() => {
                            this.getLocationUser();
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

                    <TouchableOpacity style={{ flex: 1, marginHorizontal: 20, borderRadius: 5 }}
                        onPress={() => {
                            showConfirm("", "Bạn chắc chắn hủy điểm danh", this._cancelAbsent)
                        }}
                    >
                        <LinearGradient
                            style={styles.bgButton}
                            colors={["#FE2E2E", "#F5A9A9"]}
                            start={{ x: 0.7, y: 1 }} //transparent
                            end={{ x: 0, y: 0.1 }}
                        >
                            <Text style={styles.text}>Huỷ</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    {/* <Button style={{
                        alignSelf: 'center',
                        flex: 1,
                        marginHorizontal:20
                    }}
                        title={R.strings.absent} 
                        onPress={() => {
                            this.getLocationUser();
                            // reactotron.log(this.state.region)
                        }}
                    /> */}

                </View>


                {/* <LinearGradient
                    style={styles._lgListClass}
                    colors={["#ff740d", "#f9ad2e"]}
                    start={{ x: 0.7, y: 1 }} //transparent
                    end={{ x: 0, y: 0.1 }}>
                    <Text style={[theme.fonts.regular18, { color: theme.colors.white }]}>
                        {R.strings.list_class}</Text>
                </LinearGradient> */}

                <ScrollView
                    contentContainerStyle={{
                        width: 500,
                        // flex: 1
                        // backgroundColor:'red'
                        paddingBottom: 10,
                        marginTop: 10,

                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <ScrollView style={{ paddingBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <View
                            style={[styles._vColumn,
                            {
                                backgroundColor: theme.colors.backgroundBlue,
                                borderTopWidth: 0.5,
                                borderTopColor: theme.colors.gray,
                                marginTop: 10
                            }
                            ]}
                        >
                            <View style={[styles.rowTable, { flex: 1 }]}>
                                <Text style={theme.fonts.regular14}>{R.strings.number}</Text>
                            </View>
                            <View style={[styles.rowTable, { flex: 6 }]}>
                                <Text style={theme.fonts.regular14}>{R.strings.name}</Text>
                            </View>
                            <View style={[styles.rowTable, { flex: 3 }]}>
                                <Text style={theme.fonts.regular14}>MSSV</Text>
                            </View>
                            <View style={[styles.rowTable, { flex: 3 }]}>
                                <Text style={theme.fonts.regular14}>Điểm danh</Text>
                            </View>
                            {/* <View style={[styles.rowTable, { flex: 2 }]}>
                                <Text style={theme.fonts.regular14}>Giữa kì</Text>
                            </View>
                            <View style={[styles.rowTable, { flex: 2 }]}>
                                <Text style={theme.fonts.regular14}>Cuối kì</Text>
                            </View> */}
                            {/* <View style={[styles.rowTable, { flex: 1 }]}>
                            </View> */}
                        </View>
                        {
                            detailClassState.listStudent.length == 0 ? (
                                <Empty description={'chưa có học sinh nào'}
                                />
                            ) : (

                                    detailClassState.listStudent.map((item, index) => (
                                        <View key={index.toString()} style={{ width: "100%" }}>
                                            {this._renderRowTable(item, index)}
                                        </View>
                                    ))
                                )
                        }

                    </ScrollView>
                </ScrollView>
            </View>
        )
    }

    _renderRowTable(item, index) {
        return (
            <TouchableOpacity
                style={[styles._vColumn, {
                    backgroundColor: index % 2 ? theme.colors.backgroundBlueItem : theme.colors.white
                }]}
                onPress={() => {
                    NavigationUtil.navigate(SCREEN_ROUTER.ABSENT_STUDENT, {
                        class_id: this.state.class_id,
                        student_id: item.id
                    })
                }}
            >
                <View style={[styles.rowTable, { flex: 1 }]}>
                    <Text style={theme.fonts.regular14}>{index + 1}</Text>
                </View>
                <View style={[styles.rowTable, { flex: 6 }]}>
                    <Text style={theme.fonts.regular14}
                        numberOfLines={2}
                    >{item.first_name + " " + item.last_name}</Text>
                </View>
                <View style={[styles.rowTable, { flex: 3 }]}>
                    <Text style={theme.fonts.regular14}>{item.mssv}</Text>
                </View>
                <View style={[styles.rowTable, { flex: 3 }]}>
                    <Text style={theme.fonts.regular14}>
                        {item.count ? item.count : 0}</Text>
                </View>
                {/* <View style={[styles.rowTable, { flex: 2 }]}>
                    <Text style={theme.fonts.regular14}>
                        {item.end_semester ? item.end_semester : null}</Text>
                </View> */}
                {/* <TouchableOpacity style={[styles.rowTable, { flex: 1 }]}
                    onPress={() => {
                        this.setState({
                            ...this.state,
                            mid_semester: item.mid_semester,
                            end_semester: item.end_semester,
                            index: index,
                            itemStudent: item
                        })
                        this.showModal()
                    }}
                >
                    <Icon.Feather
                        name='edit'
                        color={theme.colors.backgroundHeader}
                        size={20} />
                </TouchableOpacity> */}
                {/* <View style={[styles.rowTable, { flex: 1 }]}>
                    <Icon.AntDesign
                        name='infocirlce'
                        color={theme.colors.blue}
                        size={16} />
                </View> */}
            </TouchableOpacity>
        )
    }
    _renderUserItem(title, text) {
        return (
            <View style={{ flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5, marginLeft: 20 }}>
                <Text style={[theme.fonts.medium15, {
                    color: theme.colors.backgroundHeader,
                    width: 120
                }]}>{title}</Text>
                <Text style={[theme.fonts.medium15, {
                    color: theme.colors.backgroundHeader,
                    flex: 1,
                }]}>:  {text}</Text>

            </View>
        )
    }
    _renderModalPoint() {
        return (
            <ModalDialog ref={(ref) => this.refDialog = ref}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{
                        backgroundColor: theme.colors.white,
                        marginHorizontal: 20,
                        paddingHorizontal: 10
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: 'space-between',
                            marginVertical: 10,

                        }}>
                            <Text style={[theme.fonts.regular20,

                            ]}>Sửa điểm</Text>
                            <TouchableOpacity onPress={this.showModal}>
                                <Icon.FontAwesome
                                    name='close'
                                    // type='feathericons'
                                    color={theme.colors.black}
                                    size={25} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 1, width: '100%', backgroundColor: 'black' }} />
                        <Text style={[theme.fonts.regular16, { marginTop: 5 }]}>
                            Họ tên : {this.state.itemStudent ? this.state.itemStudent.Student.name : null}
                        </Text>
                        <Text style={[theme.fonts.regular16, { marginTop: 5 }]}>
                            Mssv : {this.state.itemStudent ? this.state.itemStudent.Student.mssv : null}
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%', height: 40,
                            alignItems: "center",
                            marginTop: 20
                        }}>
                            <Text style={[theme.fonts.regular16, { marginRight: 30 }]}>
                                Điểm giữa kì:
                            </Text>
                            <TextInput
                                value={this.state.mid_semester}
                                onChangeText={text => this.setState({
                                    ...this.state,
                                    mid_semester: text
                                })}
                                autoCapitalize="none"
                                keyboardType="number-pad"
                                clearButtonMode="while-editing"
                                returnKeyType="next"
                                placeholder="Điểm giữa kì"
                                style={{
                                    flex: 1,
                                    borderWidth: 0.5,
                                    borderColor: 'black',
                                    borderRadius: 3,
                                    textAlign: 'center'
                                }}
                            >
                            </TextInput>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%', height: 40,
                            alignItems: "center",
                            marginTop: 20
                        }}>
                            <Text style={[theme.fonts.regular16, { marginRight: 30 }]}>
                                Điểm cuối kì:
                            </Text>
                            <TextInput
                                value={this.state.end_semester}
                                onChangeText={text => this.setState({
                                    ...this.state,
                                    end_semester: text
                                })}
                                autoCapitalize="none"
                                keyboardType="number-pad"
                                clearButtonMode="while-editing"
                                returnKeyType="next"
                                placeholder="Điểm cuối kì"
                                style={{
                                    flex: 1,
                                    borderWidth: 0.5,
                                    borderColor: 'black',
                                    borderRadius: 3,
                                    textAlign: "center"
                                }}
                            >
                            </TextInput>
                        </View>
                        <View
                            style={{
                                marginTop: 20,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginHorizontal: 20,
                                marginBottom: 20
                            }}
                        >
                            <View />
                            <TouchableOpacity
                                onPress={() => {
                                    alert(this.state.mid_semester + this.state.end_semester)
                                }}
                            >
                                <Text style={[theme.fonts.regular18, { color: 'green' }]}>Sửa điểm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ModalDialog>
        )
    }
}

const mapStateToProps = (state) => ({
    // classListState: state.classListReducer,
    detailClassState: state.detailClassReducer,
})

const mapDispatchToProps = {
    getDetailClass
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailScreen)
const styles = StyleSheet.create({
    _viewUser: {
        // justifyContent:'space-between',
        marginHorizontal: 20,
        // marginTop: 10,
        // width:theme.dimension.width*0.9,
        backgroundColor: theme.colors.white,
        paddingVertical: 5,
        // alignItems:'center',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    _viewHeader: {
        marginHorizontal: 20,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        borderRadius: 5
    },
    rowTable: {
        // flex: 1,
        borderRightWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRightColor: theme.colors.gray
    },
    _vColumn: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderLeftWidth: 0.5,
        borderLeftColor: theme.colors.gray,
        borderBottomColor: theme.colors.gray,
        marginHorizontal: 20,

    },
    bgButton: {
        marginTop: 20,
        height: 43,
        width: theme.dimension.width
    },
    _vDiemDanh: {
        flex: 1,
        backgroundColor: theme.colors.white,
        // width: theme.dimension.width * 0.9,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20
    },
    _lgListClass: {
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        borderRadius: 5
    },
    text: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    bgButton: {
        height: 43,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
        flexDirection: 'row',
    }
})