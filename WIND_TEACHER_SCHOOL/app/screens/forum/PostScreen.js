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
    AppHeader,
    BackgroundHeader,
    ScrollableTabView,
    Search,
    RadioButton,
    Checkbox,
    Icon,
    Button
} from '@component'
import R from '@R'
import theme from '@theme'

const test = "Từng giọt mưa long lanh xôn xao Để mộng mơ trong em bay cao Em đâu biết tình này dạt dào Phố xá thênh thang dáng ai về mơ lúc vai kề"
import NavigationUtil from '@app/navigation/NavigationUtil'
import { SCREEN_ROUTER } from '@app/constants/Constant'

export default class PostScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: ''
        }
    }
    _renderOptionBottom() {
        return (
            <View style={styles._vOptionBottom}>
                {this._renderItemOptionBotton("Ảnh/Video",
                    <Icon.FontAwesome
                        color={'green'}
                        name={'image'}
                        size={20}
                    />
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

    _renderItemOptionBotton(title, Icon) {
        return (
            <TouchableOpacity style={styles._vItemOptionBottom}>
                {Icon}
                <Text style={[theme.fonts.regular16, { marginLeft: 10 }]}>{title}</Text>
            </TouchableOpacity>
        )
    }
    _renderBody() {
        return (
            <View style={{ flex: 1, backgroundColor: theme.colors.white, paddingHorizontal: 10 }}>
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
                    style={[theme.fonts.regular14, { marginTop: 20, marginHorizontal: 5 }]}
                    placeholder={'Nội dung ....'}
                    value={test}
                    multiline={true}
                />
                {this._renderOptionBottom()}
            </View>
        )
    }
    render() {
        return (
            <Block>

                {/* <BackgroundHeader /> */}
                <AppHeader title={R.strings.create_post}
                    textRight={R.strings.posts}
                    onPressRight={() => {
                        NavigationUtil.navigate(SCREEN_ROUTER.FORUM)
                    }}
                />
                <SafeAreaView style={theme.styles.containter}>
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
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
    }
})
