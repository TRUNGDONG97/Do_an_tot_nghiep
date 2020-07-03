import React, { Component } from 'react'
import {
    View, Text, StyleSheet, TouchableOpacity,
    ImageBackground, Image,
    Platform,
    SafeAreaView
} from 'react-native'
import { connect } from 'react-redux'
import { RNCamera } from 'react-native-camera';
import {
    WindsHeader,
    Block,
    Loading,
    Error,
    FastImage,
    BackgroundHeader,
    Icon
} from '@app/components'
import theme from '@theme'
import { SCREEN_ROUTER } from '@constant'
import NavigationUtil from '@app/navigation/NavigationUtil';
import R from '@R'
import { absent, uploadImage } from '@api'
import reactotron from 'reactotron-react-native';
import Toast, { BACKGROUND_TOAST } from "@app/utils/Toast";

export class CameraScreen extends Component {
    constructor(props) {
        super(props);
        const data = this.props.navigation.getParam('data')
        this.state = {
            cameraType: RNCamera.Constants.Type.front,
            mirrorMode: false,
            uri: undefined,
            payload: {
                class_id: data.class_id,
                gps_latitude: data.latitude,
                gps_longitude: data.longitude,
                list_ssid_stu: data.listNameWifi ? data.listNameWifi : [],
                platform: Platform.OS
            },
            isLoading: false
        };
    }
    takePicture = async () => {
        if (this.camera) {
            const options = {
                quality: 0.5,
                base64: true,
                width: theme.dimension.width,
                height: theme.dimension.height,
            };
            const data = await this.camera.takePictureAsync(options);
            this.setState({
                ...this.state,
                uri: data.uri,
                // payload: {
                //     ...this.state.payload,
                //     // image:image
                // }
            })
        }
    };
    _absent = async () => {

        reactotron.log(this.state.uri)
        this.setState({
            ...this.state,
            isLoading: true
        });
        try {
            const responseAbsent = await absent(this.state.payload);
            reactotron.log(responseAbsent, 'res');
            const data = new FormData();
            data.append("photo", {
                // name: responseAbsent.id.toString()+'.jpg',
                name: responseAbsent.data+'.jpg',
                type: 'image/jpg',
                uri:
                    Platform.OS === "android" ? this.state.uri : this.state.uri.replace("file://", "")
            });
            reactotron.log(data, 'image')
            const response = await uploadImage(data);
            
            Toast.show(responseAbsent.message, BACKGROUND_TOAST.SUCCESS);
            this.setState({
                ...this.state,
                isLoading: false,
            });
            // this.props.getListAbsent()
            NavigationUtil.navigate(SCREEN_ROUTER.LIST_ABSENT);

        } catch (error) {
            NavigationUtil.goBack()
            if (error.message == "Network Error") {
                Toast.show(I18n.t("network_err"), BACKGROUND_TOAST.FAIL);
            }
            //showMessages(I18n.t("notification"),I18n.t("error") );
            // Toast.show('Vui lòng thử lại', BACKGROUND_TOAST.FAIL)
            this.setState({
                ...this.state,
                isLoading: false
            });
            reactotron.log(error, 'error');
        }
    }
    render() {
        if (this.state.isLoading) {
            return (
                <Block>
                    <SafeAreaView style={theme.styles.containter}>
                        <BackgroundHeader />
                        <WindsHeader title={"Điểm danh"} />
                        <Loading />
                    </SafeAreaView>
                </Block>

            )
        }
        return (
            <View style={styles.container}>

                <RNCamera
                    ref={(ref) => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={this.state.cameraType}
                    // flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}

                >
                    {({ camera, status, recordAudioPermissionStatus }) => {
                        if (status !== 'READY') return <PendingView />;
                        return (
                            <View
                                style={{
                                    height: theme.dimension.height, width: theme.dimension.width
                                }} >
                                {
                                    this.state.uri ? (
                                        this._renderImage()
                                    ) : (
                                            this._renderCamera()
                                        )
                                }
                            </View>
                        );
                    }}

                </RNCamera>

            </View>

            // </View>
        )
    }
    _renderImage() {
        return (
            <View style={{ flex: 1 }}>
                <FastImage
                    source={{ uri: this.state.uri }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode={'cover'}
                />
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            ...this.state,
                            uri: undefined
                        })
                    }}
                    style={styles._back}
                >
                    <Icon.Ionicons
                        name='md-arrow-round-back'
                        // type='feathericons'
                        color={theme.colors.white}
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles._send}
                    onPress={() => {
                        this._absent()
                        // console.log(this.state.payload)
                    }}
                >
                    <Icon.Ionicons
                        name='md-send'
                        // type='feathericons'
                        color={theme.colors.white}
                        size={40}
                    />
                </TouchableOpacity>
            </View>

        )
    }
    _renderCamera() {
        return (
            <View
                style={{
                    height: theme.dimension.height, width: theme.dimension.width
                }} >
                <TouchableOpacity
                    onPress={() => {
                        NavigationUtil.goBack()
                    }}
                    style={styles._back}
                >
                    <Icon.Ionicons
                        name='md-arrow-round-back'
                        // type='feathericons'
                        color={theme.colors.white}
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.takePicture.bind(this)}
                    style={styles.capture}
                >
                    <Icon.Entypo
                        name='camera'
                        // type='feathericons'
                        color={theme.colors.backgroundHeader}
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    position: 'absolute',
                    left: 20, bottom: 20,
                    // backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 40,
                    borderWidth: 1,
                    borderColor: 'white'
                }}
                    onPress={() => {
                        this.setState({
                            ...this.state,
                            cameraType: this.state.cameraType == RNCamera.Constants.Type.back
                                ? RNCamera.Constants.Type.front
                                : RNCamera.Constants.Type.back,
                        })
                    }}
                >
                    <Icon.MaterialCommunityIcons
                        name='camera-party-mode'
                        // type='feathericons'
                        color={theme.colors.white}
                        size={30}
                    />
                </TouchableOpacity>

            </View>
        )
    }
}

const PendingView = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            width: theme.dimension.width,
            height: theme.dimension.height,
        }}
    >
        <Text>Waiting</Text>
    </View>
);
const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 40,
        padding: 15,
        // paddingHorizontal: 20,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 0,
        margin: 20,
    },
    _send: {
        position: 'absolute',
        // right: 20,
        bottom: 20,
        // backgroundColor: 'white',
        padding: 10,
        alignSelf: 'center',
        // borderRadius:40,
        // borderWidth:1,
        // borderColor:'white'
    },
    _back: {
        position: 'absolute',
        left: 20,
        top: 40,
        // backgroundColor: 'white',
        // padding: 10,
    }
});