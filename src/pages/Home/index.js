import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { CardKontak } from '../../components'
import Firebase from '../../config/Firebase'

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            kontaks: {},
            kontaksKey: []
        }
    }

    componentDidMount() {
       this.ambilData()
    }

    ambilData(){
        Firebase.database()
        .ref("kontak")
        .once('value', (querySnapShot) => {

            let data = querySnapShot.val() ? querySnapShot.val() : {}
            let kontakItem = { ...data }

            this.setState({
                kontaks: kontakItem,
                kontaksKey: Object.keys(kontakItem)
            })
        })
    }

    removeKontak = (id) => {
        Alert.alert(
            "Info",
            "Yakin ingin menghapus kontak?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => {

                    Firebase.database()
                    .ref('kontak/'+id)
                    .remove()

                    this.ambilData()
                    Alert.alert('Hapus', 'Berhasil menghpus kontak');

                } }
            ]
        );
    }

    render() {
        this.ambilData()
        const { kontaks, kontaksKey } = this.state
        return (
            <>
            <ScrollView>
            <View style={styles.page}>

                <View style={styles.header}>
                    <Text style={styles.title}>Daftar Kontak</Text>
                    <View style={styles.garis} />
                </View>


                <View style={styles.listKontak}>
                    {kontaksKey.length > 0 ? (
                        kontaksKey.map((key) => (
                            <CardKontak key={key} kontakItem={kontaks[key]} id={key} {...this.props} removeKontak={this.removeKontak}/>
                        ))
                    ) : (
                        <Text>Daftar Kosong</Text>
                    )}
                </View>

            </View>
            </ScrollView>
                <View style={styles.wrapperButton}>
                <TouchableOpacity style={styles.btnTambah} onPress={() => this.props.navigation.navigate('Tambah')}>
                    <FontAwesomeIcon icon={faPlus} size={20} color={'#fff'} />
                </TouchableOpacity>
            </View>    
            </>        
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    wrapperButton: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 30,
    },
    btnTambah: {
        padding: 20,
        backgroundColor: '#34495e',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.94,

        elevation: 5,
    },
    header: {
        paddingHorizontal: 30,
        paddingTop: 30
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    garis: {
        borderWidth: 1,
        marginTop: 10
    },

    listKontak: {
        paddingHorizontal: 30,
        paddingTop: 20,

    },
})
