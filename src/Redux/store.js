import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleWare from 'redux-saga';

import reducerRoot from './reducerRoot';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleWare();
export const middleWares = [thunk, sagaMiddleware, logger];

export const store = createStore(reducerRoot, applyMiddleware(...middleWares),); 
sagaMiddleware.run(rootSaga);

// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
//for the redux dev tools


export default store;
