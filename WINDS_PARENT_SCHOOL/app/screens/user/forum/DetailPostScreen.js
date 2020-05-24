import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    RefreshControl,
    FlatList
} from 'react-native'
import {
    Block,
    WindsHeader,
    BackgroundHeader,
    RadioButton,
    Checkbox,
    Button,
    PostItem,
    CommentItem
} from '@component'
import R from '@R'
import theme from '@theme'
import reactotron from 'reactotron-react-native'

export default class DetailPostScreen extends Component {
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
    _renderBody() {
        const post = this.props.navigation.getParam('item')
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                    behavior={Platform.OS == "ios" ? "padding" : undefined}
                    enabled
                    keyboardVerticalOffset={100}
                >

                    <FlatList
                        contentContainerStyle={{
                            paddingBottom: 50,
                            backgroundColor: "white"
                            // marginHorizontal: 10
                        }}
                        ListHeaderComponent={<PostItem item={post} fullText options={this.options} />}
                        refreshControl={
                            <RefreshControl
                                refreshing={false}
                            // onRefresh={() => this.props.getNotification()}
                            />
                        }
                        showsVerticalScrollIndicator={false}
                        data={post.comment.length > 0 ? post.comment : []}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            // console.log(item)
                            <CommentItem item={item} index={index}
                                avartar_url={post.avartar_url}
                                account_name={post.account_name}
                                created_date={post.created_date} />
                        }
                    />
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
    render() {
        const item = this.props.navigation.getParam('item')
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader
                        title={item.account_name}
                    />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
}

const styles = StyleSheet.create({})
