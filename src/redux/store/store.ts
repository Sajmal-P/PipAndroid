import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {rootReducer} from './root.reducer';
import {rootSaga} from './root.saga';
import createSagaMiddleware from 'redux-saga';
import MMKVStorage from "react-native-mmkv-storage";
import logger from 'redux-logger';

const storage = new MMKVStorage.Loader().initialize();
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, ...getDefaultMiddleware({
    serializableCheck: false
  })];
  
const persistConfig = {
    key: 'root',
    storage: storage,
     whitelist: ['theme'] , 
     blacklist: [],
    debug: true,
    devTools: process.env.NODE_ENV !== 'production'
};

if (__DEV__) {
    middleware.push(logger);
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

 const persistor = persistStore(store)

export { store ,persistor};