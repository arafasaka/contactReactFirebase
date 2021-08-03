import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import {DetailKontak, Home, TambahKontak, EditKontak} from '../pages';



const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Tambah" component={TambahKontak} />
            <Stack.Screen name="Detail" component={DetailKontak} />
            <Stack.Screen name="Edit" component={EditKontak} />
        </Stack.Navigator>
    )
}

export default Router
