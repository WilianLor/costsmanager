import React, { useState } from 'react'
import {
    SafeAreaView,
    View, 
    Text,
    StyleSheet,
    TextInput,
    Platform,
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import Header from '../components/Header'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

interface error {
    anyError: boolean,
    errorContent?: string
}

const AddCosts = (props: any) => {
    const [error, setError] = useState<error | undefined>()

    const [name, setName] = useState<string| undefined>()
    const [date, setDate] = useState<Date | undefined>()
    const [value, setValue] = useState<string | undefined>()

    const [show, setShow] = useState(false);

    const getDate = (date: Date) => {

        let dia  = date.getDate().toString()
        let diaF = (dia.length === 1) ? '0'+dia : dia
        let mes  = (date.getMonth()+1).toString() 
        let mesF = (mes.length === 1) ? '0'+mes : mes
        let anoF = date.getFullYear()

        return diaF+" / "+mesF+" / "+anoF;
    }

    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    }

    const handleCreateCosts = () => {

        if(!name){
            return setError({
                anyError: true,
                errorContent: "Preenca o nome do custo"
            })
        }

        if(!value){
            return setError({
                anyError: true,
                errorContent: "Preenca o valor do custo"
            })
        }

        const string = value.replace(/,/, '\.')

        const Value = Number(string)

        if(isNaN(Value)){
            return setError({
                anyError: true,
                errorContent: "O valor deve ter somente uma virgula nos decimais"
            })
        }

        

    }

    return (
        <SafeAreaView style={styles.addCosts}>
            <Header pageTitle="Adicionar Custo"/>
            <View style={styles.content}>
                <Text style={styles.errorContent}>{error?.anyError ? error.errorContent : ''}</Text>
                <TextInput placeholder="Título do custo" onChangeText={(text) => {setName(text), setError({anyError: false})}} style={styles.input}/>
                <View style={styles.dateContainer}>
                    <RectButton style={styles.dateButton} onPress={() => {date ? setDate(undefined) : setShow(true)}}>{!date ? <Entypo name="calendar" size={24} color={colors.green}/> : <FontAwesome name="close" size={24} color={colors.red} />}</RectButton>
                    <Text style={styles.dateText}>{date ? getDate(date) : 'Vencimento (Opcional)'}</Text>
                </View>
                {show ? 
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date ? date : new Date()}
                        mode={'date'}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeDate}
                    />
                : undefined}
                <TextInput
                    style={styles.input}
                    keyboardType={'numeric'}
                    placeholder="Valor"
                    onChangeText={(text) => {setValue(text), setError({anyError: false})}}
                />
                <RectButton style={styles.confirmButton} onPress={() => handleCreateCosts()}><Text style={styles.buttonText}>Criar</Text></RectButton>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    addCosts : {
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
    dateButton: {
        backgroundColor: colors.shape,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        height: 45,
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
    },
    dateText: {
        fontFamily: fonts.text,
        fontSize: 16,
        backgroundColor: colors.shape,
        color: colors.body_dark,
        width: 150,
        borderRadius: 8,
        height: 45,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    dateContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 220,
        marginTop: 20,
    }
})

export default AddCosts