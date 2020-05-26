import React, { Component } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    ActivityIndicator
} from 'react-native'
import NavigationUtil from '../../navigation/NavigationUtil'
import R from '@R'
import { SCREEN_ROUTER } from '@app/constants/Constant'
import { FastImage, Block } from '@app/components'
import AsyncStorage from "@react-native-community/async-storage"
import reactotron from 'reactotron-react-native'
// import { connect } from 'react-redux'

export default class AuthLoadingScreen extends Component {

    componentDidMount() {
        // load something and check login
        setTimeout(() => {
            this.handleActiveApp()
        }, 1500);

    }

    handleActiveApp = async () => {
        let token = await AsyncStorage.getItem('token')
        if (!!token) {
            NavigationUtil.navigate(SCREEN_ROUTER.MAIN)
        } else {
            NavigationUtil.navigate(SCREEN_ROUTER.LOGIN)
        }
    }

    render() {
        return (
            <Block>
                <FastImage
                    source={R.images.img_splash}
                    style={{ width: '100%', height: '100%' }} />
            </Block>
        )
    }



}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

// export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)
