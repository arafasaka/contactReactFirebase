import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Firebase from '../../config/Firebase'

export default class DetailKontak extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             kontak: {}
        }
    }

    componentDidMount(){
        Firebase.database()
        .ref("kontak/"+ this.props.route.params.id)
        .once('value', (querySnapShot) => {

            let data = querySnapShot.val() ? querySnapShot.val() : {}
            let kontakItem = {...data}

            this.setState({
                kontak: kontakItem,
                
            })
        })
    }
    
    render() {
        const {kontak} = this.state
        return (
            <View style={styles.pages}>
                <Text >Nama: </Text>
                <Text style={styles.text}>{kontak.nama} </Text>

                <Text >Nomor Hp: </Text>
                <Text style={styles.text}>{kontak.nomor} </Text>

                <Text >Keterangan: </Text>
                <Text style={styles.text}>{kontak.keterangan} </Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    pages:{
        margin: 30,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.94,

        elevation: 5,
        
    },

    text:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    }
})
