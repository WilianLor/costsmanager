import React from 'react'
import {
    SafeAreaView, 
    Text, 
    StyleSheet,
    View,
    ScrollView,
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { useNavigation } from '@react-navigation/core'
import { useDispatch, useSelector } from 'react-redux'

import { State, Costs, Categories } from '../store/dataReducer'

import CategoryCard from '../components/CategoryCard'
import CostsCard from '../components/CostsCard'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import formatMoney from '../functions/ConvertToMoney'
import CheckBox from '@react-native-community/checkbox'
import { TogglePaymentStatus } from '../store/actions'
import { useState } from 'react'
import { useEffect } from 'react'

const HomePage: React.FC = () => {

    const [removeItem] = useState<string | undefined>(undefined)

    useEffect(() => {
        if(removeItem){
            if(infos.costs){
                const indexToRemove = infos.costs.findIndex((cost)=> cost.id = removeItem)
                infos.costs.splice(indexToRemove, 1)
            }
        }
    }, [removeItem])

    const dispatch = useDispatch()

    const navigation = useNavigation()

    const infos = useSelector<State, State>(state => state)

    const onTogglePaymentStatus = (id: string) => {
        dispatch(TogglePaymentStatus({id}))
    }

    const organizeByDuedate = () => {
        if(infos.costs){
            let costsWithDueDate: Array<Costs> = []
            infos.costs.forEach((cost: Costs) => {
                if(cost.dueDate && cost.paymentStatus != true){
                    costsWithDueDate.push(cost)
                }
            })
            costsWithDueDate.sort((a, b) => {
                let dateA = a.dueDate, dateB = b.dueDate
                if(dateA !== undefined && dateB !== undefined){
                    return dateA.getTime() - dateB.getTime()
                } else {
                    return 0
                }
            })

            return costsWithDueDate 
        }
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

    const calcTotalValue = () => {
        let totalValue = 0
        if(infos.costs){
            infos.costs.forEach((cost: Costs) => {
                totalValue += Number(cost.value)
            })
        }

        return formatMoney(totalValue)
    }

    const totalPaidOrUnpaid = (type: string) => {
        let totalPaid = 0
        let totalUnpaid = 0

        if(infos.costs){
            infos.costs.forEach((cost: Costs) => {
                if(cost.paymentStatus === true) {
                    totalPaid += Number(cost.value)
                } else {
                    totalUnpaid += Number(cost.value)
                }
            })
        }

        if(type == 'paid'){
            return formatMoney(totalPaid)
        } else if (type == 'unpaid'){
            return formatMoney(totalUnpaid)
        }
    }

    const getDate = (date: Date) => {

        let dia  = date.getDate().toString()
        let diaF = (dia.length === 1) ? '0'+dia : dia
        let mes  = (date.getMonth()+1).toString() 
        let mesF = (mes.length === 1) ? '0'+mes : mes
        let anoF = date.getFullYear()

        return diaF+" / "+mesF+" / "+anoF;
    }
    
    return (
        <SafeAreaView style={styles.homePage}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Gastos totais</Text>
                <Text style={styles.headerValue}>R$ {calcTotalValue()}</Text>
                <View style={styles.statusContainer}>
                    <View style={styles.status}>
                        <Text style={styles.statusTitle}>Pagos</Text>
                        <Text style={styles.statusValue}>R$ {totalPaidOrUnpaid('paid')}</Text>
                    </View>
                    <View style={styles.status}>
                        <Text style={styles.statusTitle}>A pagar</Text>
                        <Text style={styles.statusValue}>R$ {totalPaidOrUnpaid('unpaid')}</Text>
                    </View>
                </View>
            </View>
            {
                <View style={styles.Lists}>
                    <ScrollView>
                        <View style={styles.categoriesList}>
                            <View style={styles.listHeader}>
                                <Text style={styles.listHeaderTitle}>Categorias</Text>
                            </View>
                            {
                                infos.categories?.map((category: Categories) => (
                                    <CategoryCard value={calcCategotyValue(category.id)} title={category.title} type={1} key={category.id} categoryId={category.id}/>
                                ))
                            }
                        </View>
                        <View style={styles.vencimentsList}>
                            <View style={styles.listHeader}>
                                <Text style={styles.listHeaderTitle}>Próximos a vencer</Text>
                            </View>
                            {
                                organizeByDuedate()?.map((cost: Costs, index) => {
                                    if(index <= 1) {
                                        let category = infos.categories?.find(category => category.id === cost.categoryId)

                                        return (
                                            <CostsCard title={cost.title}  value={formatMoney(cost.value)} id={cost.id} paid={cost.paymentStatus} key={cost.id} duedate={cost.dueDate ? getDate(cost.dueDate) : ''}>
                                                <View style={styles.checkBoxContainer}>
                                                    <Text style={styles.paidLabel}>Status de pagamento </Text>
                                                    <CheckBox value={cost.paymentStatus} onValueChange={() => onTogglePaymentStatus(cost.id)}/>
                                                </View>
                                                <Text style={styles.listHeaderTitle}>{category?.title}</Text>
                                            </CostsCard>
                                        )
                                    }
                                })
                            }
                        </View>
                    </ScrollView>
                </View>
            }
            <View style={styles.buttons}>
                <RectButton style={styles.addCategoryButton} onPress={() => navigation.navigate('AddCategory')}><Text style={styles.buttonText}>Adicionar{'\n'}Categoria</Text></RectButton>
                <RectButton style={styles.removeCategoryButton} onPress={() => navigation.navigate('RemoveCategory')}><Text style={styles.buttonText}>Remover{'\n'}Categoria</Text></RectButton>
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
    warning: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    warningText: {
        color: colors.body_dark,
        fontFamily: fonts.heading,
        fontSize: 16,
        textAlign: 'center'
    },
    homePage: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.background
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
        fontSize: 16
    },
    header: {
        width: '90%',
        marginLeft: '5%',
        marginRight: '5%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    addCategoryButton: {
        width: '35%',
        padding: 5,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: colors.green,
        textAlign: 'center'
    },
    removeCategoryButton: {
        width: '35%',
        padding: 5,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: colors.red,
        textAlign: 'center'
    },
    buttons: {
        margin: 10,
        width: '100%',
        height: '15%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    categoriesList: {
        width: '100%',
    },
    vencimentsList: {
        width: '100%',
        marginTop: 20
    },
    Lists: {
        width: '100%',
        height: '50%',
    },
    buttonText: {
        color: colors.green_light,
        fontFamily: fonts.heading,
        fontSize: 16
    },
    statusContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 10
    },
    status: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statusTitle: {
        fontSize: 24,
        color: colors.body_dark,
        fontFamily: fonts.heading,
    },
    statusValue: {
        fontSize: 16,
        color: colors.body_dark,
        fontFamily: fonts.complement,
    },
})

export default HomePage