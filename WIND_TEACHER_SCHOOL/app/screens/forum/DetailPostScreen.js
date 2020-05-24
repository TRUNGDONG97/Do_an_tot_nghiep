import React, { Component } from 'react'
import {
    View, Text,
    SafeAreaView,
    KeyboardAvoidingView,
    FlatList,
    RefreshControl,
    ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import {
    PostItem,
    CommentItem,
    AppHeader
} from '@component'
import R from '@R'
import theme from '@theme'
import { SCREEN_ROUTER, STATUS_ACCESS } from '@app/constants/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'

export class DetailPostScreen extends Component {
    render() {
        const post = this.props.navigation.getParam('post')
        return (
            <View style={{ flex: 1, }}>
                {/* <BackgroundHeader /> */}
                <AppHeader
                    title={post.account_name}
                    // top={15} bottom={15}
                    fontTitle={theme.fonts.bold18} />
                <SafeAreaView style={{ flex: 1 }}>
                    {this._renderBody()}
                </SafeAreaView>
            </View>
        )
    }
    _renderBody() {
        const post = this.props.navigation.getParam('post')
        const options = this.props.navigation.getParam('options')
        // console.log(post)
        return (

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
                        // marginHorizontal: 10
                    }}
                    ListHeaderComponent={<PostItem
                        item={post} fullText
                        options={options}
                    //  onPressUser={()=>{
                    //      NavigationUtil.navigate(SCREEN_ROUTER.MY_POST,
                    //         {status:STATUS_ACCESS.GUEST})
                    //  }}
                    />}
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

        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPostScreen)
