import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import R from '@R'
import theme from '@theme'
import Icon from "@component/Icon";
import Ripple from 'react-native-material-ripple';
import { SCREEN_ROUTER } from '@constant'
import NavigationUtil from '@app/navigation/NavigationUtil';
import {
    Block, WindsHeader,
    BackgroundHeader, Loading,
    FastImage,
    Content,
    Empty
} from '@app/components'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import { showMessages } from '@app/utils/Alert'
// import DateUtil from '@app/utils/DateUtil'
export class AbsentItem extends Component {
    constructor(props) {
        super(props)
        const { item } = this.props
        this.state = {
            classes: item
        }
    }
    render() {
        const { item, index } = this.props
        return (
            <Block
                style={{
                    width: width * 0.95,
                    marginTop: 20,
                    flex: 1,
                    backgroundColor: "white",
                    borderRadius: 4
                }}
            >
                <Ripple rippleDuration={500}
                    rippleSequential={true}
                    onPress={() => {
                        // showMessages('dsd','fdsf')
                        NavigationUtil.navigate(SCREEN_ROUTER.DETAIL_CLASS, { class_id: item.id })
                    }}>
                    <Block style={[theme.styles.styleBlockHeader,
                    { alignItems: 'center', justifyContent: "center" }]}>
                        <Text style={[theme.fonts.bold14,
                        { color: "white", fontWeight: 'bold', fontSize: 16 }]}>
                            {item.Subject.subject_name}</Text>
                        <Text style={[theme.fonts.bold14,
                        { color: "white", fontWeight: 'bold', fontSize: 14 }]}>
                            {item.class_code}</Text>
                        <View style={{ position: 'absolute', right: 2 }}>
                            <Icon.Entypo
                                name='chevron-small-right'
                                color={theme.colors.white}
                                size={30} />
                        </View>
                    </Block>

                </Ripple>
                <View
                    style={[styles._vColumn,
                    {
                        backgroundColor: theme.colors.backgroundBlue,
                        borderTopWidth: 0.5,
                        borderTopColor: theme.colors.gray,
                    }
                    ]}
                >
                    <View style={[styles.rowTable, { flex: 1 }]}>
                        <Text style={theme.fonts.regular14}>STT</Text>
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
                    item.Absent_Classes.length == 0 ? (
                        <View style={{
                            flex: 1, borderWidth: 0.5,
                            borderColor: theme.colors.gray,
                            paddingVertical: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={theme.fonts.regular14}>Chưa có điểm danh </Text>
                        </View>
                    ) : (

                            item.Absent_Classes.map((item, index) => (
                                <View key={index.toString()} style={{ width: "100%" }}>
                                    {this._renderRowTable(item, index)}
                                </View>
                            ))
                        )
                }

            </Block>
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
                    >{item.date_absent.split("-").reverse().join("/")}</Text>
                </View>
                <View style={[styles.rowTable, { flex: 2 }]}>
                    <Text style={theme.fonts.regular14}>
                        {item.Absent_Students[0].time_absent ? item.Absent_Students[0].time_absent.slice(0, 5) : 'no'}
                    </Text>
                </View>
                <View style={[styles.rowTable, { flex: 1 }]}>
                    <Icon.Octicons
                        name='primitive-dot'
                        color={item.Absent_Students[0].status == 1 ? theme.colors.green : theme.colors.gray}
                        size={16} />
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AbsentItem)
const styles = StyleSheet.create({
    _vColumn: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderLeftWidth: 0.5,
        borderLeftColor: theme.colors.gray,
        borderBottomColor: theme.colors.gray,
        // marginHorizontal: 20,

    },
    rowTable: {
        // flex: 1,
        borderRightWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        borderRightColor: theme.colors.gray
    },
})