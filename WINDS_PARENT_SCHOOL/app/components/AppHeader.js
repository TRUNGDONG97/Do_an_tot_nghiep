import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Header } from 'react-native-elements';
import NavigationUtil from '../navigation/NavigationUtil';
import Icon from './Icon';
import theme from '../constants/Theme'
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import { SCREEN_ROUTER } from '../constants/Constant'

class AppHeader extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        hideBackButton: PropTypes.bool,
        rightComponent: PropTypes.element,
    };
    static defaultProps = {
        hideBackButton: false,
        rightComponent: null
    };

    render() {

        const { title, hideBackButton, backAction,
            rightComponent, navigation, searchButton, onPressSearch,
            textRight,onPressRight,
            ...props
        } = this.props;
        const parent = navigation.dangerouslyGetParent();
        const showBackButton = !hideBackButton && parent && parent.state && parent.state.routeName !== SCREEN_ROUTER.MAIN

        return (
            <Header
                placement="left"
                containerStyle={{
                    backgroundColor: theme.colors.backgroundHeader,
                    marginTop: Platform.OS == "ios" ? 0 : -StatusBar.currentHeight,
                }}

                leftComponent={showBackButton &&
                    <View
                        style={{
                            // flex: 1,
                            // height: '100%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // backgroundColor: theme.colors.active,
                            // marginLeft:
                        }}>
                        <TouchableOpacity onPress={
                            NavigationUtil.goBack
                        }>
                            <Icon.AntDesign
                                name="left"
                                size={25}
                                color={theme.colors.white}
                            />
                        </TouchableOpacity>
                        <Text style={[theme.fonts.bold20, { marginLeft: 20, color: theme.colors.white }]}>{title}</Text>
                    </View>
                }
                // centerComponent={
                //     <Text style={theme.fonts.bold23}>{title}</Text>
                // }
                rightComponent={
                    <View>
                        {searchButton && (
                            <TouchableOpacity
                                style={{ marginRight: 20 }}
                                onPress={onPressSearch}
                            >
                                <Icon.Feather name="filter" size={25} color="#fff" />
                            </TouchableOpacity>
                        )}
                        {textRight &&
                            <TouchableOpacity 
                                onPress={onPressRight}
                            >
                                <Text style={[theme.fonts.bold16, { color: '#fff' }]}>{textRight}</Text>
                            </TouchableOpacity>}
                    </View>
                }

                {...props}
            />
        )
    }
}

export default withNavigation(AppHeader);