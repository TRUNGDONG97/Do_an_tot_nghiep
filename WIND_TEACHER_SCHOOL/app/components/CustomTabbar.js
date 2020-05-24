import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { colors, fonts } from '../constants/Theme';

export default class CustomTabbar extends Component {
    icons = [];
    constructor(props) {
        super(props);
        this.icons = [];
    }
    render() {
        return <View style={[styles.tabs, this.props.style,]}>
            {this.props.tabs.map((tab, i) => {
                return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)}
                    style={[styles.tab, {
                        borderRightWidth: (this.props.activeTab === 0 && i == 0) ? 1 : 0,
                        borderLeftWidth: (this.props.activeTab === 1 && i == 1) ? 1 : 0,
                        backgroundColor: this.props.activeTab === i ? colors.activeScrollable : colors.white
                    }]}>
                    <Text style={[{ color: this.props.activeTab === i? colors.white:colors.black }, fonts.quicksandBold12]}>{tab}</Text>
                </TouchableOpacity>;
            })}
        </View>;
    }
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingBottom: 10,
        flexDirection: 'row',
        borderRadius: 10,
        paddingVertical: 10,
        borderColor: colors.white,

    },
    tabs: {
        marginHorizontal: 15,
        // height: 45,
        flexDirection: 'row',
        // borderWidth: 3,
        // borderBottomColor: 'rgba(0,0,0,0.05)', 
        borderRadius: 10,
        // borderWidth: 1,
        marginBottom: 5,
        borderColor: colors.white,
        backgroundColor: colors.white
    },
});

