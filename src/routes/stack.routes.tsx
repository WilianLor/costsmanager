import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomePage from '../pages/HomePage'
import AddCategory from '../pages/AddCategory'
import RemoveCategory from '../pages/RemoveCategory'
import CategoryPage from '../pages/CategoryPage'
import AddCosts from '../pages/AddCosts'

const stackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode="none"
    >
        <stackRoutes.Screen 
            name="Home"
            component={HomePage}
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
            name="CategoryPage"
            component={CategoryPage}
        />
        <stackRoutes.Screen
            name="AddCosts"
            component={AddCosts}
        />
    </stackRoutes.Navigator>
)

export default AppRoutes