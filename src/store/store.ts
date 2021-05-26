import { createStore } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    persistStore,
    persistReducer
} from 'redux-persist'

import {dataReducer} from './dataReducer'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer<any, any>(persistConfig, dataReducer)

export const store = createStore(persistedReducer)

export const persistor = persistStore(store)
