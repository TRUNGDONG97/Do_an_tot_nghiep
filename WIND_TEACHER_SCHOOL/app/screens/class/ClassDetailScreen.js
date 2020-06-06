import React, { Component } from 'react'
import {
    View, Text,
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    ScrollView,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import theme from '@theme'
import R from '@R'
import { SCREEN_ROUTER } from '@constant'
import {
    AppHeader, Block, Button,
    Empty, Checkbox, BackgroundHeader, WindsHeader, Icon, Loading
} from '@component'
import NavigationUtil from '@app/navigation/NavigationUtil'
import Mockup from '@app/constants/Mockup'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import reactotron from 'reactotron-react-native'
import Geolocation from '@react-native-community/geolocation';
import { showMessages } from '@app/utils/Alert'
import { createAbsent, cancelAbsent } from '@app/constants/Api'
import Toast, { BACKGROUND_TOAST } from "@app/utils/Toast";
export class ClassDetailScreen extends Component {
    constructor(props) {
        super(props)
        const item = this.props.navigation.getParam('class')
        this.state = {
            class_id: item.id,
            region: {
                longitude: null,
                latitude: null
            },
            isLoading: false

        }
    }
    _startAbsent = async (gps_latitude, gps_longitude) => {
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
        await Geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                this._startAbsent(latitude, longitude)
                reactotron.log(latitude, longitude)
                // return;
            },
            error => {
                reactotron.log(error, 'error getCurrentPosition')
                Toast.show("Chưa lấy được vị trí", BACKGROUND_TOAST.FAIL);
            },
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
    render() {
        const item = this.props.navigation.getParam('class')
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader title={item.Subject.subject_name} />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
    _renderBody() {
        const item = this.props.navigation.getParam('class')
        if (this.state.isLoading) return <Loading />;
        // reactotron.log('Student_classes', item.Student_classes)

        return (
            <ScrollView
                style={{ marginTop: 20, }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles._viewUser}>
                    {this._renderUserItem('Mã lớp học', item.class_code)}
                    {this._renderUserItem(R.strings.number_of_people, item.Student_classes.length)}
                    {this._renderUserItem("Mã môn học", item.Subject.subject_code)}
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 30,
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
                            showMessages("","Bạn chắc chắn hủy điểm danh",this._cancelAbsent()) 
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


                <LinearGradient
                    style={styles._lgListClass}
                    colors={["#ff740d", "#f9ad2e"]}
                    start={{ x: 0.7, y: 1 }} //transparent
                    end={{ x: 0, y: 0.1 }}>
                    <Text style={[theme.fonts.regular20, { color: theme.colors.white }]}>
                        {R.strings.list_class}</Text>
                </LinearGradient>


                <View style={{ paddingBottom: 20 }}>
                    <View
                        style={[styles._vColumn,
                        {
                            backgroundColor: theme.colors.backgroundBlue,
                            borderTopWidth: 0.5,
                            borderTopColor: theme.colors.gray,
                            marginTop: 10,
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
                        {/* <View style={[styles.rowTable, { flex: 1 }]}>
                        </View> */}
                    </View>
                    {
                        item.Student_classes.length == 0 ? (
                            <Empty description={'chưa có học sinh nào'}
                            />
                        ) : (

                                item.Student_classes.map((item, index) => (
                                    <View key={index.toString()} style={{ width: "100%" }}>
                                        {this._renderRowTable(item, index)}
                                    </View>
                                ))
                            )
                    }
                </View>
                {/* <Button title='Chia sẻ vị trí' style={{ alignSelf: 'center', marginBottom: 100, marginTop: 50, }} /> */}
            </ScrollView>
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
                        student_id: item.Student.id
                    })
                }}
            >
                <View style={[styles.rowTable, { flex: 1 }]}>
                    <Text style={theme.fonts.regular14}>{index + 1}</Text>
                </View>
                <View style={[styles.rowTable, { flex: 6 }]}>
                    <Text style={theme.fonts.regular14}
                        numberOfLines={2}
                    >{item.Student.name}</Text>
                </View>
                <View style={[styles.rowTable, { flex: 3 }]}>
                    <Text style={theme.fonts.regular14}>{item.Student.mssv}</Text>
                </View>
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
}

const mapStateToProps = (state) => ({
    classListState: state.classListReducer,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailScreen)
const styles = StyleSheet.create({
    _viewUser: {
        // justifyContent:'space-between',
        marginHorizontal: 20,
        // marginTop: 10,
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
        marginTop: 30,
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