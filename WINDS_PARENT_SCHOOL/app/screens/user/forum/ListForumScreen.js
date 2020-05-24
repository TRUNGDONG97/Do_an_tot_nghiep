import React, { Component } from 'react'
import {
    Text,
    TouchableOpacity,
    FlatList, RefreshControl,
    StyleSheet,
    Animated
} from 'react-native'
import theme from '@theme'
import { connect } from 'react-redux'
import {
    Block,
    Search,
    PostItem
} from '@component'
import { Icon } from '@component'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { SCREEN_ROUTER } from '@app/constants/Constant'
import Mockup from '@app/constants/Mockup'


export class ListForumScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isRefresh: false,
            isModalVisible: false,
            yScroll: new Animated.Value(0),
            currentOffset: 0,
            toValue: 0
        }
    }
    render() {
        const yScroll = this.state.yScroll;
        return (
            <Block >
                <Animated.View style={{ marginTop: yScroll }}>
                    <Search placeHolder={'Tiêu đề bài viết'} />
                </Animated.View>
                {this._renderBody()}
                {this._renderButton()}
            </Block>
        )
    }
    options = [
        {
            uri: require('@app/assets/images/ic_post_report.png'),
            title: 'Báo cáo bài viết',
            onPress: this._action
        },
        {
            uri: require('@app/assets/images/ic_post_answer.png'),
            title: 'Trả lời',
            onPress: this._action
        }
    ]
    _action() {

    }
    offset = 0
    hide = '';
    _move = (event) => {
        // var offset = 0
        var currentOffset = event.nativeEvent.contentOffset.y;
        var direction = (currentOffset > this.offset && currentOffset > 0) ? 'down' : 'up';
        if (currentOffset - this.offset > 10) this.hide = true
        if (currentOffset - this.offset < -10) this.hide = false
        this.offset = currentOffset;

        if (direction == 'down' && this.hide) {
            Animated.spring(this.state.yScroll, {
                toValue: -60
            }).start()
        }
        if (direction == 'up' && !this.hide) {
            Animated.spring(this.state.yScroll, {
                toValue: 0
            }).start()
        }
    }
    _renderBody() {
        return (
            <FlatList
                onScroll={event => this._move(event)}
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefresh}
                        onRefresh={() => {
                            // this._onRefresh();
                        }}
                    />
                }
                keyExtractor={(item, index) => index.toString()}
                data={Mockup.ListPost}
                renderItem={({ item, pos }) => {
                    return (
                        <PostItem
                            item={item}
                            options={this.options}
                            onPressComment={() => {
                                NavigationUtil.navigate(SCREEN_ROUTER.DETAIL_POST, {
                                    item: item,
                                    options: this.options
                                })
                                // alert('hello')
                            }}
                        />
                    )
                }}
            />
        )
    }
    _renderButton() {
        return (
            <Animated.View style={[styles._vAnimated, {
                width: theme.dimension.width,
                bottom: this.state.yScroll
            }]}>
                <TouchableOpacity
                    onPress={() => {
                        NavigationUtil.navigate(SCREEN_ROUTER.CREATE_POST)
                    }}
                    style={styles._vButton}>
                    <Icon.FontAwesome
                        name="plus"
                        size={25}
                        color={theme.colors.white}
                    />
                    <Text style={[theme.fonts.bold18, styles._txtButton]}>Bài viết </Text>
                </TouchableOpacity>
            </Animated.View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ListForumScreen)

const styles = StyleSheet.create({
    _vAnimated: {
        position: 'absolute',
        alignItems: 'center',
    },
    _vButton: {
        alignSelf: 'center',
        backgroundColor: theme.colors.orange,
        width: 120,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        flexDirection: "row",
        position: "absolute",
        bottom: 10,
    },
    _txtButton: {
        color: theme.colors.white,
        marginVertical: 10,
        marginLeft: 5
    }
})