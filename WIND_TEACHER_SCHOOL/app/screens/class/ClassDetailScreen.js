import React, { Component } from 'react'
import {
    View, Text,
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    ScrollView,
    ImageBackground
} from 'react-native'
import { connect } from 'react-redux'
import theme from '@theme'
import R from '@R'
import { SCREEN_ROUTER } from '@constant'
import {
    AppHeader, Block, Button,
    Empty, Checkbox, BackgroundHeader, WindsHeader,Icon
} from '@component'
import NavigationUtil from '@app/navigation/NavigationUtil'
import Mockup from '@app/constants/Mockup'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'
import reactotron from 'reactotron-react-native'
export class ClassDetailScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false
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
                <Button style={{
                    alignSelf: 'center',
                    marginTop: 15,

                }}
                    title={R.strings.absent} right
                    onPress={() => NavigationUtil.navigate(SCREEN_ROUTER.ABSENT)}
                />
                {/* <View style={{ marginLeft: 40, flexDirection: 'row', marginTop: 10, alignItems: 'center', }}>
                    <Text style={theme.fonts.regular14}>{R.strings.class_off} </Text>
                    <Checkbox status={this.state.status} size={22} />
                </View> */}

                <LinearGradient
                    style={styles._lgListClass}
                    colors={["#ff740d", "#f9ad2e"]}
                    start={{ x: 0.7, y: 1 }} //transparent
                    end={{ x: 0, y: 0.1 }}>
                    <Text style={[theme.fonts.regular20, { color: theme.colors.white }]}>
                        {R.strings.list_class}</Text>
                </LinearGradient>
                <View style={{paddingBottom:20}}>
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
            <View
                style={[styles._vColumn, {
                    backgroundColor: index % 2 ? theme.colors.backgroundBlueItem : theme.colors.white
                }]}
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
            </View>
        )
    }
    _renderUserItem(title, text) {
        return (
            <View style={{ flexDirection: "row", paddingHorizontal: 10, paddingVertical: 5 }}>
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
    }
})