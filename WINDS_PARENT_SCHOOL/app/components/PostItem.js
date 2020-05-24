import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { Avatar } from "react-native-elements";
import theme from '@theme'
import { Icon, FastImage, ActionSheet } from '@component'
import ModalDialog from '@app/components/ModalDialog'
import RNUrlPreview from "react-native-url-preview";
import R from '@R'
import { LIKE_STATE, SCREEN_ROUTER } from '@constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import reactotron from 'reactotron-react-native';
export default class PostItem extends Component {
    state = {
        showMoreButton: false
    };
    showModal = () => {
        this.refDialog.handleVisible()
    }
    render() {
        const { item, onPressComment, options, fullText } = this.props
        const NUM_OF_LINES = fullText ? 0 : 9;
        return (
            <View style={{
                flex: 1,
                padding: 10,
                backgroundColor: theme.colors.white,
                marginTop: 10
            }}>
                <ActionSheet
                    options={options}
                    ref={(ref) => this.refDialog = ref} />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Avatar
                        rounded
                        source={{ uri: item.avartar_url }}
                        size={40}
                        renderPlaceholderContent={<ActivityIndicator />} />
                    <TouchableOpacity
                        style={{ marginLeft: 10, flex: 1 }}
                        onPress={() => {
                            NavigationUtil.navigate(SCREEN_ROUTER.MY_POST, { title: item.account_name })
                        }}
                    >
                        <Text style={[theme.fonts.bold16]}>{item.account_name}</Text>
                        <Text style={[theme.fonts.regular12, { marginTop: 5 }]}>{item.created_date} phút</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.showModal}
                    >
                        <Icon.MaterialCommunityIcons name='dots-vertical' size={20} />
                    </TouchableOpacity>
                </View>
                <Text style={[theme.fonts.regular14,
                {
                    paddingHorizontal: 15,
                    marginTop: fullText && item.image && item.image.length > 0 ? 6 : 15
                }]}
                    numberOfLines={NUM_OF_LINES}
                    ellipsizeMode="tail"
                    onTextLayout={({ nativeEvent: { lines } }) => {
                        this.setState({
                            showMoreButton: Platform.OS == 'android' ?
                                lines.length > NUM_OF_LINES : lines.length === NUM_OF_LINES
                        });
                    }}
                >
                    {item.content}
                </Text>
                {this.state.showMoreButton && !fullText ? (
                    <TouchableOpacity onPress={onPressComment}>
                        <Text
                            style={[
                                theme.fonts.regular12,
                                {
                                    marginTop: 5,
                                    marginLeft: 15,
                                    color: theme.colors.blue
                                }
                            ]}
                        >
                            {R.strings.see_more}
                        </Text>
                    </TouchableOpacity>
                ) : null}
                {item.image && item.image.length > 0 && (
                    <View
                        style={{
                            marginHorizontal: 20,
                            flexDirection: "row",
                            marginTop: 20
                        }}
                    >
                        {item.image.map((value, index) =>
                            value && index < 3 ? (
                                <TouchableOpacity
                                    onPress={() =>
                                        NavigationUtil.navigate(SCREEN_ROUTER.IMAGE_VIEWERS, {
                                            url: item.image,
                                            index: index
                                        })
                                    }
                                >
                                    <FastImage style={styles.image} source={{ uri: value }}
                                        resizeMode={'cover'}
                                    />
                                </TouchableOpacity>
                            ) : null
                        )}
                        {item.image.length > 3 && (
                            <TouchableOpacity
                                onPress={() =>
                                    NavigationUtil.navigate(SCREEN_ROUTER.IMAGE_VIEWERS, {
                                        url: item.image,
                                        index: 2
                                    })
                                }
                                style={styles._imageAdd}
                            >
                                <Text style={[theme.fonts.bold22, { color: "white" }]}>
                                    +{item.image.length - 3}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
                {item.link_video &&
                    // item.image &&
                    // item.image.length == 0 && 
                    (
                        <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
                            <RNUrlPreview
                                containerStyle={{ height: 90, alignItems: "center" }}
                                imageStyle={{
                                    width: 60,
                                    height: 60,
                                    // paddingHorizontal: 10,
                                    // backgroundColor:'red'
                                }}
                                faviconStyle={{
                                    width: 60,
                                    height: 60,
                                    // backgroundColor:"red" 
                                }}
                                imageProps={'cover'}
                                descriptionNumberOfLines={2}
                                text={item.link_video}
                                textContainerStyle={[theme.fonts.regular12,
                                {
                                    flex: 1,
                                    marginLeft: 10,
                                }]}
                                descriptionNumberOfLines={2}
                                titleNumberOfLines={1}
                            // resizeMode={'cover'}
                            />
                        </View>
                    )}
                <Text style={[theme.fonts.regular12, { textAlign: "right", marginRight: 5, marginTop: 5 }]}>
                    {item.count_comment > 0 ? item.count_comment + ' ' + R.strings.commention : ''}
                    {item.count_like > 0 ? item.count_like + ' ' + R.strings.like : ''}
                </Text>
                <View style={{ height: 1, width: '100%', backgroundColor: theme.colors.gray, marginTop: 5 }} />
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: "center" }}
                    // onPress={onPressLike}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {item.is_like_post == LIKE_STATE.LIKE ? (
                                <FastImage
                                    style={{
                                        width: 17,
                                        height: 15,
                                        marginRight: 5,
                                        tintColor: "red"
                                    }}
                                    source={R.images.ic_like}
                                />
                            ) : (
                                    <FastImage
                                        style={{ width: 17, height: 15, marginRight: 5 }}
                                        source={R.images.ic_not_like}
                                    />
                                )}
                            <Text
                                style={[theme.fonts.regular14, { color: "#707070" }]}
                            >
                                {R.strings.like}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: "center" }}
                        onPress={onPressComment}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <FastImage
                                style={{
                                    width: 15,
                                    height: 15,
                                    marginRight: 5
                                }}
                                source={R.images.ic_comment}
                            />
                            <Text
                                style={[theme.fonts.regular14, { color: "#707070" }]}
                            >
                                {R.strings.commention}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: width / 3 - 20,
        height: width / 3 - 25,
        marginRight: 3
    },
    _imageAdd: {
        position: "absolute",
        width: width / 3 - 15,
        height: width / 3 - 25,
        top: 0,
        right: -10,
        backgroundColor: "#000",
        opacity: 0.8,
        alignItems: "center",
        justifyContent: "center"
    }
})
