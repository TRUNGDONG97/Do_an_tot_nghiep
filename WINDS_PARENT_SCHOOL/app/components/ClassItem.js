import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    RefreshControl,
    Image,
} from 'react-native'
import { connect } from 'react-redux'
import {
    Block, WindsHeader,
    BackgroundHeader, Loading,
    FastImage,
    Content
} from '@app/components'
import R from '@R'
import theme from '@theme'
import Icon from "@component/Icon";
import Ripple from 'react-native-material-ripple';
import { SCREEN_ROUTER } from '@constant'
import NavigationUtil from '@app/navigation/NavigationUtil';
import LinearGradient from 'react-native-linear-gradient'

export default class ClassItem extends Component {
    render() {
        const { item, index } = this.props
        return (
            <Block
                style={{
                    width: width * 0.95,
                    marginTop: 10,
                    flex: 1,
                    backgroundColor: "white",
                    borderRadius: 4
                }}
            >
                <Ripple rippleDuration={500}
                    rippleSequential={true}
                    onPress={() => {
                        NavigationUtil.navigate(SCREEN_ROUTER.STUDY)
                    }}>
                    <Block style={[theme.styles.styleBlockHeader, { alignItems: 'center' }]}>
                        <Text style={(theme.fonts.bold16, { color: "white", fontWeight: 'bold', fontSize: 20 })}>{item.className}</Text>
                    </Block>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingVertical: 10, paddingHorizontal: 16, flex: 1 }}>
                            <Content
                                img={R.images.ic_calendar}
                                title1={"Thứ 3 18:00- 20:00"}
                                title2={"Thứ 3 18:00- 20:00"} />
                            <Content
                                img={R.images.ic_location}
                                title1={"Phòng 2 tầng 2 - CS1"} />
                        </View>
                        <View style={{ justifyContent: "center" }}>
                            <Icon.Entypo
                                name='chevron-small-right'
                                color={theme.colors.backgroundHeader}
                                size={30} />
                        </View>
                    </View>
                </Ripple>
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    _viewTitle: {
        backgroundColor: theme.colors.activeScrollable,
        justifyContent: 'center',
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 5,

    },
});
