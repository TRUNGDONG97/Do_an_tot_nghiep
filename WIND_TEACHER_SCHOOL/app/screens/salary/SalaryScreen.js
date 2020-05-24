import React, { Component } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import {
    Block,
    WindsHeader,
    BackgroundHeader,
    Loading,
    FastImage,
    DropdownWindSky,
    Content,
    NumberFormat,
    Empty
} from '@component'
import R from '@R'
import theme from '@theme'
import Icon from "@component/Icon";
import LinearGradient from 'react-native-linear-gradient'
import { FlatList } from 'react-native-gesture-handler'
import Mockup from '@app/constants/Mockup'

export class SalaryScreen extends Component {
    constructor(props) {
        let month = new Date().getMonth() + 1
        let currentYear = new Date().getFullYear()
        super(props);
        this.state = {
            month: month,
            lop: "Chọn lớp",
            currentMonth: `Tháng ${month}/${currentYear}`
        };
    }



    render() {
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader title={R.strings.salary} />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
    _renderBody() {
        let currentYear = new Date().getFullYear();
        const monthInYear = [
            { value: 1, name: `Tháng 1/${currentYear}` },
            { value: 2, name: `Tháng 2/${currentYear}` },
            { value: 3, name: `Tháng 3/${currentYear}` },
            { value: 4, name: `Tháng 4/${currentYear}` },
            { value: 5, name: `Tháng 5/${currentYear}` },
            { value: 6, name: `Tháng 6/${currentYear}` },
            { value: 7, name: `Tháng 7/${currentYear}` },
            { value: 8, name: `Tháng 8/${currentYear}` },
            { value: 9, name: `Tháng 9/${currentYear}` },
            { value: 10, name: `Tháng 10/${currentYear}` },
            { value: 11, name: `Tháng 11/${currentYear}` },
            { value: 12, name: `Tháng 12/${currentYear}` }
        ];
        const data=Mockup.Salary
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ marginTop: 20,paddingBottom:40 }}
            >
                <View style={styles._vUser}>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Icon.FontAwesome
                            color={theme.colors.backgroundHeader}
                            name={'user-circle-o'}
                            size={30}
                        />
                        <Text style={[theme.fonts.bold25,
                        { marginLeft: 10, color: theme.colors.backgroundHeader }
                        ]}>Trần Thị Tý</Text>
                    </View>
                    <View style={styles._vMonth}>
                        <Content img={R.images.ic_calendar}
                            title={R.strings.month}
                        />
                        <DropdownWindSky
                            containerStyle={{ width: theme.dimension.width / 8 }}
                            data={monthInYear}
                            value={this.state.month}
                            dropdownOffset={{ top: 0, left: 0 }}
                            onChangeText={(value, index, data) => {
                                this.setState({
                                    ...this.state,
                                    month: data[index].value,
                                    currentMonth: data[index].name
                                });
                            }}
                        />
                    </View>

                </View>

                <LinearGradient style={styles.vMonth}
                    colors={["#ff740d", "#f9ad2e"]}
                    start={{ x: 0.7, y: 1 }} //transparent
                    end={{ x: 0, y: 0.1 }}
                >
                    <Text style={[theme.fonts.bold18, { color: theme.colors.white }]}>
                        {this.state.currentMonth}
                    </Text>
                </LinearGradient>
                {this._renderSalaryBold(R.strings.salary_study, data.salaryBasic)}
                {this._renderTable(Mockup.Salary.listSalaryDetail)}
                {this._renderSalary(R.strings.KPI_salary, data.salaryKPI)}
                {this._renderSalary(R.strings.minus_salary, data.salaryMinus)}
                <View style={{
                    height: 1,
                    backgroundColor: theme.colors.backgroundBlue,
                    marginHorizontal: 10
                }} />
                {this._renderSalaryBold(R.strings.sum_salary, data.totalSalary)}

