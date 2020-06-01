import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList, RefreshControl, Image } from 'react-native'
import { connect } from 'react-redux'
import {
    Block, WindsHeader,
    BackgroundHeader, Loading,
    FastImage, AbsentItem,Empty
} from '@app/components'
import R from '@R'
import theme from '@theme'
import Icon from "@component/Icon";
import Ripple from 'react-native-material-ripple';
import Mockup from '@app/constants/Mockup'
import reactotron from 'reactotron-react-native'
import { getListAbsent } from '@action'
export class ListAbsentScreen extends Component {
    state = {
        isRefresh: false,
    };
    componentDidMount() {
        this.props.getListAbsent()
    }

    render() {
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader title='Điểm danh' />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        )
    }
    _renderBody() {
        const { listAbsentState } = this.props
        reactotron.log('listAbsentState', listAbsentState)
        if (listAbsentState.isLoading) return <Loading />;
        if (listAbsentState.error)
            return (
                <Error
                    onPress={() => {
                        this.props.getListAbsent();
                    }}
                />
            );
        if (listAbsentState.data.length == 0)
            return <Empty description={"Chưa có lớp nào"}
            />
        return (
            <Block flex={1} style={{ marginTop: 20 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10,paddingBottom:20 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefresh}
                            onRefresh={() => {
                                this.props.getListAbsent();
                            }}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    data={listAbsentState.data}
                    renderItem={({ item, pos }) => {
                        return <AbsentItem item={item} pos={pos} />;
                    }}
                />
                {/* </Block> */}
            </Block>
        )
    }
}

const mapStateToProps = (state) => ({
    listAbsentState: state.listAbsentReducer
})

const mapDispatchToProps = {
    getListAbsent
}

export default connect(mapStateToProps, mapDispatchToProps)(ListAbsentScreen)
