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
    Button
} from '@component'
import R from '@R'
import theme from '@theme'
import Ripple from 'react-native-material-ripple';
import { SCREEN_ROUTER } from '@app/constants/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import Mockup from '@app/constants/Mockup'
// import Button from "../components/Button";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";

export class CreateReviewScreen extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const userInfo = navigation.getParam("userInfo");
        this.state = {
            userInfo: userInfo,
            checked: 0,
            note: "",
            isLoading: false,
            error: null
        };
    }
    render() {
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader title='Ý kiến đề xuất' />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
    _renderBody() {
        return (
            <Block style={theme.styles.androidSafeView}>
                <Block
                    style={{
                        marinHorizontal: 21,
                        marginTop: Platform.OS == "android" ? 0 : 15,
                        marginBottom: 18
                    }}
                >
                    <ScrollView contentContainerStyle={{ marginHorizontal: "5%" }}>
                        <Block style={theme.styles.styleBlock}>
                            <View style={{ flexDirection: "row", width: width * 0.9 }}>
                                <Text style={[styles.textTitle]}>Người đề xuất</Text>
                                <Text>:</Text>
                                <Text style={styles.textValue}>Tran Thi Ty</Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    marginTop: "5%",
                                    width: width * 0.9
                                }}
                            >
                                <Text style={[styles.textTitle]}>Học viên</Text>
                                <Text>:</Text>
                                <Text style={styles.textValue}>
                                    {/* {this.state.userInfo.nameStudent} */}
                                    Nguyen Van A
                                </Text>
                            </View>
                        </Block>

                        <Text
                            style={[
                                theme.fonts.bold16,
                                {
                                    flex: 1,
                                    textAlign: "center",
                                    marginTop: 10,
                                    color: theme.colors.primaryText
                                }
                            ]}>Nội dung đề xuất</Text>

                        <View style={{ width: width * 0.9, height: 250, marginTop: 5 }}>
                            <Block row shadow style={styles.block}>
                                <Image
                                    resizeMode="contain"
                                    style={{
                                        alignItems: "flex-start",
                                        marginRight: 5,
                                        width: 20,
                                        height: 20
                                    }}
                                    source={R.images.ic_ball_poin}
                                />
                                <TextInput
                                    // value={this.props.data.note}
                                    onChangeText={value =>
                                        this.setState({ ...this.state, note: value })
                                    }
                                    style={{ flex: 1, textAlignVertical: "top" }}
                                    placeholder={"Ý kiến đề xuất"}
                                    multiline={true}
                                />
                            </Block>
                        </View>

                        <View
                            style={[
                                { marginTop: 30, justifyContent: "center" },
                                styles.width60
                            ]}
                        >
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <RadioGroup
                                    selectedIndex={0}
                                    style={{ flexDirection: "row", justifyContent: "center" }}
                                    color={theme.colors.line}
                                    onSelect={(index, value) => {
                                        // this.onSelect(value);
                                    }}
                                // onSelect={(value) =>{alert(value); this.onSelect(value)}}
                                >
                                    <RadioButton style={{ flex: 1 }} value={0} color={theme.colors.line}>
                                        <Text>Ý kiến đề xuất</Text>
                                    </RadioButton>

                                    <RadioButton style={{ flex: 1 }} value={1} color={theme.colors.line}>
                                        <Text>Ý kiến điểm thi học kì</Text>
                                    </RadioButton>
                                </RadioGroup>
                            </View>
                        </View>

                        <Button
                            title="Gửi"
                            customStyle
                            onPress={() => alert('Thành Công!')}
                        />
                    </ScrollView>
                </Block>
            </Block>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReviewScreen)

const styles = StyleSheet.create({
    block: {
        zIndex: 1000,
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        elevation: 6,
        padding: 10,
        width: width * 0.9,
        marginTop: 10
    },
    textTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: theme.colors.primaryText,
        flex: 1
    },
    textValue: {
        fontSize: 16,
        color: theme.colors.primaryText,
        flex: 2,
        textAlign: "left",
        marginLeft: 8
    }
})