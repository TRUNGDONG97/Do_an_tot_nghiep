import React, { Component } from 'react'
import {
    Text, View, StyleSheet,
    ActivityIndicator
} from 'react-native'
import { Avatar } from "react-native-elements";
import {
    FastImage,
    Icon,
    Block,
    ActionSheet
} from '@component'
import theme from '@theme'
import R from '@R';
const sizeDot = 5
export default class CommentItem extends Component {

    render() {
        const { item, index, avartar_url, account_name, created_date } = this.props
        // console.log(item, 'item')
        return (
            <View style={{ marginTop: 10, marginHorizontal: 20 }}>
                <View
                    style={styles._viewInfo}
                >
                    <Avatar
                        rounded
                        source={{
                            uri: avartar_url
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
                            {account_name}
                        </Text>

                        <Text style={[theme.fonts.bold12, { color: theme.colors.black2, flex: 1 }]}>
                            {created_date + ' phút trước'}
                        </Text>
                    </Block>
                </View>
                <Text style={[theme.fonts.regular14, { marginLeft: 50 }]}>{item}</Text>
                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginLeft: 45,
                    marginTop:5
                }}>
                    <View style={{
                        height: sizeDot,
                        width: sizeDot,
                        borderRadius: sizeDot,
                        backgroundColor: 'black',
                        marginLeft: 5
                    }}></View>
                    <Text style={[theme.fonts.regular12, { marginLeft: 5 }]} >{R.strings.like}</Text>
                    <View style={{
                        height: sizeDot,
                        width: sizeDot,
                        borderRadius: sizeDot,
                        backgroundColor: 'black', marginLeft: 10
                    }}></View>
                    <Text style={[theme.fonts.regular12, { marginLeft: 5 }]} >{R.strings.commention}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    _viewInfo: {
        flex: 1,
        flexDirection: "row",
        // marginTop: 10,
        // marginHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: theme.colors.white,
        borderRadius: 5,
    }
})