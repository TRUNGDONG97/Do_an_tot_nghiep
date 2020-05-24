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
    TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { getListClass } from '@app/redux/actions'
import {
    Block, WindsHeader,
    BackgroundHeader, Loading,
    FastImage, Icon,
    Content,
    Button, AppHeader
} from '@component'
import R from '@R'
import theme from '@theme'
import Ripple from 'react-native-material-ripple';
import { SCREEN_ROUTER } from '@app/constants/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import Mockup from '@app/constants/Mockup'
// import Button from "../components/Button";
// import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";

export class CreateReviewScreen extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        // const userInfo = navigation.getParam("userInfo");
        this.state = {
            // userInfo: userInfo,
            checked: 0,
            note: "",
            isLoading: false,
            error: null
        };
    }
    render() {
        return (
            <Block>
                <AppHeader title={R.strings.add_review} />
                <SafeAreaView style={theme.styles.containter}>
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
    _renderBody() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={styles._vUser}
                >
                    {this._renderUserItem(R.strings.name, 'Trần Thị Tý')}
                    {this._renderUserItem(R.strings.class, 'JAV')}
                </View>
                <Text style={[theme.fonts.bold20,
                {
                    color: theme.colors.activeScrollable,
                    alignSelf: 'center',
                    marginTop: 20
                }]}>
                    {R.strings.add_review}</Text>
                <View style={styles._vNote}>
                    <Image
                        resizeMode="contain"
                        style={styles._imgPen}
                        source={R.images.ic_ball_point_pen_filled}
                    />
                    <TextInput
                        // value={this.props.data.note}
                        onChangeText={value =>
                            this.setState({ ...this.state, note: value })
                        }
                        style={{ flex: 1, textAlignVertical: "top" }}
                        placeholder={R.strings.note_class}
                        multiline={true}
                    />
                </View>
                <Button style={{alignSelf: 'center',marginTop:60,}} title={R.strings.save}/>
            </ScrollView>
        )
    }
    _renderUserItem(title, text) {
        return (
            <View style={{ flexDirection: "row", paddingVertical: 5 }}>
                <Text style={[theme.fonts.medium15, {
                    color: theme.colors.backgroundHeader,
                    width: 100
                }]}>{title}</Text>
                <Text style={[theme.fonts.medium15, {
                    color: theme.colors.backgroundHeader,
                    flex: 1,
                }]}>:  {text}</Text>

            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReviewScreen)

const styles = StyleSheet.create({
    _vUser: {
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: "white",
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    _vNote: {
        marginHorizontal: 15,
        height: 200,
        marginTop: 15,
        backgroundColor: theme.colors.white,
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    _imgPen: {
        alignItems: "flex-start",
        marginRight: 5,
        marginTop: 10,
        width: 15,
        height: 15,
        resizeMode: "contain"
    },
})