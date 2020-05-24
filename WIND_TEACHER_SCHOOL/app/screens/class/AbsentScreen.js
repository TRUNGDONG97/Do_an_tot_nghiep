import React, { Component } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet,
    TextInput,
    FlatList,
    ImageBackground,
    RefreshControl
} from 'react-native'
import { connect } from 'react-redux'
import {
    Block,
    WindsHeader,
    BackgroundHeader,
    Loading,
    FastImage,
    DropdownWindSky,
    Content,
    AppHeader,
    Checkbox
} from '@component'
import R from '@R'
import theme from '@theme'
import Icon from "@component/Icon";
import Mockup from '@app/constants/Mockup'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { SCREEN_ROUTER } from '@app/constants/Constant'
import LinearGradient from 'react-native-linear-gradient'
export class AbsentScreen extends Component {
    constructor(props) {
        var month = new Date().getMonth();
        super(props);
        this.state = {
            isRefresh: false,
        };
    }

    render() {
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader title={R.strings.absent} />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
    _renderBody() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ marginTop: 10, }}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefresh}
                        onRefresh={() => {
                            // this._onRefresh();
                        }}
                    />
                }>
                {this._renderTitle()}
                {this._renderNote()}
                <LinearGradient
                    style={styles._lgAbsent}
                    colors={["#ff740d", "#f9ad2e"]}
                    start={{ x: 0.7, y: 1 }} //transparent
                    end={{ x: 0, y: 0.1 }}>
                    <Text style={[theme.fonts.regular20, { color: theme.colors.white }]}>
                        {R.strings.absent}</Text>
                </LinearGradient>
                <FlatList
                    ListHeaderComponent={this._renderHeaderFlatList()}
                    showsVerticalScrollIndicator={false}
                    style={styles._vFlatList}
                    keyExtractor={(item, index) => index.toString()}
                    data={Mockup.ClassDetail.liststudentInClass}
                    renderItem={({ item, index, pos }) =>
                        <FlatListItem item={item} index={index} />
                    }
                />
            </ScrollView>

        )
    }
    _renderTitle() {
        return (
            <View
                style={styles._vUser}
            >
                {this._renderUserItem(R.strings.name, 'Trần Thị Tý')}
                {this._renderUserItem(R.strings.class, 'JAV')}
                {this._renderUserItem(R.strings.date_absent, '23/06/2019')}
            </View>
        )
    }
    _renderUserItem(title, text) {
        return (
            <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                <Text style={[theme.fonts.medium15, {
                    color: theme.colors.backgroundHeader,
                    width: 135
                }]}>{title}</Text>
                <Text style={[theme.fonts.medium15, {
                    color: theme.colors.backgroundHeader,
                    flex: 1,
                }]}>:  {text}</Text>

            </View>
        )
    }
    _renderHeaderFlatList() {
        return (
            <View style={[styles._vRowItem, { backgroundColor: "#E9FAFD" }]}>
                <View style={[styles._vItem, { flex: 1.5 }]}>
                    <Text style={[theme.fonts.bold12]}>{R.strings.number}</Text>
                </View>
                <View style={[styles._vItem, { flex: 5 }]}>
                    <Text style={[theme.fonts.bold12]}>{R.strings.name}</Text>
                </View>
                <View style={[styles._vItem, { flex: 1.5 }]}>
                    <Text style={[theme.fonts.bold12]}>{R.strings.off}</Text>
                </View>
                <View style={[styles._vItem, {
                    flex: 2,
                    borderRightWidth: null,
                    borderRightColor: null,
                }]}>
                    <Text style={[theme.fonts.bold12]}>{R.strings.comment} </Text>
                </View>
            </View>
        )
    }
    _renderNote() {
        return (
            <View style={styles._vNote}>
                <FastImage
                    style={styles._imgPen}
                    source={R.images.ic_ball_point_pen_filled}
                />
                <TextInput
                    // value={this.props.data.note}
                    onChangeText={value =>
                        this.setState({ ...this.state, note: value })
                    }
                    style={{ flex: 1, textAlignVertical: "top" }}
                    placeholder={R.strings.note_class}
                    multiline={true}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AbsentScreen)


class FlatListItem extends React.Component {
    constructor(props) {
        super(props)
        const { item, index } = this.props
        this.state = {
            item: item,
            index: index,
            absent: item.absent
        };
    }
    render() {
        const { item, index } = this.state
        return (
            <View style={[styles._vRowItem, { backgroundColor: (index + 1) % 2 == 0 ? "#E9FAFD" : null }]}>
                <View style={[styles._vItem, { flex: 1.5 }]}>
                    <Text style={[theme.fonts.regular12]}>{(index + 1)}</Text>
                </View>
                <View style={[styles._vItem, { flex: 5 }]}>
                    <Text style={[theme.fonts.regular12, { textAlign: "center" }]}>{item.studentName}</Text>
                </View>
                <View style={[styles._vItem, { flex: 1.5 }]}>

                    <Checkbox status={this.state.absent} size={18} />
                </View>
                <View style={[styles._vItem, {
                    flex: 2,
                    borderRightWidth: null,
                    borderRightColor: null,
                }]}>
                    <TouchableOpacity
                        onPress={() => {
                            NavigationUtil.navigate(SCREEN_ROUTER.REVIEW)
                        }}
                    >
                        <FastImage
                            style={{
                                width: 18,
                                height: 18,
                            }}
                            source={R.images.img_add} />
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: theme.colors.white,
        paddingBottom: 20,
        paddingHorizontal: 10
    },
    _vUser: {
        marginHorizontal: 15,
        marginTop: 10,
        backgroundColor: "white",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    block: {
        zIndex: 1000,
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        elevation: 6,
        padding: 10,
        width: width * 0.9,
        marginTop: 10
    },
    _vNote: {
        marginHorizontal: 15,
        height: 100,
        marginTop: 15,
        backgroundColor: theme.colors.white,
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    _imgPen: {
        alignItems: "flex-start",
        marginRight: 5,
        marginTop: 10,
        width: 15,
        height: 15,
        resizeMode: "contain"
    },
    divider: {
        width: 0.5,
        backgroundColor: "#07C9E7"
    },
    _vRowItem: {
        flex: 1,
        flexDirection: "row"
    },
    _vItem: {
        height: 38,
        borderRightWidth: 0.3,
        borderRightColor: "#07C9E7",
        justifyContent: "center",
        alignItems: "center"
    },
    _vItemTitle: {
        flexDirection: 'row',
        alignItems: "center",
        width: theme.dimension.width / 2,
    },
    bgButton: {
        marginTop: 20,
        height: 43,
        justifyContent: "center",
        alignItems: "center",
        width: theme.dimension.width
    },
    _vDiemDanh: {
        flex: 1,
        backgroundColor: theme.colors.white,
        width: theme.dimension.width * 0.9,
        justifyContent: "center",
        alignItems: "center"
    },
    _vAbsent: {
        justifyContent: "center",
        alignItems: "center",
        width: 18,
        height: 18,
        borderWidth: 0.5,
        borderColor: "#07C9E7"
    },
    _vFlatList: {
        marginHorizontal: 15,
        backgroundColor: theme.colors.white,
        marginBottom: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    _lgAbsent: {
        marginHorizontal: 15,
        alignItems: 'center',
        marginVertical: 15,
        borderRadius: 5,
        paddingVertical: 10
    }
});
