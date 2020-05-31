import React, { Component } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
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
import { getDetailAbsent } from '@action/'
export class DetailAbsentScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
            absent_class_id: this.props.navigation.getParam('absent_class_id')
        }
    }
    componentDidMount() {
        this.props.getDetailAbsent(this.state.absent_class_id)
    }
    render() {

        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader title={"Chi tiết điểm danh"} />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
    _renderBody() {
        const { detailAbsentState } = this.props
        // reactotron.log('dsds', detailAbsentState.listStudent)
        if (detailAbsentState.isLoading) return <Loading />;
        if (detailAbsentState.error)
            return (
                <Error
                    onPress={() => {
                        this.props.getDetailAbsent(this.state.absent_class_id);
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
                        onRefresh={() => { this.props.getDetailAbsent(this.state.absent_class_id) }}
                    />
                }
            >
                <View style={styles._viewUser}>
                    {this._renderUserItem('Tên lớp học', detailAbsentState.classes.Subject.subject_name)}
                    {this._renderUserItem('Mã lớp học',detailAbsentState.classes.class_code)}
                    {this._renderUserItem('Ngày điểm danh',
                        detailAbsentState.absentClass.date_absent.split("-").reverse().join("/"))}
                    {this._renderUserItem("Số lượng điểm danh",
                        detailAbsentState.countAbsent + "/" + detailAbsentState.total)}
                </View>
                <LinearGradient
                    style={styles._lgListClass}
                    colors={["#ff740d", "#f9ad2e"]}
                    start={{ x: 0.7, y: 1 }} //transparent
                    end={{ x: 0, y: 0.1 }}>
                    <Text style={[theme.fonts.regular20, { color: theme.colors.white }]}>
                        Danh sách điểm danh </Text>
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
                        <View style={[styles.rowTable, { flex: 1 }]}>
                            <Text style={theme.fonts.regular14}></Text>
                        </View>
                        {/* <View style={[styles.rowTable, { flex: 1 }]}>
                        </View> */}
                    </View>
                    {
                        detailAbsentState.total == 0 ? (
                            <Empty description={'chưa có học sinh nào '}
                            />
                        ) : (

                                detailAbsentState.listStudent.map((item, index) => (
                                    <View key={index.toString()} style={{ width: "100%" }}>
                                        {this._renderRowTable(item, index)}
                                    </View>
                                ))
                            )
                    }
                </View>
            </ScrollView>
        )
    }
    _renderUserItem(title, text) {
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

            </View>
        )
    }
    _renderRowTable(item, index) {
        const class_id=this.props.detailAbsentState.classes.id;
        return (
            <TouchableOpacity
                style={[styles._vColumn, {
                    backgroundColor: index % 2 ? theme.colors.backgroundBlueItem : theme.colors.white
                }]}
                onPress={() => {
                    NavigationUtil.navigate(SCREEN_ROUTER.ABSENT_STUDENT,
                        {
                            class_id,
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
                    >{item.name}</Text>
                </View>
                <View style={[styles.rowTable, { flex: 1 }]}>
                    {/* <Text style={theme.fonts.regular14}>{}</Text> */}
                    <Icon.Octicons
                        name='primitive-dot'
                        color={item.Absent_Students[0].status == 1 ? theme.colors.green : theme.colors.red}
                        size={16} />
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => ({
    detailAbsentState: state.detailAbsentReducer
})

const mapDispatchToProps = {
    getDetailAbsent
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailAbsentScreen)
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