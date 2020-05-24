import React, { Component } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    RefreshControl
} from 'react-native'
import { connect } from 'react-redux'
import R from '@R'
import theme from '@theme'
import {
    Block,
    WindsHeader,
    BackgroundHeader,
    DropdownWindSky,
    Content
} from '@component'
import AsyncStorage from '@react-native-community/async-storage'
import NavigationUtil from '@app/navigation/NavigationUtil'
import { SCREEN_ROUTER } from '@app/constants/Constant'
import AutoHeightImage from 'react-native-auto-height-image'
import Ripple from 'react-native-material-ripple';
const CLASSES = [
    "JAVA",
    "DOTNET",
    "RN",
    "ANDROID",
    "IOS",
];
export class StudyScreen extends Component {
    constructor(props) {
        var month = new Date().getMonth();
        super(props);
        this.state = {
            refreshing: false,
            month: "Tháng " + (month + 1),
            lop: "Chọn lớp"
        };
    }

    render() {
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader title={R.strings.study} />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
    _renderMonth = () => {
        const month = 12
        var arrMonth = []
        for (let i = 1; i <= month; i++) {
            arrMonth.push("Tháng " + i)
        }
        return arrMonth
    }
    _renderBody() {
        const { month, lop } = this.state
        return (
            <Block style={theme.styles.androidSafeView}>
                <Block
                    style={{
                        marinHorizontal: 21,
                        marginTop: Platform.OS == "android" ? 0 : 15,
                        marginBottom: 18
                    }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            marginHorizontal: "5%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => {
                                    // this._onRefresh();
                                }}
                            />
                        }
                    >
                        <Block style={
                            [theme.styles.styleBlock,
                            {
                                paddingHorizontal: 10,
                                width: width * 0.95,
                            }]
                        }>
                            <Block row style={{
                                //width: width * 0.9,
                                alignItems: "center",
                                paddingHorizontal: 8,
                                marginBottom: 10
                            }}>
                                <Content img={R.images.ic_bachelors} title1={R.strings.class} />
                                <DropdownWindSky
                                    containerStyle={{ width: theme.dimension.width / 3 }}
                                    data={CLASSES}
                                    value={lop}
                                    label={"Chọn tháng"}
                                    valueExtractor={(item, index) => item}
                                    onChangeText={text => {
                                        this.setState({ ...this.state, lop: text });
                                        // this.props.getListFeeAction(text);
                                    }}
                                />
                            </Block>

                            <Block row style={{
                                //width: width * 0.9,
                                alignItems: "center",
                                paddingHorizontal: 8,
                            }}>
                                <Content img={R.images.ic_calendar} title1={R.strings.month} />
                                <DropdownWindSky
                                    containerStyle={{ width: theme.dimension.width / 3 }}
                                    data={this._renderMonth()}
                                    value={month}
                                    label={"Chọn tháng"}
                                    valueExtractor={(item, index) => item}
                                    onChangeText={text => {
                                        this.setState({ ...this.state, month: text });
                                        // this.props.getListFeeAction(text);
                                    }}
                                />
                            </Block>
                        </Block>
                        {this.renderInfo()}
                        {this.renderInfo()}
                        {this.renderInfo()}
                    </ScrollView>
                </Block>
            </Block>
        )
    }

    renderInfo() {
        return (
            <Block
                style={{
                    width: width * 0.95,
                    marginTop: 10,
                    flex: 1,
                    backgroundColor: "white",
                    borderRadius: 4
                }}
            >
                <Block style={[theme.styles.styleBlockHeader]}>
                    <Text style={(theme.fonts.bold16, { color: "white", fontWeight: 'bold', fontSize: 20 })}>Chi tiết</Text>
                </Block>
                <View style={{ paddingVertical: 10, paddingHorizontal: 16 }}>
                    <Content img={R.images.ic_calendar} title1={"Lớp Đại số 10"} />
                    <Content img={R.images.ic_location} title1={"9:00- 10:00 Phòng 2 tầng 2 - CS1"} />
                    <Content img={R.images.ic_check} title1={"Đi học"} />
                    <Content img={R.images.ic_note} title1={"Lớp Đại số 10"} />
                </View>
            </Block>
        );
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(StudyScreen)
