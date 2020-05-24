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
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import { getListClass } from '@app/redux/actions'
import {
    Block, WindsHeader,
    BackgroundHeader, Loading,
    FastImage, Icon,
    Content,
} from '@component'
import R from '@R'
import theme from '@theme'
import Ripple from 'react-native-material-ripple';
import { SCREEN_ROUTER } from '@app/constants/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import Mockup from '@app/constants/Mockup'

export default class PayFeeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectBank: false,
            indexSel: -1
        };
    }
    render() {
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader title='Đóng học phí' />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
    _renderBody() {
        return (
            <View style={styles._vContainner}>
                <ScrollView
                    contentContainerStyle={styles._vScroll}>
                    <Text style={[theme.fonts.regular16, styles._txtTitle]}>Chọn ngân hàng</Text>
                    <View style={{ flexDirection: "row" }}>
                        <FlatList
                            horizontal={true}
                            style={{ flex: 0 }}
                            showsHorizontalScrollIndicator={false}
                            data={Mockup.ListIamgeBank}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item, index }) => {
                                return (
                                    <BankItem
                                        item={item}
                                        index={index}
                                        itemSelected={this.state.indexSel}
                                        onSelect={() => {
                                            this.setState({
                                                ...this.state,
                                                isSelectBank: true,
                                                indexSel: index,
                                            });
                                        }}
                                    />
                                );
                            }}
                        />
                    </View>
                    {this.state.isSelectBank
                        ? this._renderInfoBank(this.state.indexSel)
                        : <Text style={[theme.fonts.regular16, { marginTop: 10, marginLeft: 10 }]}>Bạn cần phải chọn ngân hàng</Text>}
                </ScrollView>
            </View>
        )
    }
    _renderInfoBank(index) {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                    style={[theme.fonts.regular16,
                    { color: '#F58634', marginTop: 20 }]}>Vui lòng thực hiện chuyển khoản với thông tin bên dưới</Text>
                <View style={styles._background}>
                    <View
                        style={{
                            marginLeft: 10,
                            width: "40%",
                            height: "100%",
                            justifyContent: "space-around"
                        }}
                    >
                        <Text style={theme.fonts.regular16}>Ngân hàng:</Text>

                        <Text style={theme.fonts.regular16}>Chi nhánh:</Text>

                        <Text style={theme.fonts.regular16}>Chủ tài khoản:</Text>

                        <Text style={theme.fonts.regular16}>Số tài khoản:</Text>
                    </View>

                    <View
                        style={{
                            marginLeft: 15,
                            width: "60%",
                            height: "100%",
                            justifyContent: "space-around"
                        }}
                    >
                        <Text style={theme.fonts.regular16}>
                            {Mockup.ListIamgeBank[index].bankName}
                        </Text>

                        <Text style={theme.fonts.regular16}>
                            {Mockup.ListIamgeBank[index].branch}
                        </Text>

                        <Text style={theme.fonts.regular16}>
                            {Mockup.ListIamgeBank[index].ownerName}
                        </Text>

                        <Text style={theme.fonts.regular16}>
                            {Mockup.ListIamgeBank[index].accountNumber}
                        </Text>
                    </View>

                </View>

                <View
                    style={{
                        width: theme.dimension.width * 0.95,
                        marginTop: 30,
                        height: 150,
                        marginBottom: 10,
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                >
                    <Block row shadow style={styles.block}>
                        <Image
                            resizeMode="contain"
                            style={{
                                alignItems: "flex-start",
                                marginRight: 5,
                                width: 20,
                                height: 20
                            }}
                            source={require("../../assets/images/icons8_ball_point_pen_filled_50px3x.png")}
                        />
                        <Text
                            style={{
                                height: 100,
                                textAlignVertical: "top",
                                paddingRight: 20
                            }}
                            multiline={true}
                        >
                            {Mockup.ListIamgeBank[index].content}
                        </Text>
                    </Block>
                </View>
            </View>
        )
    }
}

class BankItem extends React.Component {

    render() {
        const { index, item, itemSelected, onSelect } = this.props;
        isSelected = index === itemSelected;
        borderSel = isSelected ? "#D63649" : "#000";
        return (
            <TouchableOpacity
                style={[styles._bankItem, { borderColor: borderSel, borderWidth: isSelected ? 3 : 1 }]}
                onPress={onSelect}>
                <Image
                    source={item.urllogo}
                    style={{
                        resizeMode: "contain",
                        width: "100%",
                        height: '90%'
                    }} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    _background: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: "white",
        width: width * 0.95,
        height: 150,
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "white"
    },
    _bankItem: {
        height: theme.dimension.height * 0.1,
        width: theme.dimension.width * 0.3,
        marginHorizontal: 7,
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: "#fff"
    },
    block: {
        zIndex: 1000,
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        elevation: 6,
        padding: 10
    },
    _vContainner: {
        flex: 1,
        marginTop: width * 0.02,
        backgroundColor: theme.colors.white
    },
    _vScroll: {
        marginTop: Platform.OS == 'android' ? 65 : 20,
        flexGrow: 1,
    },
    _txtTitle: {
        color: '#F58634',
        marginBottom: 10,
        marginLeft: 10,
    }
})
