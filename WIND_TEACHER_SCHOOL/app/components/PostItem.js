import React, { Component } from 'react'
import {
    View, Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Platform
} from 'react-native'
import { connect } from 'react-redux'
import * as theme from '@theme'
import {
    FastImage,
    Icon,
    Block,
    ActionSheet
} from '@component'
import { Avatar } from "react-native-elements";
import RNUrlPreview from "react-native-url-preview";
import NavigationUtil from '@app/navigation/NavigationUtil'
import { SCREEN_ROUTER, LIKE_STATE } from '@constant'
import R from '@R'
import ModalDialog from '@app/components/ModalDialog'
//NUM_OF_LINES = this.props.fullText ? 0 : 9;
const sizeImage = (theme.dimension.width - 90) / 3
export class PostItem extends Component {
    state = {
        showMoreButton: false
    };
    showModal = () => {
        // alert('dfdkf')
        this.refDialog.handleVisible()
    }

    render() {
        const { item, index, onPressComment, fullText, options, onPressUser } = this.props
        const NUM_OF_LINES = fullText ? 0 : 9;
        // console.log(item)
        return (
            <View style={styles._viewItem}>

                <ActionSheet options={options}
                    ref={(ref) => this.refDialog = ref}
                />

                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <TouchableOpacity
                        style={styles._viewInfo}
                        onPress={onPressUser}
                    >
                        <Avatar
                            rounded
                            source={{
                                uri: item.avartar_url
                            }}
                            size={30}
                            renderPlaceholderContent={<ActivityIndicator />}
                            placeholderStyle={{ backgroundColor: "white" }}
                        />

                        <Block style={{ flex: 1, marginLeft: 15 }}>
                            <Text
                                style={[theme.fonts.bold14, { flex: 1 }]}
                                numberOfLines={1}
                            >
                                {item.account_name}
                            </Text>

                            <Text style={[theme.fonts.bold12, { color: theme.colors.black2, flex: 1 }]}>
                                {item.created_date + ' phút trước'}
                            </Text>
                        </Block>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.showModal}>
                        <Icon.MaterialCommunityIcons name='dots-vertical' size={20} />
                    </TouchableOpacity>
                </View>

                <Text style={[theme.fonts.regular14,
                {
                    paddingHorizontal: 20,
                    marginTop: fullText && item.image && item.image.length > 0 ? 6 : 0
                }]}
                    numberOfLines={NUM_OF_LINES}
                    ellipsizeMode="tail"
                    onTextLayout={({ nativeEvent: { lines } }) => {
                        this.setState({ showMoreButton: Platform.OS == 'android' ? 
                        lines.length > NUM_OF_LINES : lines.length === NUM_OF_LINES });
                        // console.log(lines.length)
                    }}
                >
                    {item.content}
                </Text>
                {this.state.showMoreButton && !fullText ? (
                    <TouchableOpacity onPress={onPressComment}>
                        <Text
                            style={[
                                theme.fonts.regular14,
                                {
                                    marginTop: 5,
                                    marginLeft: 30,
                                    color: theme.colors.secuiritied
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
                            // marginHorizontal: 20,
                            flexDirection: "row",
                            marginTop: 20,
                            width: sizeImage * 3 + 9,
                            // alignItems:'center'
                            alignSelf: 'center'
                            // justifyContent:'space-between'
                        }}
                    >
                        {item.image.map((value, index) =>
                            value != "" && index < 3 ? (
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

                {item.link_video != null &&
                    item.link_video != "" &&
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
                            <FastImage
                                style={{
                                    width: 17,
                                    height: 15,
                                    marginRight: 5,
                                    tintColor: "red"
                                }}
                                source={item.is_like_post == LIKE_STATE.LIKE ? R.images.ic_like : R.images.ic_not_like}
                            />

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

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)

const styles = StyleSheet.create({
    _viewItem: {
        backgroundColor: theme.colors.white,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        // alignItems:"center"
    },
    _viewInfo: {
        flex: 1,
        flexDirection: "row",
        // marginTop: 10,
        // marginHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: theme.colors.white,
        borderRadius: 5,
    },
    image: {
        width: sizeImage,
        height: sizeImage,
        marginRight: 3
    },
    _imageAdd: {
        position: "absolute",
        width: sizeImage,
        height: sizeImage,
        top: 0,
        right: 3,
        backgroundColor: "#000",
        opacity: 0.8,
        alignItems: "center",
        justifyContent: "center"
    }
})