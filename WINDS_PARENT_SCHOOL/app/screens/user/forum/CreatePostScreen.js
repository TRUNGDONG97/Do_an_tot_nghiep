import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, TouchableOpacity } from 'react-native'
import {
    Block,
    WindsHeader,
    BackgroundHeader,
    RadioButton,
    Checkbox,
    Button
} from '@component'
import R from '@R'
import theme from '@theme'
import { SCREEN_ROUTER } from '@app/constants/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'

export default class CreatePostScreen extends Component {
    constructor(props) {
        super(props)
        const type = this.props.navigation.getParam('type')
        this.state = {
            topic: 1,
            category: 1,
            class1: false,
            class2: false,
            class3: false,
            type: type
        }
    }
    render() {
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader
                        title={this.state.type ? R.strings.edit_post : R.strings.create_post}
                    />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
    _renderBody() {
        return (
            <View style={styles._vContainer}>
                <Text style={[theme.fonts.bold18, { marginTop: 20 }]}>{R.strings.choose_category}</Text>
                {this._renderTopic()}
                {this._renderCategory()}
                {this._renderCheckBoxClass()}
                {this._renderButton()}
            </View>
        )
    }
    _renderTopic() {
        return (
            <View style={styles._vTopic}>
                <Text style={[theme.fonts.regular16]}>{R.strings.topic}</Text>
                <RadioButton
                    title={'Chủ đề 1'}
                    size={8}
                    status={this.state.topic == 1}
                    onPress={() => {
                        this.setState({
                            topic: 1
                        }, () => { alert("Chủ đề " + this.state.topic) })
                    }}
                />
                <RadioButton
                    title={'Chủ đề 2'}
                    size={8}
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
            <View style={{ marginTop: 15 }}>
                <Text style={[theme.fonts.regular16]}>{R.strings.category}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
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
    _renderCheckBoxClass() {
        return (
            <View style={styles._vClass}>
                <Text style={[theme.fonts.regular16]}>{R.strings.choose_class}</Text>
                <Checkbox
                    title={'Lớp học 1'}
                    size={15}
                    status={this.state.class1}
                    onPress={() => {
                        this.setState({
                            class1: !this.state.class1
                        },
                            // () => {
                            //     if (this.state.class1 && this.state.class2 && this.state.class3) {
                            //         alert("Lop hoc 1 , Lop hoc 2,Lop hoc 3")
                            //     } else if (this.state.class1 && this.state.class2) {
                            //         alert("Lop hoc 1,Lop hoc 2 ")
                            //     } else if (this.state.class1 && this.state.class3) {
                            //         alert("Lop hoc 1 ,Lop hoc 3")
                            //     } else if (this.state.class1) {
                            //         alert("Lop hoc 1")
                            //     }
                            // }
                        )
                    }} />
                <Checkbox
                    title={'Lớp học 2'}
                    size={15}
                    status={this.state.class2}
                    onPress={() => {
                        this.setState({
                            class2: !this.state.class2
                        },
                            // () => {
                            //     if (this.state.class1 && this.state.class2 && this.state.class3) {
                            //         alert("Lop hoc 1 , Lop hoc 2,Lop hoc 3")
                            //     } else if (this.state.class1 && this.state.class2) {
                            //         alert("Lop hoc 1,Lop hoc 2 ")
                            //     } else if (this.state.class2 && this.state.class3) {
                            //         alert("Lop hoc 2 ,Lop hoc 3")
                            //     } else if (this.state.class2) {
                            //         alert("Lop hoc 2")
                            //     }
                            // }
                        )
                    }} />
                <Checkbox
                    title={'Lớp học 3'}
                    size={15}
                    status={this.state.class3}
                    onPress={() => {
                        this.setState({
                            class3: !this.state.class3
                        },
                            // () => {
                            //     if (this.state.class1 && this.state.class3 && this.state.class2) {
                            //         alert("Lop hoc 1,Lop hoc 2 ,Lop hoc 3")
                            //     } else if (this.state.class2 && this.state.class3) {
                            //         alert("Lop hoc 2 ,Lop hoc 3")
                            //     } else if (this.state.class3 && this.state.class1) {
                            //         alert("Lop hoc 1 ,Lop hoc 3")
                            //     } else if (this.state.class3) {
                            //         alert("Lop hoc 3")
                            //     }
                            // }
                        )
                    }} />
            </View>
        )
    }
    _renderButton() {
        return (
            <View style={{ alignItems: "center", marginTop: 30 }}>
                <TouchableOpacity
                    onPress={() => {
                        NavigationUtil.navigate(SCREEN_ROUTER.POST, { type: this.state.type })
                    }}
                    style={styles._vButton}>
                    <Text style={[theme.fonts.bold18, styles._txtButton]}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    _vContainer: {
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingHorizontal: 10
    },
    _vClass: {
        borderWidth: 1,
        borderColor: theme.colors.black2,
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    },
    _vTopic: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15
    },
    _vButton: {
        backgroundColor: theme.colors.orange,
        width: 120,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        flexDirection: "row",
    },
    _txtButton: {
        color: theme.colors.white,
        marginVertical: 10,
        marginLeft: 5
    }
})
