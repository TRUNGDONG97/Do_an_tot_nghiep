import React, { Component } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    RefreshControl,
    FlatList,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import R from '@R'
import {
    Block,
    WindsHeader,
    BackgroundHeader,
    Icon,
    BlockItem,
    Loading,
    Empty,
    Error
} from '@component'
import theme from '@theme'
import { getListNotifyAction } from '@action'
import { ScrollView } from 'react-native-gesture-handler'
import Mockup from '@app/constants/Mockup'
import Ripple from 'react-native-material-ripple';
class FlatListItem extends Component {
    render() {
        const { item } = this.props;
        return (
            <Ripple
                style={styles._vItem}
                rippleDuration={800}
                rippleSequential={true}
                onPress={() => {
                    // NavigationUtil.navigate(SCREEN_ROUTER.STUDY)
                }}>
                <Icon.Ionicons
                    name="md-notifications"
                    size={35}
                    color="#F58634"
                />
                <View style={styles._txtTitle}>
                    <Text
                        numberOfLines={2}
                        style={[theme.fonts.bold15, {
                            color: theme.colors.backgroundHeader,
                            width: '90%'
                        }]}>
                        {item.content}
                    </Text>
                    <Text
                        style={[theme.fonts.regular14, {
                            color: theme.colors.gray,
                            marginTop: 5
                        }]}>{item.created_date.split("-").reverse().join("/")}</Text>
                </View>
            </Ripple>
        );
    }
}
class NotificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefresh: false
        };
    }
    componentDidMount(){
        this.props.getListNotifyAction()
    }
    _renderBody() {
        const { notificationState } = this.props
        // reactotron.log('notificationState', notificationState)
        if (notificationState.isLoading) return <Loading />;
        if (notificationState.error)
            return (
                <Error
                    onPress={() => {
                        this.props.getListNotifyAction();
                    }}
                />
            );
        if (notificationState.data.length == 0) return <Empty />
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10, marginTop: 20 ,paddingBottom:50}}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefresh}
                        onRefresh={() => {
                            this.props.getListNotifyAction();
                            // this._onRefresh();
                        }}
                    />
                }
                keyExtractor={(item, index) => index.toString()}
                data={notificationState.data}
                renderItem={({ item, pos }) => {
                    return <FlatListItem item={item} pos={pos} />;
                }}
            />
        );
    }
    render() {
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader title={R.strings.notification} />
                    {this._renderBody()}
                </SafeAreaView>
            </Block>
        );
    }
}
const mapStateToProps = state => ({
    notificationState: state.listNotifyReducer
});

const mapDispatchToProps = {
    getListNotifyAction
};
export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);

const styles = StyleSheet.create({
    _vItem: {
        marginTop: 10,
        backgroundColor: theme.colors.white,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    _txtTitle: {
        justifyContent: 'center',
        marginLeft: 10,

    }
})