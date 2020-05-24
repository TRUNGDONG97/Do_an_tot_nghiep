import React, { Component } from 'react'
import {
    View, Text, TouchableOpacity,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import {
    Block,
    WindsHeader,
    BackgroundHeader,
    ScrollableTabView,
    Icon, RadioButton,
    Checkbox
} from '@component'
import R from '@R'
import theme from '@theme'
import { SCREEN_ROUTER, TOPIC, CATEGORY } from '@constant'


export class CategoryTopic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topic: this.props.topic,
            category: this.props.category,
            listClass: this.props.listClass
        }
    }

    render() {
        //console.log(this.state.listClass.length, 'listclass')
        const { showModal, title, style } = this.props
        return (
            <View style={[styles._viewModal, { style }]}>
                <View style={styles._vTitel}>
                    <Text style={[theme.fonts.bold16, {
                        paddingBottom: 5
                    }]}>{title}</Text>
                    {showModal && <TouchableOpacity onPress={showModal}>
                        <Icon.FontAwesome
                            name='close'
                            // type='feathericons'
                            color={theme.colors.black}
                            size={25} />
                    </TouchableOpacity>}
                </View>
                <View style={{ height: 1, backgroundColor: theme.colors.black }} />
                <View style={{ paddingHorizontal: 15 }}>
                    {this._renderTopic()}
                    {this._renderCategory()}
                    {this.state.listClass.length && this._renderClass()}
                </View>
            </View>
        )
    }
    _renderTopic() {
        return (
            <View style={styles._vTopic}>
                <Text style={[theme.fonts.regular16]}>{R.strings.topic}</Text>
                <RadioButton
                    onPress={() => {
                        this.setState({
                            ...this.state,
                            topic: TOPIC.NEWS
                        })
                    }}
                    title={R.strings.news}
                    status={this.state.topic == TOPIC.NEWS}
                />
                <RadioButton
                    onPress={() => {
                        this.setState({
                            ...this.state,
                            topic: TOPIC.STUDY
                        })
                    }}
                    title={R.strings.study}
                    status={this.state.topic == TOPIC.STUDY}
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
                        onPress={() => {
                            this.setState({
                                ...this.state,
                                category: CATEGORY.CLASS
                            })
                        }}
                        title={R.strings.class}
                        status={this.state.category == CATEGORY.CLASS}
                    />
                    <RadioButton
                        onPress={() => {
                            this.setState({
                                ...this.state,
                                category: CATEGORY.CENTER
                            })
                        }}
                        title={R.strings.center}
                        status={this.state.category == CATEGORY.CENTER}
                    />
                    <RadioButton
                        onPress={() => {
                            this.setState({
                                ...this.state,
                                category: CATEGORY.SYSTEM
                            })
                        }}
                        title={R.strings.system}
                        status={this.state.category == CATEGORY.SYSTEM}
                    />
                </View>
            </View>
        )
    }
    _renderClass() {
        return (
            <View style={styles._vClass}>
                {/* {listClass.map((item, index) => (
                <View style={{ flexDirection: "row", paddingVertical: 10, alignItems: "center" }}>
                    <View style={{ width: 25, height: 25, borderWidth: 1, borderColor: "black", marginRight: 10 }} />
                    <Text style={[theme.fonts.regular16]}>{item.nameClass}</Text>
                </View>
            ))} */}
                {
                    this.state.listClass.map((item, index) => (
                        <View key={index.toString()}
                            style={{ flexDirection: "row", paddingVertical: 10, alignItems: "center" }}>
                            <View
                                style={{
                                    width: 25,
                                    height: 25,
                                    borderWidth: 1,
                                    borderColor: "black",
                                    marginRight: 10
                                }}
                            />
                            <Text style={[theme.fonts.regular16]}>{item.nameClass}</Text>
                        </View>
                    ))
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryTopic)
const styles = StyleSheet.create({
    _viewModal: {

        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: 5,
        paddingTop: 5,
        paddingBottom: 20,
        // marginTop: 70
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