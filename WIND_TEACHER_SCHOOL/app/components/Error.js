import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import R from '@R'

class Error extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={this.props.onPress}
                >
                    <Icon.MaterialIcons name='refresh' size={45} color='orange' />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', color: '#FF0000' }}>{R.strings.try_again}</Text>
            </View>
        );
    }
}

export default Error;
