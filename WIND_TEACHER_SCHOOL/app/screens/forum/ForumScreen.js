import React, { Component } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import {
    Block,
    WindsHeader,
    BackgroundHeader,
    ScrollableTabView,
    Icon,
    CategoryTopic
} from '@component'
import ModalDialog from '@app/components/ModalDialog'
import R from '@R'
import theme from '@theme'
import ListForumScreen from './ListForumScreen'
import { SCREEN_ROUTER, TOPIC, CATEGORY } from '@constant'
import Mockup from '@app/constants/Mockup'
export class ForumScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topic: TOPIC.NEWS,
            category: CATEGORY.CLASS,
            listClass: Mockup.Class
        }
    }
    showModal = () => {
        // alert('dfdkf')
        this.refDialog.handleVisible()
    }
    render() {
        // console.log(this.state.listClass)
        return (
            <Block>
                <SafeAreaView style={theme.styles.containter}>
                    <BackgroundHeader />
                    <WindsHeader title={R.strings.forum}
                        searchButton
                        onPressSearch={this.showModal}
                    />
                    <ModalDialog ref={(ref) => this.refDialog = ref}>
                        {/* <Text style={{ marginBottom: 25 }}>sjdfkdsjfklsdjfdlks</Text> */}
                        <ScrollView contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'center', 
                            marginHorizontal:10
                        }}
                            showsVerticalScrollIndicator={false}>
                            <CategoryTopic topic={this.state.topic}
                                category={this.state.category}
                                listClass={this.state.listClass}
                                showModal={this.showModal}
                                title={R.strings.filter_post}
                                style={{
                                    // width: theme.dimension.width * 0.9,
                                    backgroundColor: theme.colors.white,
                                    borderRadius: 5,
                                    paddingTop: 5,
                                    // alignSelf: 'center',
                                    // paddingBottom: 20,
                                    // marginTop: 70,
                                }}
                            />
                        </ScrollView>
                    </ModalDialog>


                    <ScrollableTabView>
                        <ListForumScreen tabLabel={R.strings.news} key={0} />
                        <ListForumScreen tabLabel={R.strings.study} key={1} />
                    </ScrollableTabView>
                </SafeAreaView>
            </Block>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ForumScreen)
