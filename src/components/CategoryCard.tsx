import React from 'react'
import {
    StyleSheet,
    Text,
} from 'react-native'

import { useNavigation } from '@react-navigation/core'
import { MaterialIcons } from '@expo/vector-icons'

import {
    RectButton
} from 'react-native-gesture-handler'
import fonts from '../styles/fonts'
import colors from '../styles/colors'

interface data {
    value?: string,
    title: string,
    type: number,
    categoryId: string,
}

const CategoryCard: React.FC<data> = (props) => {

    const navigation = useNavigation()

    switch(props.type) {
        case 0: 
            return (
                <RectButton style={styles.card}>
                    <Text style={styles.title}>{props.title}</Text>
                    {props.children}
                </RectButton>
            )
        case 1:
            return (
                <RectButton style={styles.card} onPress={() => navigation.navigate('CategoryPage', {id: props.categoryId, title: props.title})}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.value}>R$ {props.value}</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color={colors.body_dark} />
                </RectButton>
            )
        default:
            return <></>
    }
}

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
        height: 10,
        borderRadius: 8,
        padding: 30,
        backgroundColor: colors.shape,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    title: {
        fontSize: 18,
        fontFamily: fonts.text,
        color: colors.body_dark
    },
    value: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_dark
    },
    button: {
        padding: 10,
        height: 45,
        width: 45
    },
})

export default CategoryCard