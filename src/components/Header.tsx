import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import {
    StyleSheet, 
    View,
    Text
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface HeaderProps {
    pageTitle: string
}

const Header = ({pageTitle}: HeaderProps) => {

    const navigation = useNavigation()

    return (
        <View style={styles.header}>
            <RectButton style={styles.button} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={26} color={colors.heading} />
            </RectButton>
            <Text style={styles.headerText}>{pageTitle}</Text>
        </View>
)}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 30,
        paddingHorizontal: '5%',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    content: {
        display: 'flex',
        alignItems: 'center',

    },
    button: {
        marginRight: '10%',
        padding: 10
    },
    headerText: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading
    },
})

export default Header