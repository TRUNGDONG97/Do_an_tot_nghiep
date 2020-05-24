import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import theme from '@theme'
import { Icon } from '@component'
import R from '@app/assets/R'
export default class Checkbox extends Component {
    render() {
        const { title, size, status, onPress } = this.props
        return (
            <View style={styles._vContainer}>
                <TouchableOpacity
                    onPress={onPress}
                    style={[styles._vCheckBox, {
                        width: size,
                        height: size,
                    }]}>
                    {status && <Image
                        style={styles._imgTick}
                        source={R.images.ic_tick} />}
                </TouchableOpacity>
                <Text style={[theme.fonts.regular16]}>{title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    _vContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        alignItems: "center"
    },
    _imgTick: {
        width: 18,
        height: 18,
        position: "absolute",
        left: 0,
        bottom: -2
    },
    _vCheckBox: {
        borderWidth: 1,
        borderColor: "black",
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center"
    }
})
