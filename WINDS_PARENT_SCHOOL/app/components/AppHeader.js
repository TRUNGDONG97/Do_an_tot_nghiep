import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
            rightComponent, navigation,
            ...props
        } = this.props;
        const parent = navigation.dangerouslyGetParent();
        const showBackButton = !hideBackButton && parent && parent.state && parent.state.routeName !== SCREEN_ROUTER.MAIN

        return (
            <Header
                placement="left"
                containerStyle={{
                    backgroundColor: theme.colors.white
                }}

                leftComponent={showBackButton &&
                    <TouchableOpacity
                        style={{
                            // flex: 1,
                            height: '100%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // backgroundColor: theme.colors.active
                        }}
                        onPress={
                            NavigationUtil.goBack
                        }>
                        <Icon.Ionicons
                            name="ios-arrow-round-back"
                            size={35}
                            color="#000"
                        />
                        <Text style={[theme.fonts.bold23, { marginLeft: 10 }]}>{title}</Text>
                    </TouchableOpacity>
                }
                centerComponent={
                    <Text style={theme.fonts.bold23}>{title}</Text>
                }
                rightComponent={rightComponent}
                {...props}
            />
        )
    }
}

export default withNavigation(AppHeader);