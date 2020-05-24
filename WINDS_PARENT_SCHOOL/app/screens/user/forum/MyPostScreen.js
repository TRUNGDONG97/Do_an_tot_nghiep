import React, { Component } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    RefreshControl
} from 'react-native'
import { connect } from 'react-redux'
import {
    Block,
    WindsHeader,
    BackgroundHeader,
    PostItem
} from '@component'
// import ModalDialog from '@app/components/ModalDialog'
import R from '@R'
import theme from '@theme'
import { Icon, RadioButton, Checkbox } from '@component'
import { TOPIC, CATEGORY } from '@constant'
import ModalDialog from '@app/components/ModalDialog'
import Mockup from '@app/constants/Mockup'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { SCREEN_ROUTER } from '@app/constants/Constant'

export class MyPostScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalVisible: false,
            topic: 1,
            category: 1,
            class1: false,
            class2: false,
            class3: false
        }
    }
    render() {
        const title = this.props.navigation.getParam('title')
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader
                        showFilter
                        onPress={this._showModal}
                        title={title ? title : R.strings.my_post} />
                    {this._renderModalFilter()}
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
    options = [
        {
            uri: require('@app/assets/images/ic_post_report.png'),
            title: 'Sửa bài viết',
            onPress: this._editPost
        },
        {
            uri: require('@app/assets/images/ic_post_answer.png'),
            title: 'Xoá bài viết',
        }
    ]
    _editPost() {
        NavigationUtil.navigate(SCREEN_ROUTER.CREATE_POST, { type: 1 })
        // this.showModal
    }
    _showModal = () => {
        this.refDialog.handleVisible()
    }
    _renderBody() {
        const title = this.props.navigation.getParam('title')
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 5 }}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefresh}
                        onRefresh={() => {
                            // this._onRefresh();
                        }}
                    />
                }
                keyExtractor={(item, index) => index.toString()}
                data={Mockup.MyListPost}
                renderItem={({ item, pos }) => {
                    return <PostItem
                        item={item}
                        onPressComment={() => {
                            NavigationUtil.navigate(SCREEN_ROUTER.DETAIL_POST, { item: item })
                        }}
                        options={this.options}
                    />;
                }}
            />
        )
    }
    _renderModalFilter() {
        return (
            <ModalDialog ref={(ref) => this.refDialog = ref}>
                <View style={styles._viewModal}>
                    <View style={styles._vContainer}>
                        <View style={styles._vTitel}>
                            <Text style={[theme.fonts.bold16]}>{R.strings.filter_post}</Text>
                            <TouchableOpacity onPress={this._showModal}>
                                <Icon.FontAwesome
                                    name='close'
                                    color={theme.colors.black}
                                    size={25} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 1, backgroundColor: theme.colors.black }} />
                        <View style={{ paddingHorizontal: 15 }}>
                            {this._renderTopic()}
                            {this._renderCategory()}
                            {this._renderClass()}
                        </View>
                    </View>
                </View>
            </ModalDialog>
        )
    }
    _renderTopic() {
        return (
            <View style={styles._vTopic}>
                <Text style={[theme.fonts.regular16]}>Chủ đề</Text>
                <RadioButton
                    size={8}
                    title={'Chủ đề 1'}
                    status={this.state.topic == 1}
                    onPress={() => {
                        this.setState({
                            topic: 1
                        }, () => { alert("Chủ đề " + this.state.topic) })
                    }}
                />
                <RadioButton
                    size={8}
                    title={'Chủ đề 2'}
                    status={this.state.topic == 2}
                    onPress={() => {
                        this.setState({
                            topic: 2
                        }, () => { alert("Chủ đề " + this.state.topic) })
                    }}
                />
            </View>
        )
    }
    _renderCategory() {
        return (
            <View>
                <Text style={[theme.fonts.regular16]}>Danh mục</Text>
                <View style={styles._vCategory}>
                    <RadioButton
                        title={'Danh mục 1'}
                        size={8}
                        status={this.state.category == 1}
                        onPress={() => {
                            this.setState({
                                category: 1
                            }, () => { alert("Danh mục " + this.state.category) })
                        }}

                    />
                    <RadioButton
                        title={'Danh mục 2'}
                        size={8}
                        status={this.state.category == 2}
                        onPress={() => {
                            this.setState({
                                category: 2
                            }, () => { alert("Danh mục " + this.state.category) })
                        }}
                    />
                    <RadioButton
                        title={'Danh mục 3'}
                        size={8}
                        status={this.state.category == 3}
                        onPress={() => {
                            this.setState({
                                category: 3
                            }, () => { alert("Danh mục " + this.state.category) })
                        }}
                    />
                </View>
            </View>
        )
    }
    _renderClass() {
        const { class1, class2, class3 } = this.state
        return (
            <View style={styles._vClass}>
                {/* {this._handleCheckBox()} */}
                <Checkbox
                    title={'Lớp học 1'}
                    size={15}
                    status={this.state.class1}
                    onPress={() => {
                        this.setState({
                            class1: !this.state.class1
                        },
                            () => {
                                if (this.state.class1 && this.state.class2 && this.state.class3) {
                                    alert("Lop hoc 1 , Lop hoc 2,Lop hoc 3")
                                } else if (this.state.class1 && this.state.class2) {
                                    alert("Lop hoc 1,Lop hoc 2 ")
                                } else if (this.state.class1 && this.state.class3) {
                                    alert("Lop hoc 1 ,Lop hoc 3")
                                } else if (this.state.class1) {
                                    alert("Lop hoc 1")
                                }
                            }
                        )
                    }} />
                <Checkbox
                    title={'Lớp học 2'}
                    size={15}
                    status={this.state.class2}
                    onPress={() => {
                        this.setState({
                            class2: !this.state.class2
                        }, () => {
                            if (this.state.class1 && this.state.class2 && this.state.class3) {
                                alert("Lop hoc 1 , Lop hoc 2,Lop hoc 3")
                            } else if (this.state.class1 && this.state.class2) {
                                alert("Lop hoc 1,Lop hoc 2 ")
                            } else if (this.state.class2 && this.state.class3) {
                                alert("Lop hoc 2 ,Lop hoc 3")
                            } else if (this.state.class2) {
                                alert("Lop hoc 2")
                            }
                        })
                    }} />
                <Checkbox
                    title={'Lớp học 3'}
                    size={15}
                    status={this.state.class3}
                    onPress={() => {
                        this.setState({
                            class3: !this.state.class3
                        }, () => {
                            if (this.state.class1 && this.state.class3 && this.state.class2) {
                                alert("Lop hoc 1,Lop hoc 2 ,Lop hoc 3")
                            } else if (this.state.class2 && this.state.class3) {
                                alert("Lop hoc 2 ,Lop hoc 3")
                            } else if (this.state.class3 && this.state.class1) {
                                alert("Lop hoc 1 ,Lop hoc 3")
                            } else if (this.state.class3) {
                                alert("Lop hoc 3")
                            }
                        })
                    }} />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MyPostScreen)

const styles = StyleSheet.create({
    _viewModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    _vContainer: {
        width: theme.dimension.width * 0.85,
        backgroundColor: theme.colors.white,
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 20
    },
    _vTitel: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    _vRadio: {
        flexDirection: "row",
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
        borderColor: "black",
        borderWidth: 1,
        marginRight: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    _vClass: {
        // backgroundColor: "yellow",
        borderWidth: 1,
        borderColor: theme.colors.black2,
        padding: 10,
        borderRadius: 5,
        marginTop: 10
    },
    _vCategory: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingVertical: 10
    },
    _vTopic: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingVertical: 15,
    }
})