import React, { Component } from 'react'
import {
    View, Text, StyleSheet,
    SafeAreaView,
    FlatList,
    RefreshControl,
    Image
} from 'react-native'
import { connect } from 'react-redux'
import {
    Block, WindsHeader,
    BackgroundHeader, Loading,
    FastImage,
} from '@app/components'
import R from '@R'
import theme from '@theme'
import Icon from "@component/Icon";
import Ripple from 'react-native-material-ripple';
import { SCREEN_ROUTER } from '@constant'
import NavigationUtil from '@app/navigation/NavigationUtil';
import LinearGradient from 'react-native-linear-gradient'
export class ClassItem extends Component {
    render() {
        const { item, index } = this.props
        return (
            <Block column style={styles._blockItem}>
                <Ripple rippleDuration={500}
                    rippleSequential={true}
                    onPress={() => {
                        NavigationUtil.navigate(SCREEN_ROUTER.CLASS_DETAIL, {
                            class: item
                        })
                    }}>
                    {this._renderTitle()}
                    <Block row style={{
                        paddingVertical: 10,
                        paddingLeft: 10,
                    }}>

                        <Block flex={1}>
                            <View style={{ flexDirection: "row" }}>
                                <FastImage source={R.images.ic_calendar}
                                    style={styles._icon} />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={
                                        [
                                            theme.fonts.regular16,
                                            {
                                                color: theme.colors.black2
                                            }
                                        ]}>{item.schedule}  {<Text>{item.time}</Text>}
                                    </Text>
                                    <Text style={
                                        [
                                            theme.fonts.regular16,
                                            {
                                                color: theme.colors.black2,
                                                marginTop: 10
                                            }
                                        ]}>{item.schedule}  {<Text>{item.time}</Text>}
                                    </Text>
                                </View>

                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                <FastImage source={R.images.ic_location_filled}
                                    style={styles._icon} />
                                <Text style={
                                    [
                                        theme.fonts.regular16,
                                        {
                                            color: theme.colors.black2,
                                            marginLeft: 15
                                        }
                                    ]}>{item.address}
                                </Text>
                            </View>
                        </Block>
                        <View style={{ justifyContent: "center" }}>
                            <Icon.MaterialIcons
                                color={theme.colors.gray}
                                name={'navigate-next'}
                                size={30}
                            />
                        </View>
                    </Block>
                </Ripple>
            </Block >
        )
    }

    _renderTitle() {
        return (
            <LinearGradient style={styles._viewTitle}
                colors={["#ff740d", "#f9ad2e"]}
                start={{ x: 0.7, y: 1 }} //transparent
                end={{ x: 0, y: 0.1 }}
            >
                <Text style={[theme.fonts.bold18, {
                    color: theme.colors.white
                }]}>{this.props.item.nameClass}</Text>
                <Text style={[theme.fonts.regular15, {
                    color: theme.colors.white,
                    marginTop: 5
                }]}>{this.props.item.date}</Text>
            </LinearGradient>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ClassItem)
const styles = StyleSheet.create({
    bgButton: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    arrow: {
        position: "absolute",
        right: 10,
        top: 25
    },
    _blockItem: {
        borderRadius: 5,
        backgroundColor: "white",
        marginBottom: 10,
        // borderWidth: 1,
        // borderColor: theme.colors.border,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    _viewTitle: {
        backgroundColor: theme.colors.activeScrollable,
        justifyContent: 'center',
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 5,

    },
    _icon: {
        width: 30,
        height: 30,
        tintColor: theme.colors.black2,
    }
});
