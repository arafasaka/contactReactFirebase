import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { View, Text } from 'react-native'
import Router from './router'

const App = () => {
  return (
  <NavigationContainer>
    <Router/> 
  </NavigationContainer>
  )
}

export default App
