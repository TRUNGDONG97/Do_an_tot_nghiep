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
    LabelTextInput,
    AppHeader
} from '@component'
import R from '@R'
import theme from '@theme'
import Ripple from 'react-native-material-ripple';
import { SCREEN_ROUTER } from '@app/constants/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import Mockup from '@app/constants/Mockup'
import Toast, { BACKGROUND_TOAST } from '@app/utils/Toast'
import { changePass } from "@app/constants/Api";
import { showMessages } from "@app/utils/Alert";
import reactotron from 'reactotron-react-native'

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
                <AppHeader title={R.strings.change_pass} />
                <SafeAreaView style={theme.styles.containter}>
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
                            if (this.state.oldPass == "") {
                                showMessages("", 'Chưa nhập mật khẩu cũ');
                            } else if (this.state.newPass == "") {
                                showMessages("", 'Chưa nhập mật khẩu mới');
                            } else if (this.state.confirmPass == "") {
                                showMessages("", 'Chưa nhập lại mật khẩu mới');
                            } else if (this.state.newPass != this.state.confirmPass) {
                                showMessages("", 'Nhập lại mật khẩu không đúng');
                            } else {
                                this._changePass();
                            }
                        }}
                    />
                </View>
            </View>
        )
    }
    _changePass = async () => {
        const { oldPass, newPass } = this.state;
        this.setState({
            ...this.state,
            isLoading: true
        });
        try {
            const response = await changePass({
                oldPassword: oldPass,
                newPassword: newPass
            });
            
            reactotron.log(response, "response");
            Toast.show('Đổi mật khẩu thành công', BACKGROUND_TOAST.SUCCESS);

            this.setState({
                ...this.state,
                isLoading: false
            });
            NavigationUtil.goBack();
        } catch (error) {
            if (error.message == "Network Error") {
                Toast.show('Lỗi mạng', BACKGROUND_TOAST.FAIL);
            }
              reactotron.log(error, "error");
            this.setState({
                ...this.state,
                isLoading: false
            });
            //Toast.show('Vui lòng thử lại', BACKGROUND_TOAST.FAIL)
        }
    };
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassWordScreen)
