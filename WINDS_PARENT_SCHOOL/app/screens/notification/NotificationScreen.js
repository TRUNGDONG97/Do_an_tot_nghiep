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
    BlockItem
} from '@component'
import theme from '@theme'
import { getListNotification } from '../../constants/Api'
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
                        }]}>15/12/2020</Text>
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
    _renderBody() {
        return (
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
                data={Mockup.listnotifi}
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
});

const mapDispatchToProps = {
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