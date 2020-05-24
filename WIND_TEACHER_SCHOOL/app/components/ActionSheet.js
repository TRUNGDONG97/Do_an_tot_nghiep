import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import * as theme from '@theme'
import { FastImage } from '@component'
import ModalDialog from '@app/components/ModalDialog'
export default class ActionSheet extends Component {

    handleVisible = () => {
        this.refDialog.handleVisible()
    }

    render() {
        const { options } = this.props
        return (
            <ModalDialog ref={(ref) => this.refDialog = ref}>
                <View style={{
                    backgroundColor: theme.colors.white,
                    borderTopStartRadius: 10,
                    borderTopEndRadius: 10,
                    // justifyContent:"center",
                    // alignItems:'center',
                    paddingBottom: 40,
                    paddingLeft: 10
                }}>
                    {options.map((item, index) => {
                        return (<Option item={item} index={index} onPress={() => this.handleVisible()} />)
                    })}
                </View>
            </ModalDialog>
        )
    }
}
class Option extends Component {
    render() {
        const { item, index } = this.props
        return (
            <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 10, paddingTop: 20, }}
                onPress={() => {
                    item.onPress()
                    this.props.onPress()
                }}
            >
                <FastImage
                    style={{
                        height: 20, width: 20
                    }}
                    source={item.uri}
                />
                <Text style={[theme.fonts.regular16, { marginLeft: 20 }]}>{item.title}</Text>
            </TouchableOpacity>
        )
    }
}
