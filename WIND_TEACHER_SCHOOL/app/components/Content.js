import React, { Component } from 'react'
import { Text, View } from 'react-native'
import theme from '@theme'
import { Block } from '@component'
import AutoHeightImage from 'react-native-auto-height-image'


export default class Content extends Component {
    render() {
        const { img, title } = this.props
        return (
            <Block row style={{
                //width: width * 0.9,
                alignItems: "center",
                // paddingHorizontal: 16,
                paddingTop: 5,
                // marginBottom: 10
            }}>
                <AutoHeightImage source={img}
                    width={30}
                    style={{ tintColor: theme.colors.black2 }}
                />
                <Text style={
                    [theme.fonts.regular16,
                    {
                        marginLeft: 10,
                        flex: 1,
                        color: theme.colors.primaryText
                    }]}
                >
                    {title}
                </Text>
            </Block>
        )
    }
}
