import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const CardKontak = ({id, kontakItem, navigation, removeKontak}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Detail', {id:id})}>
            <View>
                <Text style={styles.nama}>{kontakItem.nama}</Text>
                <Text style={styles.noHP}>Nomor Hp: {kontakItem.nomor}</Text>
            </View>
            <View style={styles.icon}>
                <FontAwesomeIcon icon={faEdit} color={'#f39c12'} size={25} onPress={() => navigation.navigate('Edit', {id:id})} />
                <FontAwesomeIcon icon={faTimes} color={'#c0392b'} size={25} onPress={() => removeKontak(id)}/>
            </View>
           
        </TouchableOpacity>
    )
}

export default CardKontak

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.94,

        elevation: 5,
    },

    nama:{
        fontWeight: 'bold',
        fontSize: 16,

    },

    noHP:{
        fontSize: 12,
        color: 'grey',
    },

    icon: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }

})
