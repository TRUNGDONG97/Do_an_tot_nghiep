import React, { Component } from 'react'
import { Text, View } from 'react-native'
import theme from '@theme'
import { Block } from '@component'
import AutoHeightImage from 'react-native-auto-height-image'


export default class Content extends Component {
    render() {
        const { img, title1, title2 } = this.props
        return (
            <Block row style={{ paddingTop: 5 }}>
                <AutoHeightImage
                    source={img}
                    width={25}
                    style={{ tintColor: theme.colors.primaryText }}
                />
                <View style={{ flex: 1, marginLeft: 10, justifyContent: "center" }}>
                    <Text style={
                        [theme.fonts.regular16,
                        {
                            color: theme.colors.primaryText
                        }]}
                    >
                        {title1}
                    </Text>
                    {title2 && <Text style={
                        [theme.fonts.regular16,
                        {
                            color: theme.colors.primaryText,
                            marginTop: 10,
                        }]}
                    >
                        {title2}
                    </Text>}
                </View>
            </Block>
        )
    }
}
