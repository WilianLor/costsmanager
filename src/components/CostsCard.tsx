import React from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface data {
    value?: string,
    title: string,
    paid: boolean,
    duedate: string,
    id: string,
}

const CostsCard: React.FC<data> = (props) => {

    return (
        <View style={styles.card}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.value}>R$ {props.value}</Text>
            </View>
            <View style={styles.duedateContainer}>
                <Text style={styles.duedate}>{props.duedate ? 'Data de vencimento: '+props.duedate : 'Não possui vencimento'}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
        height: 160,
        borderRadius: 8,
        padding: 30,
        backgroundColor: colors.shape,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column'
    },
    titleContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    duedateContainer: {
        display: 'flex',
        width: '100%',
    },
    checkBoxContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    paidLabel: {
        marginRight: 5,
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_dark
    },
    buttonsContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    duedate: {
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_dark
    }
})

export default CostsCard






