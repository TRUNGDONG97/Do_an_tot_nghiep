import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    KeyboardAvoidingView
} from 'react-native'
import { connect } from 'react-redux'
import { getListClass } from '@app/redux/actions'
import {
    Block, WindsHeader,
    BackgroundHeader, Loading,
    FastImage, Icon,
    Content,
    Button,
    LabelTextInput
} from '@component'
import R from '@R'
import theme from '@theme'
import Ripple from 'react-native-material-ripple';
import { SCREEN_ROUTER } from '@app/constants/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import Mockup from '@app/constants/Mockup'

export class ChangePassWordScreen extends Component {
    state = {
        isLoading: false,
        error: null,
        data: {},

        oldPass: "",
        newPass: "",
        confirmPass: ""
    };

    render() {
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader title='Đổi mật khẩu' />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }

    _renderBody() {
        return (
            <View style={[theme.styles.androidSafeView]}>
                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                }}>
                    {/* {this.state.isLoading && <LoadingProgressBar />} */}
                    <LabelTextInput
                        secure={true}
                        label="Mật khẩu cũ"
                        onChangeText={text => this.setState({ oldPass: text })}
                        // value={this.state.oldPass}
                        secureTextEntry={true}
                        placeholder="Mật khẩu cũ"
                    />
                    <LabelTextInput
                        secure={true}
                        label="Mật khẩu mới"
                        onChangeText={text => this.setState({ newPass: text })}
                        // value={this.state.newPass}
                        secureTextEntry={true}
                        placeholder="Mật khẩu mới"
                    />
                    <LabelTextInput
                        secure={true}
                        label="Xác nhận mật khẩu mới"
                        onChangeText={text => this.setState({ confirmPass: text })}
                        // value={this.state.confirmPass}
                        secureTextEntry={true}
                        placeholder="Xác nhận mật khẩu mới"
                    />
                    <Button
                        title="Đổi mật khẩu"
                        onPress={() => {
                            alert('Thành công!')
                        }}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassWordScreen)
