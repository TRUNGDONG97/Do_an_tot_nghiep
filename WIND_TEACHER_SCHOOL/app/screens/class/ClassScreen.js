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
import reactotron from 'reactotron-react-native'


class ClassScreen extends Component {
    state = {
        isRefresh: false,
        deviceID: ""
    };
    componentDidMount(){
        this.props.getListClass()
    }
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
        const { classListState } = this.props
        reactotron.log('classListState', classListState)
        if (classListState.isLoading) return <Loading />;
        if (classListState.error)
            return (
                <Error
                    onPress={() => {
                        this.props.getListClass();
                    }}
                />
            );
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
                                this.props.getListClass();
                            }}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    data={classListState.data}
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
    getListClass
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassScreen)
