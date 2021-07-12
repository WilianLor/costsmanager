import React from 'react'

import Routes from './src/routes'

import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost'
import AppLoading from 'expo-app-loading'

import AuthContextProvider from './src/contexts/AuthContext'

import './src/services/firebase'

const App = () => {

  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  if(!fontsLoaded){
    return <AppLoading />
  }
  
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  )
}

export default App
