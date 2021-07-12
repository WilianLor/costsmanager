import React from 'react'

import {
    SafeAreaView,
    StyleSheet,
    View,
    ScrollView,
} from 'react-native'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import Header from '../components/Header'


const RemoveCategory: React.FC = () => {

    return (
        <SafeAreaView style={styles.removeCategory}>
            <Header pageTitle="Remover categoria"/>
            <View style={styles.content}>
                <ScrollView style={{borderRadius: 8}}>
                    
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    removeCategory : {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.background
    },
    content: {
        width: '100%',
    },
    button: {
        padding: 10,
        height: 45,
        width: 45
    },
    errorContent: {
        marginBottom: 10,
        fontFamily: fonts.heading,
        fontSize: 18,
        color: colors.red
    },
    confirmButton: {
        backgroundColor: colors.green,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.green_light
    },
    input: {
        lineHeight: 10,
        fontFamily: fonts.text,
        fontSize: 16,
        backgroundColor: colors.shape,
        color: colors.body_dark,
        padding: 10,
        width: 220,
        borderRadius: 8
    }
})

export default RemoveCategory