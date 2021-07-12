import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignUp from '../screens/SignUp'

const stackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode="none"
    >
        <stackRoutes.Screen 
            name="SignUp"
            component={SignUp}
        />
    </stackRoutes.Navigator>
)

export default AppRoutes