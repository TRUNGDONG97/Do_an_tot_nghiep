import React, { Component } from 'react'
import { Text, View, Keyboard } from 'react-native'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view'
import theme from '@theme'
import PropTypes from "prop-types"
import CustomTabbar from './CustomTabbar'

export class ScrollableTab extends Component {

    static propTypes = {
        scrollableTabBar: PropTypes.bool,
    };
    static defaultProps = {
        scrollableTabBar: false,
    };

    render() {
        const { children, scrollableTabBar, ...props } = this.props
        return (
            <ScrollableTabView
                style={{
                    borderColor: theme.colors.border,
                }}
                tabBarBackgroundColor={theme.colors.white}
                tabBarPosition='top'
                tabBarActiveTextColor={theme.colors.white}
                tabBarInactiveTextColor={theme.colors.white}
                tabBarUnderlineStyle={{
                    height: 2,
                    backgroundColor: theme.colors.primary
                }}
                renderTabBar={(index) =>
                    scrollableTabBar ?
                        <ScrollableTabBar />
                        :
                        <CustomTabbar index={index} />
                }
                tabBarTextStyle={theme.fonts.robotoRegular14}
                onChangeTab={Keyboard.dismiss}
                {...props}>
                {children}
            </ScrollableTabView>
        )
    }
}

export default ScrollableTab
