import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import AddCategory from '../screens/AddCategory'
import RemoveCategory from '../screens/RemoveCategory'
import Category from '../screens/Category'
import AddCosts from '../screens/AddCosts'

const stackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode="none"
    >
        <stackRoutes.Screen 
            name="Home"
            component={Home}
        />
        <stackRoutes.Screen 
            name="AddCategory"
            component={AddCategory}
        />
        <stackRoutes.Screen 
            name="RemoveCategory"
            component={RemoveCategory}
        />
        <stackRoutes.Screen
            name="Category"
            component={Category}
        />
        <stackRoutes.Screen
            name="AddCosts"
            component={AddCosts}
        />
    </stackRoutes.Navigator>
)

export default AppRoutes