import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import { Header } from 'react-native-elements';
import NavigationUtil from '../navigation/NavigationUtil';
import { CirclesLoader, PulseLoader, TextLoader, EatBeanLoader, LinesLoader } from 'react-native-indicator';
import Block from './Block'

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Block middle center>
                <LinesLoader
                    size={40}
                    color='#EC5C5C'
                />
                <View style={{
                    height: 20
                }}></View>
                <TextLoader
                    text="Đang tải" />
            </Block>
        );
    }
}

export default Loading;
