import React from 'react'

import Routes from './src/routes'

import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost'
import AppLoading from 'expo-app-loading'

import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import {
  store, 
  persistor
} from './src/store/store'

const App = () => {

  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  if(!fontsLoaded){
    return <AppLoading />
  }
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>  
    </Provider>
  )
}

export default App
