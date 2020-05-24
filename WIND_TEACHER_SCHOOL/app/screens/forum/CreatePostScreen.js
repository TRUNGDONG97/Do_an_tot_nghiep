import React, { Component } from 'react'
import {
    View, Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import {
    Block,
    WindsHeader,
    BackgroundHeader,
    ScrollableTabView,
    Icon,
    CategoryTopic,
    AppHeader
} from '@component'
import R from '@R'
import theme from '@theme'
import { SCREEN_ROUTER, TOPIC, CATEGORY, TYPE } from '@constant'
import NavigationUtil from '@app/navigation/NavigationUtil'
import Mockup from '@app/constants/Mockup'
export class CreatePostScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topic: TOPIC.NEWS,
            category: CATEGORY.CLASS,
            listClass: Mockup.Class
        }
    }
    render() {
        const type = this.props.navigation.getParam('type')
        return (
            <Block >

                {/* <BackgroundHeader /> */}
                <AppHeader title={type == TYPE.CREATE_POST ? R.strings.create_post : R.strings.edit_post} />
                <SafeAreaView style={theme.styles.containter}>
                    {this._renderBody()}
                    <TouchableOpacity style={styles._viewCreatePost}
                        onPress={() => {
                            NavigationUtil.navigate(SCREEN_ROUTER.POST)
                        }}
                    >
                        <Icon.MaterialIcons name='add' color={theme.colors.white} size={25} />
                        <Text style={[theme.fonts.bold15,
                        {
                            marginLeft: 2, color: theme.colors.white
                        }]}>
                            {R.strings.continue}</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Block>
        )
    }
    _renderBody() {
        return (
            <ScrollView style={{ marginHorizontal: 10, marginTop: 5 }}
            showsVerticalScrollIndicator={false}
            >
                <CategoryTopic topic={this.state.topic}
                    category={this.state.category}
                    // showModal={this.showModal}
                    listClass={this.state.listClass}
                    title={R.strings.chose_category}
                />
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostScreen)
const styles = StyleSheet.create({
    _viewCreatePost: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 40,
        flexDirection: 'row',
        backgroundColor: theme.colors.activeScrollable,
        height: 40,
        // width: 100,
        borderRadius: 5,
        padding: 10,
        alignSelf: 'center'
    }
})