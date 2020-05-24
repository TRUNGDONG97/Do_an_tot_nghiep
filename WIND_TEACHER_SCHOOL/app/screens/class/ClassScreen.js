import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList, RefreshControl, Image } from 'react-native'
import { connect } from 'react-redux'
import { getListClass } from '@action'
import {
    Block, WindsHeader,
    BackgroundHeader, Loading,
    FastImage, ClassItem
} from '@app/components'
import R from '@R'
import theme from '@theme'
import Icon from "@component/Icon";
import Ripple from 'react-native-material-ripple';
import Mockup from '@app/constants/Mockup'


class ClassScreen extends Component {
    state = {
        isRefresh: false,
        deviceID: ""
    };

    render() {
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader title={R.strings.class} />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        );
    }
    _renderBody() {

        return (
            <Block flex={1} style={{marginTop:20}}>
                {/* <Block style={{ marginTop: Platform.OS == "android" ? 0 : 15, paddingBottom: 15 }}> */}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefresh}
                            onRefresh={() => {
                                // this._onRefresh();
                            }}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    data={Mockup.Class}
                    renderItem={({ item, pos }) => {
                        return <ClassItem item={item} pos={pos} />;
                    }}
                />
                {/* </Block> */}
            </Block>
        );
    }

}


const mapStateToProps = (state) => ({
    classListState: state.classListReducer,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ClassScreen)
