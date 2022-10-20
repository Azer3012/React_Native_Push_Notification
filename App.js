import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { notificationListener, requestUserPermission } from './src/utils/pushnotification_helper'

const App = () => {

  useEffect(()=>{
    requestUserPermission()
    notificationListener()
  },[])
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})