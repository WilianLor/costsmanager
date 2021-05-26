import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    SafeAreaView
} from 'react-native'

import CostsCard from '../components/CostsCard'
import Header from '../components/Header';

import { useNavigation } from '@react-navigation/core';

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { RectButton } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux';
import { Costs, State } from '../store/dataReducer';
import { RemoveCost, TogglePaymentStatus } from '../store/actions';
import { FontAwesome } from '@expo/vector-icons';
import formatMoney from '../functions/ConvertToMoney';
import CheckBox from '@react-native-community/checkbox';

const CategoryPage = (prop: any) => {

    const navigation = useNavigation()

    const dispatch = useDispatch()

    const {id, title} = prop.route.params

    const infos = useSelector<State, State>(state => state)

    const [removedItem, setRemovedItem] = useState<string>()

    useEffect(() => {
        if(removedItem){
            const costIndex = infos.costs? infos.costs.findIndex(cost => cost.id == removedItem) : undefined
            if(costIndex){
                infos.costs?.splice(costIndex, 1)
            }
        }
    }, [removedItem])

    const onRemoveCost = (costId: string) => {
        dispatch(RemoveCost({id: costId}))
        setRemovedItem(costId)
    }

    const onTogglePaymentStatus = (id: string) => {
        dispatch(TogglePaymentStatus({id}))
    }
    
    const getDate = (date: Date) => {

        let dia  = date.getDate().toString()
        let diaF = (dia.length === 1) ? '0'+dia : dia
        let mes  = (date.getMonth()+1).toString() 
        let mesF = (mes.length === 1) ? '0'+mes : mes
        let anoF = date.getFullYear()

        return diaF+" / "+mesF+" / "+anoF;
    }

    const calcCategotyValue = (categoryId: string) => {
        let totalValue = 0
        if(infos.costs){
            infos.costs.forEach((cost: Costs) => {
                if(cost.categoryId === categoryId) {
                    totalValue += Number(cost.value)
                }
            })
        }

        return formatMoney(totalValue)
    }

    return (
        <SafeAreaView style={styles.categotyPage}>
            <Header pageTitle="Categoria de custos"/>
            <View style={styles.headerCosts}>
                <Text style={styles.headerTitle}>{title}</Text>
                <Text style={styles.headerValue}>R$ {calcCategotyValue(id)}</Text>
            </View>
            <View style={styles.costsList}>
                <View style={styles.listHeader}>
                    <Text style={styles.listHeaderTitle}>Custos</Text>
                </View>
                <ScrollView style={{borderRadius: 8}}>
                    {
                        infos.costs?.map((cost: Costs) => {
                            if(cost.categoryId == id){
                                return (
                                    <CostsCard title={cost.title} key={cost.id} value={formatMoney(cost.value)} paid={cost.paymentStatus} duedate={cost.dueDate ? getDate(cost.dueDate) : ''} id={id}>
                                        <View style={styles.checkBoxContainer}>
                                            <Text style={styles.paidLabel}>Status de pagamento </Text>
                                            <CheckBox value={cost.paymentStatus} onValueChange={() => onTogglePaymentStatus(cost.id)}/>
                                        </View>
                                        <RectButton style={styles.deleteButton} onPress={() => onRemoveCost(cost.id)}>
                                            <FontAwesome name="trash" size={24} color={colors.red} />     
                                        </RectButton> 
                                    </CostsCard>
                                )
                            }
                        })
                    }
                </ScrollView>
            </View>
            <View style={styles.buttons}>
                <RectButton style={styles.newCostsButton} onPress={() => navigation.navigate('AddCosts', {id: id})}><Text style={styles.buttonText}>Adicionar{'\n'}Custo</Text></RectButton>
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

export default CategoryPage