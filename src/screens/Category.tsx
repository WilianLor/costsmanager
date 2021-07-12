import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    SafeAreaView
} from 'react-native'

import Header from '../components/Header';

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { RectButton } from 'react-native-gesture-handler'

const Category = (prop: any) => {

    const getDate = (date: Date) => {

        let dia  = date.getDate().toString()
        let diaF = (dia.length === 1) ? '0'+dia : dia
        let mes  = (date.getMonth()+1).toString() 
        let mesF = (mes.length === 1) ? '0'+mes : mes
        let anoF = date.getFullYear()

        return diaF+" / "+mesF+" / "+anoF;
    }

    return (
        <SafeAreaView style={styles.categotyPage}>
            <Header pageTitle="Categoria de custos"/>
            <View style={styles.headerCosts}>
                <Text style={styles.headerTitle}>Teste</Text>
                <Text style={styles.headerValue}>R$ 1000</Text>
            </View>
            <View style={styles.costsList}>
                <View style={styles.listHeader}>
                    <Text style={styles.listHeaderTitle}>Custos</Text>
                </View>
                <ScrollView style={{borderRadius: 8}}>
                    
                </ScrollView>
            </View>
            <View style={styles.buttons}>
                <RectButton style={styles.newCostsButton} ><Text style={styles.buttonText}>Adicionar{'\n'}Custo</Text></RectButton>
            </View>
        </SafeAreaView>
    )
} 

const styles = StyleSheet.create({
    paidLabel: {
        marginRight: 5,
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_dark
    },
    checkBoxContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    categotyPage: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.background
    },
    buttonText: {
        color: colors.green_light,
        fontFamily: fonts.heading,
        fontSize: 16
    },
    headerTitle: {
        fontSize: 30,
        color: colors.body_dark,
        fontFamily: fonts.heading,
    },
    headerValue: {
        fontSize: 20,
        color: colors.body_dark,
        fontFamily: fonts.complement,
    },
    deleteButton: {
        padding: 10,
        height: 45,
        width: 45
    },
    headerCosts: {
        width: '90%',
        marginLeft: '20%',
        marginRight: '5%',
        flex: 1,
        justifyContent: 'center',
    },
    costsList: {
        width: '100%',
        height: '59%',
    },
    listHeader: {
        display: 'flex',
        flexDirection: 'row',
        width: '95%',
        height: 30,
        paddingHorizontal: '13%',
        justifyContent: 'space-between'
    },
    listHeaderTitle: {
        color: colors.body_dark,
        fontFamily: fonts.heading,
        fontSize: 24
    },
    buttons: {
        margin: 10,
        width: '100%',
        height: '10%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    newCostsButton: {
        width: '35%',
        padding: 5,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: colors.green,
        textAlign: 'center'
    },
})

export default Category