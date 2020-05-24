import React, { Component } from 'react';
import { View, Text } from 'react-native';
import FastImage from 'react-native-fast-image'
import { createImageProgress } from 'react-native-image-progress';
import PropTypes from "prop-types";
import R from '@R'

const FImage = createImageProgress(FastImage);

class Image extends Component {

    // static propTypes = {
    //     source: PropTypes.string,
    // };
    // static defaultProps = {
    //     source: require('../assets/images/ic_daiichi_home.png')
    // };
    constructor(props) {
        super(props)
        const {
            source, resizeMode
        } = props
        this.state = {
            image: source,
            resizeMode: resizeMode || 'contain'
        }
    }

    render() {
        const {
            source,
            style, ...props
        } = this.props

        return (
            <FImage
                resizeMode={this.state.resizeMode}
                style={style}
                source={this.state.image}
                onError={err => {
                    this.setState({
                        image: R.images.logo,
                        resizeMode: 'contain'
                    })
                }}
            // {...props}
            />
        )
    }
}

export default Image