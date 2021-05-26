import React, {useState, useEffect} from 'react'

import {
    SafeAreaView,
    StyleSheet,
    View,
    ScrollView,
} from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import { State, Categories } from '../store/dataReducer'

import colors from '../styles/colors'
import fonts from '../styles/fonts'
import CategoryCard from '../components/CategoryCard';
import Header from '../components/Header'
import { RectButton } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { RemoveCategorie } from '../store/actions'

const RemoveCategory: React.FC = () => {

    const dispatch = useDispatch()
    
    let infos = useSelector<State, Array<Categories> | undefined>(state => state.categories)
    
    const [removedItem, setRemovedItem] = useState<string | undefined>()

    useEffect(() => {
        if(removedItem){
            const categoryIndex = infos?.findIndex(category => category.id == removedItem)
            infos?.splice(categoryIndex ? categoryIndex : 0, 1)
        }
    }, [removedItem])

    const onRemoveCategory = (id: string) => {
        dispatch(RemoveCategorie({id}))
        setRemovedItem(id)
    }
 
    return (
        <SafeAreaView style={styles.removeCategory}>
            <Header pageTitle="Remover categoria"/>
            <View style={styles.content}>
                <ScrollView style={{borderRadius: 8}}>
                    {
                        infos?.map((category: Categories) => (
                            <CategoryCard title={category.title} type={0} key={category.id} categoryId={category.id}>
                                <RectButton style={styles.button} onPress={() => onRemoveCategory(category.id)}>
                                    <Ionicons name="trash-bin" size={24} color={colors.red}/>
                                </RectButton> 
                            </CategoryCard>
                        ))
                    }
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