import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput
} from 'react-native'

import Header from '../components/Header';
import { useNavigation } from '@react-navigation/core';
import { RectButton } from 'react-native-gesture-handler'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { CreateCategory } from '../store/actions'
import { Categories } from '../store/dataReducer'
import GenerateId from '../functions/GenerateId' 

interface error {
    anyError: boolean,
    errorContent?: string
}

const AddCategory: React.FC = () => {

    const [error, setError] = useState<error | undefined>()
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [name, setName] = useState<string| null>()

    const onCreateCategory = (payload: Categories) => {
        dispatch(CreateCategory(payload))
    }

    const handleCreateCategory = () => {
        if(!name) {
            return setError({
                anyError: true,
                errorContent: "Digite o nome da categoria"
            })
        }

        onCreateCategory({id: GenerateId(), title: name ? name : ''})
        navigation.navigate('Home')
    }

    return (
        <SafeAreaView style={styles.addCategory}>
            <Header pageTitle="Adicionar categoria"/>
            <View style={styles.content}>
                <Text style={styles.errorContent}>{error?.anyError ? error.errorContent : ''}</Text>
                <TextInput placeholder="Título da categoria" onChangeText={(text) => {setName(text), setError({anyError: false})}} style={styles.input}/>
                <RectButton style={styles.confirmButton} onPress={() => handleCreateCategory()}><Text style={styles.buttonText}>Criar</Text></RectButton>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    addCategory : {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.background
    },
    header: {
        paddingVertical: 40,
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
    errorContent: {
        marginBottom: 10,
        fontFamily: fonts.text,
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
        borderRadius: 8,
        marginTop: 20,
        textAlign: 'center'
    }
})

export default AddCategory