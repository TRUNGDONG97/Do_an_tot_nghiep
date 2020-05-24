import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import Reactotron from '../../debug/ReactotronConfig'
const sagaMonitor = Reactotron.createSagaMonitor()
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
});
const store = createStore(
    reducers,
    {},
    composeEnhancers(
        applyMiddleware(sagaMiddleware),
        Reactotron.createEnhancer()
    )

);
sagaMiddleware.run(rootSaga);

export default store;
