import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    RefreshControl,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import { getListClass } from '@app/redux/actions'
import {
    Block, WindsHeader,
    BackgroundHeader, Loading,
    FastImage, Icon,
    Content,
    ClassItem
} from '@component'
import R from '@R'
import theme from '@theme'
import Ripple from 'react-native-material-ripple';
import { SCREEN_ROUTER } from '@app/constants/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import Mockup from '@app/constants/Mockup'
class ClassScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefresh: false,
        };
    }
    render() {
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader title='Lớp học' />
                    {this.renderBody()}
                </SafeAreaView>
            </Block>
        );
    }

    renderBody() {
        return (
            <Block style={theme.styles.androidSafeView}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10, marginTop: 20 }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefresh}
                            onRefresh={() => {
                                // this._onRefresh();
                            }}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    data={Mockup.listClass}
                    renderItem={({ item, pos }) => {
                        return <ClassItem item={item} pos={pos} />;
                    }}
                />
            </Block>
        )
    }
}

const mapStateToProps = (state) => ({
    classListState: state.classListReducer,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ClassScreen)