            </ScrollView>

        )
    }
    _renderTable(listSalaryDetail) {
        return (
            <View>
                {this._renderColumnTableTitle()}
                {
                    listSalaryDetail.length == 0 ? (
                        <Empty description='Chưa có lớp nào' />
                ):(
                    listSalaryDetail.map((item,index)=>{
                        return( this._renderColumnTable(item,index))
                    })
                )
             }
            </View>
        )

    }
    _renderColumnTable(item, index) {
        return (
            <View
                style={[styles._vColumn]}
            >
                <View
                    style={[styles.rowTable, { flex: 3, justifyContent: "center" }]}
                >
                    <Text
                        style={[
                            theme.fonts.regular12,
                            { color: theme.colors.fontPrimary }
                        ]}
                    >
                        {item.className}
                    </Text>
                    <Text style={{ color: theme.colors.gray }}>(200k/1 buổi)</Text>
                </View>
                <View style={[styles.rowTable, { flex: 2 }]}>
                    <Text style={theme.fonts.regular12}>{item.totalSesson}</Text>
                </View>
                <View style={[styles.rowTable, { flex: 3 }]}>
                    <NumberFormat
                        colors={theme.colors.black}
                        fonts={theme.fonts.regular12}
                        value={item.salary}
                    />
                </View>
            </View>
        );
    }
    _renderColumnTableTitle() {
        return (
            <View
                style={[
                    styles._vColumn, {
                        borderTopColor: theme.colors.gray,
                        borderTopWidth: 0.5,
                        backgroundColor: theme.colors.backgroundBlue,
                        marginTop:10
                    }
                ]}
            >
                <View
                    style={[styles.rowTable, { flex: 3, justifyContent: "center" }]}
                >
                    <Text
                        style={[
                            theme.fonts.bold16,
                            { color: theme.colors.fontPrimary }
                        ]}
                    >
                        {R.strings.class}
                    </Text>
                  
                </View>
                <View style={[styles.rowTable, { flex: 2 }]}>
                    <Text style={theme.fonts.bold16}>{R.strings.sessons}</Text>
                </View>
                <View style={[styles.rowTable, { flex: 3 }]}>
                    <Text style={theme.fonts.bold16}>{R.strings.tuition}</Text>
                </View>
            </View>
        );
    }
    _renderSalary(title, number) {
        return (
            <View style={styles._vSalary}>
                <Text style={[theme.fonts.regular18, { color: theme.colors.secuiritied }]}>
                    {title}</Text>
                <NumberFormat style={[theme.fonts.regular18,
                { color: theme.colors.activeScrollable }]}
                    value={number}
                />

            </View>
        )
    }
    _renderSalaryBold(title, number) {
        return (
            <View style={styles._vSalary}>
                <Text style={[theme.fonts.bold18, { color: theme.colors.secuiritied }]}>
                    {title}</Text>
                <NumberFormat style={[theme.fonts.bold18,
                { color: theme.colors.activeScrollable }]}
                    value={number}
                />

            </View>
        )
    }
    _handleMonth = () => {
        const month = 12
        var arrMonth = []
        for (let i = 1; i <= month; i++) {
            arrMonth.push('Tháng ' + i)
        }
        return arrMonth
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(SalaryScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: theme.colors.white,
        paddingBottom: 20,
        paddingHorizontal: 15
    },
    head: {
        height: 50,
        backgroundColor: "#A4EBF6"
    },
    wrapper: {
        flexDirection: 'row'
    },
    title: {
        backgroundColor: theme.colors.white
    },
    row: {
        height: 50
    },
    text: {
        textAlign: 'center',
        color: theme.colors.black
    },
    _vUser: {
        // marginTop: 20,
        backgroundColor: "white",
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    _vMonth: {
        flexDirection: "row",
        marginTop: 10
    },
    _txt: {
        marginVertical: 10,
        paddingLeft: 10,
        color: theme.colors.black
    },
    _vSalary: {
        flexDirection: "row",
        justifyContent: "space-between",
        // paddingHorizontal: 10,
        marginTop: 10,
        marginHorizontal: 20

    },
    vMonth: {
        backgroundColor: theme.colors.activeScrollable,
        marginTop: 20,
        paddingVertical: 10,
        marginHorizontal: 15,
        alignItems: 'center',
        borderRadius: 5
    },
    rowTable: {
        borderRightWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        borderRightColor: theme.colors.gray
    },
    _vColumn: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.gray,
        backgroundColor: theme.colors.white,
        borderLeftWidth: 0.5,
        borderLeftColor: theme.colors.gray,
        marginHorizontal:20
    }
});
