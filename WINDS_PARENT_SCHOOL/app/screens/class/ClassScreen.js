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
import { getListClassAction } from '@app/redux/actions'
import {
    Block, WindsHeader,
    BackgroundHeader, Loading,
    FastImage, Icon,
    Content,
    ClassItem,
    Empty
} from '@component'
import R from '@R'
import theme from '@theme'
import Ripple from 'react-native-material-ripple';
import { SCREEN_ROUTER } from '@app/constants/Constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import Mockup from '@app/constants/Mockup'
import reactotron from 'reactotron-react-native'
class ClassScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefresh: false,
        };
    }
    async componentDidMount() {
       await this.props.getListClassAction();
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
        const { classListState } = this.props
        reactotron.log('classListState', classListState)
        if (classListState.isLoading) return <Loading />;
        if (classListState.error)
            return (
                <Error
                    onPress={() => {
                        this.props.getListClassAction();
                    }}
                />
            );
        if(classListState.data.length==0) return <Empty description={"Chưa có lớp nào"}/>
            // reactotron.log('room_name', classListState.data[0].Schedule_classes[0].room_name)
        return (
            <Block flex={1} style={{marginTop:40}}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10,paddingBottom:20}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefresh}
                            onRefresh={() => {
                                this.props.getListClassAction();
                            }}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    data={classListState.data}
                    renderItem={({ item, pos }) => {
                        return <ClassItem item={item} pos={pos} />;
                    }}
                />
            </Block>
        )
    }
}

const mapStateToProps = (state) => ({
    classListState: state.listClassReducer,
})

const mapDispatchToProps = {
    getListClassAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassScreen)
