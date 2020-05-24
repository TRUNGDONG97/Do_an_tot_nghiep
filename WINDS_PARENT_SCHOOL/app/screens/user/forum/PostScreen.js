import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    TextInput
} from 'react-native'
import {
    Block,
    WindsHeader,
    BackgroundHeader,
    Icon,
} from '@component'
import R from '@R'
import theme from '@theme'

const test = "Từng giọt mưa long lanh xôn xao Để mộng mơ trong em bay cao Em đâu biết tình này dạt dào Phố xá thênh thang dáng ai về mơ lúc vai kề"
import NavigationUtil from '@app/navigation/NavigationUtil'
import { SCREEN_ROUTER } from '@app/constants/Constant'
import ImagePicker from 'react-native-image-crop-picker';
export default class PostScreen extends Component {
    constructor(props) {
        super(props)
        const type = this.props.navigation.getParam('type')
        this.state = {
            content: '',
            type: type
        }
    }
    render() {
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    {this.state.type ? <WindsHeader
                        updateButton
                        title={R.strings.edit_post}
                        onPress={() => {
                            alert('Cập nhật bài thành công!')
                            NavigationUtil.navigate(SCREEN_ROUTER.MY_POST)
                        }}
                    /> :
                        <WindsHeader
                            postButton
                            title={R.strings.create_post}
                            onPress={() => {
                                alert('Đăng bài thành công!')
                                NavigationUtil.navigate(SCREEN_ROUTER.FORUM)
                            }}
                        />}
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
    _renderOptionBottom() {
        return (
            <View style={styles._vOptionBottom}>
                {this._renderItemOptionBotton(
                    "Ảnh/Video",
                    <Icon.FontAwesome
                        color={'green'}
                        name={'image'}
                        size={20}
                    />,
                    () => { }
                )}
                {this._renderItemOptionBotton("Đính kèm video Youtube",
                    <Icon.Entypo
                        color={'red'}
                        name={'youtube'}
                        size={20}
                    />
                )}
                {this._renderItemOptionBotton("Đính kèm link web",
                    <Icon.AntDesign
                        color={'blue'}
                        name={'link'}
                        size={20}
                    />
                )}
            </View>
        )
    }

    _renderItemOptionBotton(title, Icon, onPress) {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={styles._vItemOptionBottom}>
                {Icon}
                <Text style={[theme.fonts.regular16, { marginLeft: 10 }]}>{title}</Text>
            </TouchableOpacity>
        )
    }
    _renderBody() {
        return (
            <View style={styles._vContainer}>
                <View style={{ flexDirection: "row", paddingTop: 10, alignItems: "center" }}>
                    <Icon.FontAwesome
                        color={theme.colors.backgroundHeader}
                        name={'user-circle-o'}
                        size={40}
                    />
                    <View style={{ marginLeft: 15 }}>
                        <Text style={[theme.fonts.bold20]}>Nguyễn Tú</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                            <Text style={[theme.colors.caption]}>Học tập</Text>
                            <View style={{
                                height: "80%",
                                width: 1,
                                backgroundColor: "black",
                                marginHorizontal: 10
                            }} />
                            <Text style={[theme.colors.caption]}>Lớp vẽ tranh sơn dầu</Text>
                        </View>
                    </View>
                </View>
                <TextInput
                    style={{ textAlignVertical: 'top', marginTop: 20 }}
                    placeholder={'Mời bạn nhập nội dung'}
                    multiline={true}
                    onChangeText={(text) => {
                        this.setState({
                            ...this.state,
                            content: text
                        })
                    }}
                />
                {this._renderOptionBottom()}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    _vOptionBottom: {
        width: theme.dimension.width,
        position: "absolute",
        bottom: 0,
    },
    _vItemOptionBottom: {
        width: "100%",
        flexDirection: 'row',
        alignItems: "center",
        borderTopWidth: 0.5,
        borderColor: "black",
        padding: 10
    },
    _vContainer: {
        flex: 1,
        backgroundColor: theme.colors.white,
        paddingHorizontal: 10
    },
    block: {
        zIndex: 1000,
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        elevation: 6,
        padding: 10,
        width: width * 0.9,
        marginTop: 10
    },
})
