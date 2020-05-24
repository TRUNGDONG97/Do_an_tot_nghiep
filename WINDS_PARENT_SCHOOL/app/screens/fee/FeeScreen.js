import React, { Component } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    RefreshControl,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import {
    WindsHeader,
    Block,
    BackgroundHeader,
    Button,
    Icon,
    NumberFormat,
    DropdownWindSky,
    Content
} from '@component'
import R from '@R'
import theme from '@theme'
import { SCREEN_ROUTER } from '@app/constants/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import Mockup from '@app/constants/Mockup'

class FeeItem extends Component {
    render() {
        const { item } = this.props
        return (
            <View style={styles._vFeeItem}>
                {this._renderSquareFeeItem(item.studentName, 3, 0.5)}
                {this._renderSquareFeeItem(22, 1)}
                {this._renderSquareFeeItem('Bậc 6', 2)}
                {this._renderSquareFeeItem(null, 2, null, 1000000)}
            </View>
        )
    }
    _renderSquareFeeItem(title, flex, borderLeftWidth, numberFormat) {
        return (
            <View style={[styles._squareFeeItem, { flex: flex, borderLeftWidth: borderLeftWidth }]}>
                {numberFormat ? <NumberFormat
                    color={theme.colors.red}
                    fonts={theme.fonts.bold12}
                    value={numberFormat}
                /> : <Text style={[theme.fonts.regular12, { color: theme.colors.primaryText }]}>{title}</Text>}
            </View>
        )
    }
}
class FeeScreen extends React.Component {
    constructor(props) {
        var month = new Date().getMonth();
        super(props);
        this.state = {
            isRefresh: false,
            month: "Tháng " + (month + 1)
        };
    }

    render() {
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader title="Học phí" />
                    {this.renderBody()}
                </SafeAreaView>
            </Block>
        );
    }

    _renderMonth = () => {
        const month = 12
        var arrMonth = []
        for (let i = 1; i <= month; i++) {
            arrMonth.push("Tháng " + i)
        }
        return arrMonth
    }
    _renderItemUser(title, child) {
        return (
            <Block row style={{ marginTop: 12, alignItems: "center", }}>
                <Text style={[theme.fonts.regular16, { flex: 1, color: theme.colors.primaryText }]}>{title}</Text>
                {child}
            </Block>
        )
    }
    _renderUser() {
        return (
            <Block style={[theme.styles.styleBlock, { paddingHorizontal: 18, paddingBottom: 10 }]}>
                <Content img={R.images.ic_bachelors} title1={"Nguyễn Văn A"} />
                {this._renderItemUser('Tháng:',
                    <DropdownWindSky
                        containerStyle={{ width: theme.dimension.width / 4 }}
                        data={this._renderMonth()}
                        value={this.state.month}
                        label={"Chọn tháng"}
                        valueExtractor={(item, index) => item}
                        onChangeText={text => {
                            this.setState({ ...this.state, month: text });
                            // this.props.getListFeeAction(text);
                        }} />)}
                {this._renderItemUser('Thời gian:',
                    <Text style={[theme.fonts.regular16, { color: theme.colors.primaryText }]}>Thời gian</Text>)}
                {this._renderItemUser('Trạng thái:',
                    <Text style={[theme.fonts.regular16, { color: theme.colors.red }]}>textStatus</Text>)}
            </Block>
        )
    }
    renderBody() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles._vScroll}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefresh}
                        onRefresh={() => {
                            // this._onRefresh();
                        }}
                    />
                }
            >
                {this._renderUser()}
                {this.renderInfo()}
                {this._renderButton()}
            </ScrollView>
        );
    }
    _renderButton() {
        return (
            <Button
                title="Đóng học"
                customStyle
                onPress={() => NavigationUtil.navigate(SCREEN_ROUTER.PAY_FEE)}
                right
            />
        )
    }
    _renderTitleTable() {
        return (
            <View style={[styles.head, { flexDirection: "row", borderTopWidth: 0.5 }]}>
                <View style={[styles._squareFeeItem, { flex: 3, borderLeftWidth: 0.5 }]}>
                    <Text style={styles.textHeader}>Lớp</Text>
                </View>
                <View style={[styles._squareFeeItem, { flex: 1 }]}>
                    <Text style={styles.textHeader}>Buổi</Text>
                </View>
                <View style={[styles._squareFeeItem, { flex: 2 }]}>
                    <Text style={styles.textHeader}>H.Phí</Text>
                </View>
                <View style={[styles._squareFeeItem, { flex: 2 }]}>
                    <Text style={styles.textHeader}>T.Tiền</Text>
                </View>
            </View>
        );
    }

    renderInfo() {
        return (
            <Block style={[theme.styles.styleBlock]}>
                <View style={styles._vTitleInfo}>
                    <Text style={[theme.fonts.bold16, styles._txtDetail]}>Chi tiết</Text>
                </View>
                <FlatList
                    style={{ marginTop: 10, marginHorizontal: 8, marginBottom: 10 }}
                    ListHeaderComponent={
                        this._renderTitleTable()
                    }
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    data={Mockup.listFee}
                    renderItem={({ item, pos }) => {
                        return <FeeItem item={item} pos={pos} />;
                    }}
                />
            </Block>
        );
    }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(FeeScreen);
const styles = {
    title: {
        width: width * 0.475,
        height: 70,
        justifyContent: "space-around",
    },
    head: {
        height: 50,
        backgroundColor: theme.colors.backgroundColorTable
    },
    textHeader: {
        color: theme.colors.primaryText,
        fontWeight: 'bold'
    },
    _squareFeeItem: {
        // flex: 1,
        borderRightWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        // borderRightColor: '#707070',

    },
    _vScroll: {
        marginTop: 20,
        marginHorizontal: "5%",
        justifyContent: "center",
    },
    _vTitleInfo: {
        backgroundColor: theme.colors.orange,
        padding: 10,
        borderRadius: 5
    },
    _txtDetail: {
        color: theme.colors.white,
        fontWeight: 'bold',
        fontSize: 20,
    },
    _vFeeItem: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderBottomColor: '#707070'
    }
};
