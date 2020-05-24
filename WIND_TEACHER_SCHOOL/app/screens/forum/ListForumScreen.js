import React, { Component } from "react";
import {
    StyleSheet, View, ScrollView,
    Animated, Text, Image, FlatList, TouchableOpacity,
    RefreshControl
} from "react-native";
import { SearchBar } from "react-native-elements";
import theme from '@theme'
import R from '@R'
import Mockup from '@app/constants/Mockup'
import {
    PostItem,
    Loading,
    Error,
    Icon
} from '@component'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { SCREEN_ROUTER, STATUS_ACCESS, TYPE } from '@app/constants/Constant';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            refreshing: false,
            yScroll: new Animated.Value(0),
            currentOffset: 0,
            toValue: 0,
        };
    }


    options = [
        {
            uri: R.images.ic_post_report,
            title: 'Báo cáo bài viết',
            onPress: this._action
        },
        {
            uri: R.images.ic_post_answer,
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
    render() {
        const yScroll = this.state.yScroll;
        // console.log(yScroll)
        return (
            <View style={theme.styles.containter}>
                <Animated.View style={{ marginTop: yScroll }}>
                    <SearchBar
                        round
                        containerStyle={{
                            backgroundColor: theme.colors.white,
                            borderBottomColor: theme.colors.white,
                            borderTopColor: theme.colors.white,
                            // marginTop: 10,
                            marginHorizontal: 10
                        }}
                        inputContainerStyle={{
                            backgroundColor: theme.colors.white,
                            borderWidth: 1,
                            borderBottomWidth: 1,
                            borderColor: theme.colors.gray,
                            height: 40,
                            alignItems: "center"

                        }}
                        searchIcon={{ size: 22 }}
                        onChangeText={(text) => this.searchFilter(1, text)}
                        // onClear={text => this.searchFilterFunction('')}
                        placeholder={R.strings.article_title}
                        value={this.state.search}
                        inputStyle={[theme.fonts.regular14]}
                    />
                </Animated.View>
                {this._renderBody()}
                {/* <Animated.View style={{ marginTop: yScroll }}>
                    <TouchableOpacity style={styles._viewCreatePost}
                        onPress={() => {
                            NavigationUtil.navigate(SCREEN_ROUTER.CREATE_POST, { type: TYPE.CREATE_POST })
                        }}
                    >
                        <Icon.MaterialIcons name='add' color={theme.colors.white} size={25} />
                        <Text style={[theme.fonts.bold15,
                        {
                            marginLeft: 2, color: theme.colors.white
                        }]}>
                            {R.strings.post}</Text>
                    </TouchableOpacity>
                </Animated.View> */}
                <Animated.View style={{
                    position: 'absolute',
                    alignItems: 'center',
                    width: theme.dimension.width,
                    bottom: this.state.yScroll
                }}
                // isScrollUp={this.state.isScrollUp}
                >
                    <TouchableOpacity style={styles._viewCreatePost}
                        onPress={
                            () => NavigationUtil.navigate(SCREEN_ROUTER.CREATE_POST,{type:TYPE.CREATE_POST})
                        }
                    >
                        <Icon.MaterialIcons name="add" size={25} color={theme.colors.white} />
                        <Text> {R.strings.post}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
    _renderBody() {
        return (

            <FlatList
                contentContainerStyle={{ paddingBottom: 50 }}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                    // onRefresh={() => this.props.getNotification()}
                    />
                }
                onScroll={event => this._move(event)}
                showsVerticalScrollIndicator={false}
                data={Mockup.Post}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) =>
                    <PostItem item={item} index={index}
                        onPressComment={() => {
                            NavigationUtil.navigate(SCREEN_ROUTER.DETAIL_POST, {
                                post: item,
                                options: this.options
                            })
                        }}
                        onPressUser={() => {
                            NavigationUtil.navigate(SCREEN_ROUTER.MY_POST,
                                { status: STATUS_ACCESS.GUEST })
                        }}
                        options={this.options}
                    />
                }
            ></FlatList>


        )
    }
    async searchFilter(page, text) {
        this.setState({
            ...this.state,
            // isLoading: true,
            // error: null,
            search: text,
            // page: page
        })
        // payload = {
        //   page,
        //   text
        // };

        // try {
        //   var result = await Api.requestGetListWarranty(payload);
        //   if (result) {
        //     reactotron.log("result", result)
        //     this.setState({
        //       ...this.state,
        //       listProd: result.data.listWarranty,
        //       isLoading: false,
        //     })
        //   }
        // } catch (error) {
        //   this.setState({
        //     ...this.state,
        //     error: error,
        //     isLoading: false
        //   })
        // }
    }
}

const styles = StyleSheet.create({
    _viewCreatePost: {
        backgroundColor: theme.colors.activeScrollable,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    }
});