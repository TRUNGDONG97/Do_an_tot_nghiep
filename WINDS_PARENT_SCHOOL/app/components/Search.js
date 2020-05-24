import React, { Component } from 'react';
import { Image, TextInput, View, Platform, StyleSheet } from 'react-native';
const searchIcon = require('../assets/images/ic_search.png');
import theme from '@theme'
export default class Search extends Component {
    render() {
        const { placeHolder, booking, onChangeText } = this.props;
        return (
            <View
                style={[styles._vSearch, { marginHorizontal: 15, }]}>
                <Image
                    style={styles._img}
                    source={searchIcon}
                />
                <TextInput
                    style={[theme.fonts.regular13, { flex: 1, marginLeft: 10, paddingBottom: Platform.OS == 'ios' ? 3 : 10 }]}
                    placeholderTextColor="#8A8787"
                    placeholder={placeHolder || 'Tìm kiếm'}
                    returnKeyType="search"
                    autoCorrect={false}
                    clearButtonMode='while-editing'
                    onChangeText={onChangeText}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    _vSearch: {
        backgroundColor: '#E8E8E8',
        borderRadius: 10,
        height: 42,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    _img: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
    }
})