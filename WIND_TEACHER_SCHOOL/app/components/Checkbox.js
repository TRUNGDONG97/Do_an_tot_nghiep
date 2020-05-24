import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import theme from '@theme'
import {FastImage} from '@component'
import R from '@R'
export default class Checkbox extends Component {
    constructor(props) {
        super(props)
        const { status } = this.props
        this.state = {
            status: status
        };
    }
    render() {
        const {  size,borderColor } = this.props
        return (
            <TouchableOpacity
                onPress={() => {
                    this.setState({
                        ...this.state,
                        status: !this.state.status,

                    })
                }}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: size,
                    height: size,
                    borderWidth: 0.5,
                    borderColor:borderColor?borderColor: "#07C9E7",
                    borderRadius:size/8
                }}>
                {this.state.status && <FastImage
                    source={R.images.img_tick}
                    style={{ width: size-5, height: size-5}} />}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({})
