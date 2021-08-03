import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Alert} from 'react-native'
import { InputData } from '../../components'
import Firebase from '../../config/Firebase'

export default class EditKontak extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nama: '',
            nomor: '',
            keterangan: ''
        }
    }

    onChangeText = (namaState, value) =>{
        this.setState({
            [namaState] : value
        })
    }

    componentDidMount(){
        Firebase.database()
        .ref("kontak/"+ this.props.route.params.id)
        .once('value', (querySnapShot) => {

            let data = querySnapShot.val() ? querySnapShot.val() : {}
            let kontakItem = {...data}

            this.setState({
                nama: kontakItem.nama,
                nomor: kontakItem.nomor,
                keterangan: kontakItem.keterangan,
                
            })
        })
    }

    onSubmit = () => {
        if(this.state.nama && this.state.nomor && this.state.keterangan){
            console.log("Masuk submit")
            console.log(this.state);

            const kontakRefrensi = Firebase.database().ref("kontak/"+ this.props.route.params.id);
            const kontak = {
                nama: this.state.nama,
                nomor: this.state.nomor,
                keterangan: this.state.keterangan
            }

            kontakRefrensi
            .update(kontak)
            .then((data) => {
                Alert.alert('Sukses', 'kontak berhasil diedit')
                this.props.navigation.replace('Home')
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            })
        }
        else{
            Alert.alert('Error', 'Nama, Nomor HP, dan keterangan wajib diisi')
        }

    }

    render() {
        return (
            <View style={styles.page}>
                <InputData 
                label="Nama:" 
                placeholder="Masukan nama" 
                onChangeText={this.onChangeText} 
                value={this.state.nama}
                namaState="nama"
                />
                <InputData 
                label="No. HP:" 
                placeholder="Masukan nomor handphone" 
                keyboardType="number-pad"
                onChangeText={this.onChangeText} 
                value={this.state.nomor}
                namaState="nomor" 
                />
                <InputData 
                label="Keterangan" 
                placeholder="Masukan keterangan apapun" 
                isTextArea={true}
                onChangeText={this.onChangeText} 
                value={this.state.keterangan}
                namaState="keterangan" 
                />
                <TouchableOpacity style={styles.btnSubmit} onPress={() => this.onSubmit()}>
                    <Text style={styles.textSubmit}>
                        SUBMIT
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 30,
    },
    btnSubmit: {
        backgroundColor: '#2c3e50',
        padding: 10,
        borderRadius: 8,
        marginTop: 10

    },
    textSubmit: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})
