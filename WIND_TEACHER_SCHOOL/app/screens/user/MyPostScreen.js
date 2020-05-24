import React, { Component } from 'react'
import {
    View, Text,
    RefreshControl,
    FlatList, TouchableOpacity,
    SafeAreaView
} from 'react-native'
import { connect } from 'react-redux'
import { SearchBar } from "react-native-elements";
import theme from '@theme'
import R from '@R'
import Mockup from '@app/constants/Mockup'
import {
    PostItem,
    Loading,
    Error,
    Icon,
    AppHeader,
    Block
} from '@component'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { SCREEN_ROUTER, STATUS_ACCESS, TYPE } from '@app/constants/Constant';

export class MyPostScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            refreshing: false
        };
    }
    showModal = () => {
        this.refDialog.handleVisible()
    }
    optionsGuest = [
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
    optionsUser = [
        {

            uri: R.images.ic_edit,
            title: 'Sửa bài viết',
            onPress: this._editPost
        },

        {
            uri: R.images.ic_delete,
            title: 'Xóa bài viết',
            onPress: this._action
        }
    ]
    _editPost() {
        NavigationUtil.navigate(SCREEN_ROUTER.CREATE_POST, { type: TYPE.EDIT_POST })
        // this.showModal
    }
    _action() {
        // alert('sadas')
    }
    render() {
        const status = this.props.navigation.getParam('status')
        return (
            <Block>

                <AppHeader title={status == STATUS_ACCESS.USER ? R.strings.my_post : 'Khách'}
                    searchButton
                />
                <SafeAreaView style={theme.styles.containter}>ß
                    {this._renderBody()}
                </SafeAreaView>
            </Block >
        )
    }
    _renderBody() {
        const status = this.props.navigation.getParam('status')
        return (

            <FlatList
                contentContainerStyle={{
                    // flex: 1,
                    backgroundColor: theme.colors.white,
                    // alignItems: 'center',
                    paddingBottom: 50
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                    // onRefresh={() => this.props.getNotification()}
                    />
                }
                showsVerticalScrollIndicator={false}
                data={Mockup.Post}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) =>
                    <PostItem item={item} index={index}
                        onPressComment={() => {
                            NavigationUtil.navigate(SCREEN_ROUTER.DETAIL_POST, {
                                post: item,
                                options: status == STATUS_ACCESS.USER ? this.optionsUser : this.optionsGuest
                            })
                        }}
                        options={status == STATUS_ACCESS.USER ? this.optionsUser : this.optionsGuest}
                    />
                }
            />

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

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MyPostScreen)
