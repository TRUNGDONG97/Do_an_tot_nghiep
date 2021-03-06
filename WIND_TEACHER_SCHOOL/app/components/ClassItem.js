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
                    marginTop: 20,
                    flex: 1,
                    backgroundColor: "white",
                    borderRadius: 4
                }}
            >
                <Ripple rippleDuration={500}
                    rippleSequential={true}
                    onPress={() => {
                        NavigationUtil.navigate(SCREEN_ROUTER.CLASS_DETAIL, { class_id: item.id })
                    }}>
                    <Block style={[theme.styles.styleBlockHeader, { alignItems: 'center' }]}>
                        <Text style={(theme.fonts.bold16,
                        {
                            color: "white", fontWeight: 'bold', fontSize: 20
                        })}>{item.Subject.subject_name}</Text>
                        <Text style={(theme.fonts.bold16,
                        {
                            color: "white", fontWeight: 'bold', fontSize: 16
                        })}>{item.class_code}</Text>
                    </Block>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingVertical: 10, paddingHorizontal: 16, flex: 1 }}>
                            <Content
                                img={R.images.ic_calendar}
                                title1={item.Schedule_classes[0].schedule}
                                title2={item.Schedule_classes[1] ? item.Schedule_classes[1].schedule : null} />
                            {/* <Content
                                img={R.images.ic_location}
                                title1={item.Schedule_classes[0].room_name}
                                title2={item.Schedule_classes[1] ? item.Schedule_classes[1].room_name : null}
                            /> */}
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
