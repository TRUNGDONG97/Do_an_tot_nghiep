import React, { Component } from 'react'
import { Text, View , SafeAreaView} from 'react-native'
import Placeholder, { Line, Media, ImageContent } from "rn-placeholder";

export default class FBLoading extends Component {
    render() {
        return (

            <SafeAreaView style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white'
            }}>
                <View style={{
                    flex: 1,
                    width: "90%"
                }}>

                    {[...Array(8).keys()].map((index) =>
                        <Placeholder
                            isReady={false}
                            animation="fade"
                            renderLeft={() => <Media hasRadius />}
                            key={index.toString()}
                        // renderRight={() => <Media />}
                        >
                            <Line width="70%" />
                            <Line width="30%" />
                            <View style={{
                                width: "100%",
                                height: 1,
                                backgroundColor: '#e1e1e1'
                            }}></View>
                        </Placeholder>

                    )}
                </View>

            </SafeAreaView>


        );
    }
}
