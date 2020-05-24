import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'
import {NativeModules} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

let scriptHostname = 'localhost';
if (__DEV__) {
    const scriptURL = NativeModules.SourceCode.scriptURL;
    scriptHostname = scriptURL.split('://')[1].split(':')[0];
}

const reactotron = Reactotron
    .configure({host:scriptHostname})
    // .configure("RN Base")
    .use(reactotronRedux())
    // .setAsyncStorageHandler(AsyncStorage) 
    .useReactNative({
        networking: {
            ignoreUrls: /symbolicate/,
        }
    })
    .use(sagaPlugin())
    .connect()

console.tron = Reactotron;
export default reactotron
