import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import theme from '@theme'
export default class RadioButton extends Component {
    state = {
        check: false
    }
    render() {
        const { size, title, status, onPress } = this.props
        return (
            <TouchableOpacity
                disabled={status ? true : false}
                onPress={onPress}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles._vRadio}>
                    {status && <View style={{
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        backgroundColor: theme.colors.black
                    }} />}
                </View>
                <Text style={[theme.fonts.regular16]}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
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
})
