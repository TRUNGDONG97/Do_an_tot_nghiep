import React, { Component } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import theme from '@theme'
import R from '@R'
import { SCREEN_ROUTER } from '@constant'
import {
    AppHeader, Block, Button,
    Empty, Checkbox, BackgroundHeader, WindsHeader, Icon, Loading, Error
} from '@component'
import NavigationUtil from '@app/navigation/NavigationUtil'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import reactotron from 'reactotron-react-native'
import { getStudentAbsent } from '@action'
export class AbsentStudentScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            class_id: this.props.navigation.getParam('class_id'),
            student_id: this.props.navigation.getParam('student_id')
        }
    }
    async componentDidMount() {
       await this.props.getStudentAbsent(this.state.class_id, this.state.student_id)
    }
    render() {
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader title={"Học sinh điểm danh"} />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
    _renderBody() {
        const { studentAbsentState } = this.props
        const { class_id, student_id } = this.state
        reactotron.log('class_id', class_id)
        reactotron.log('student_id', student_id)
        reactotron.log('studentAbsentState', studentAbsentState)
        if (studentAbsentState.isLoading) return <Loading />;
        if (studentAbsentState.error)
            return (
                <Error
                    onPress={() => {
                        this.props.getStudentAbsent(class_id, student_id);
                    }}
                />
            );
        return (
            <ScrollView
                style={{ marginTop: 20, }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.props.getStudentAbsent(class_id, student_id)}
                    />
                }
            >
                <View style={styles._viewUser}>
                    {this._renderUserItem('Họ và tên', studentAbsentState.student.name)}
                    {this._renderUserItem('MSSV', studentAbsentState.student.mssv)}
                    {this._renderUserItem('Ngày sinh', studentAbsentState.student.birthday.split("-").reverse().join("/"))}
                    {this._renderUserItem('Số điện thoại', studentAbsentState.student.phone)}
                    {/* {this._renderUserItem('Điểm giữa kì',
                        studentAbsentState.student.Student_classes[0].end_semester ?
                            studentAbsentState.student.Student_classes[0].end_semester : 'chưa có',)}
                    {this._renderUserItem('Điểm cuối kì',
                        studentAbsentState.student.Student_classes[0].end_semester ?
                            studentAbsentState.student.Student_classes[0].end_semester : 'chưa có')} */}
                    {this._renderUserItem("Số lượng điểm danh",
                        studentAbsentState.countAbsent + "/" + studentAbsentState.total)}
                </View>
                <LinearGradient
                    style={styles._lgListClass}
                    colors={["#ff740d", "#f9ad2e"]}
                    start={{ x: 0.7, y: 1 }} //transparent
                    end={{ x: 0, y: 0.1 }}>
                    <Text style={[theme.fonts.regular20, { color: theme.colors.white }]}>
                        Danh sách điểm danh </Text>
                </LinearGradient>
                <View
                    style={[styles._vColumn,
                    {
                        backgroundColor: theme.colors.backgroundBlue,
                        borderTopWidth: 0.5,
                        borderTopColor: theme.colors.gray,
                        marginTop: 20
                    }
                    ]}
                >
                    <View style={[styles.rowTable, { flex: 1 }]}>
                        <Text style={theme.fonts.regular14}>{R.strings.number}</Text>
                    </View>
                    <View style={[styles.rowTable, { flex: 3 }]}>
                        <Text style={theme.fonts.regular14}>Ngày </Text>
                    </View>
                    <View style={[styles.rowTable, { flex: 2 }]}>
                        <Text style={theme.fonts.regular14}>Thời gian</Text>
                    </View>
                    <View style={[styles.rowTable, { flex: 1 }]}>
                        <Text style={theme.fonts.regular14}></Text>
                    </View>

                </View>
                {
                    studentAbsentState.listAbsent.length == 0 ? (
                        <View style={[styles.rowTable, { flex: 1 }]}>
                            <Text style={theme.fonts.regular14}>Chưa điểm danh </Text>
                        </View>
                    ) : (

                            studentAbsentState.listAbsent.map((item, index) => (
                                <View key={index.toString()} style={{ width: "100%" }}>
                                    {this._renderRowTable(item, index)}
                                </View>
                            ))
                        )
                }
            </ScrollView>
        )
    }
    _renderUserItem(title, text, edit) {
        return (
            <View style={{ flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5 }}>
                <Text style={[theme.fonts.medium15, {
                    color: theme.colors.backgroundHeader,
                    flex: 1
                }]}>{title}</Text>
                <Text style={[theme.fonts.medium15, {
                    color: theme.colors.backgroundHeader,
                    flex: 1,
                }]}>:  {text}</Text>
                {edit &&
                    <View style={[styles.rowTable, { flex: 1 }]}>
                        <Icon.AntDesign
                            name='edit'
                            color={theme.colors.backgroundHeader}
                            size={16} />
                    </View>
                }
            </View>
        )
    }


    _renderRowTable(item, index) {
        return (
            <View
                style={[styles._vColumn, {
                    backgroundColor: index % 2 ? theme.colors.backgroundBlueItem : theme.colors.white
                }]}
            >
                <View style={[styles.rowTable, { flex: 1 }]}>
                    <Text style={theme.fonts.regular14}>{index + 1}</Text>
                </View>
                <View style={[styles.rowTable, { flex: 3 }]}>
                    <Text style={theme.fonts.regular14}
                        numberOfLines={2}
                    >{item.date_absent?item.date_absent.split("-").reverse().join("/"):'not'}</Text>
                </View>
                <View style={[styles.rowTable, { flex: 2 }]}>
                    <Text style={theme.fonts.regular14}>{item.time_absent? item.time_absent.slice(0, 5):'not'}</Text>
                </View>
                <View style={[styles.rowTable, { flex: 1 }]}>
                    <Icon.Octicons
                        name='primitive-dot'
                        color={item.status == 1 ? theme.colors.green : theme.colors.gray}
                        size={16} />
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    studentAbsentState: state.studentAbsentReducer
})

const mapDispatchToProps = {
    getStudentAbsent
}

export default connect(mapStateToProps, mapDispatchToProps)(AbsentStudentScreen)
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
    }
})