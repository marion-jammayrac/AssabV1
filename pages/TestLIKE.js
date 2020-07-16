/*Example of Expandable ListView in React Native*/
import React, { Component, useState } from 'react';
//import react in our project
import { StyleSheet, View, Text, ScrollView, FlatList, Picker, TextInput } from 'react-native';
//import basic react native components
import { openDatabase } from 'react-native-sqlite-storage';
import CollapsibleList from "react-native-collapsible-list";
import Mybutton from './components/Mybutton';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'test50.db', createFromLocation: 1 });


export default class TestLIKE extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FlatListItems: [],
            buttonText: 'Plus...',
            userData: '',
            besoin: 'Sante ou Social ',
            precisez: 'Je Cherche...',
            sexe: 'Sexe',
            input_age: '',
            couvertureSante: "Sans Droits"

        };

    }
    searchUser = () => {
        const { precisez } = this.state;
        const { sexe } = this.state;
        const { input_age } = this.state;

        console.log(this.state.input_age);
        let two = '%';
        //let joined = two + input_name2 + two;
        console.log(input_age);
        db.transaction(tx => {
            //tx.executeSql(" SELECT * FROM test50 WHERE nom LIKE '" + sexe + "' UNION SELECT * FROM test50 WHERE age_max LIKE " + input_age + " ", [], (tx, results) => {
            tx.executeSql(" SELECT * FROM test50 WHERE "+ precisez +" NOT NULL AND age_max > "+ input_age +" AND age_min < "+ input_age +" AND sexe = '"+ sexe +"' OR sexe ISNULL ", [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                }
                this.setState({
                    FlatListItems: temp,
                });
            });
        });
    };

    PrintLimitAge () {
        const { item } = this.state;
        if (item.age_max !=999) {
            <Text>age maximum: {item.age_max}</Text>
        }
        if (item.age_min !=0) {
            <Text>age minimum: {item.age_max}</Text>
        }
    }

    render() {
        return (
            <>
                <ScrollView style={styles.scrollview_container}>
                    <View style={styles.container}>
                        <View style={styles.container2}>
                            <Text style={styles.title}>Besoin :</Text>
                            <Picker
                                style={[styles.picker]} itemStyle={styles.pickerItem}
                                selectedValue={this.state.besoin}
                                onValueChange={(itemValue) => this.setState({ besoin: itemValue })}
                            >
                                <Picker.Item label="Santé" value="sante" />
                                <Picker.Item label="Social" value="social" />
                            </Picker>
                        </View>

                        <View style={styles.container2}>
                            <Text style={styles.title}>Précisez :</Text>
                            <Picker
                                style={[styles.picker]} itemStyle={styles.pickerItem}
                                selectedValue={this.state.precisez}
                                onValueChange={(itemValue) => this.setState({ precisez: itemValue })}
                            >
                                <Picker.Item label="Médecin Généraliste" value="medG" />
                                <Picker.Item label="Psychologique" value="Psychologue" />
                                <Picker.Item label="Santé Mentale" value="Psychiatrique" />
                                <Picker.Item label="Addictions" value="addiction" />
                                <Picker.Item label="Sérologie,(VIH, Hépatite..)" value="Depistage" />
                                <Picker.Item label="Dentaire" value="Dentaire" />
                                <Picker.Item label="Laboratoire" value="Laboratoire" />
                                <Picker.Item label="Imagerie Médicale" value="imagerieMed" />
                                <Picker.Item label="Autres ..." value="ConsultSpe1" />

                            </Picker>
                        </View>

                        <View style={styles.container2}>
                            <Text style={styles.title}>Sexe :</Text>
                            <Picker
                                style={[styles.picker]} itemStyle={styles.pickerItem}
                                selectedValue={this.state.sexe}
                                onValueChange={(itemValue) => this.setState({ sexe: itemValue })}
                            >
                                <Picker.Item label="Homme" value="M" />
                                <Picker.Item label="Femme" value="F" />
                            </Picker>
                        </View>

                        <View style={styles.container2}>
                            <Text style={styles.title} >Age :</Text>
                            <TextInput
                                style={[styles.pickerTexte]}
                                placeholder="age"
                                onChangeText={input_age => this.setState({ input_age })}
                                placeholderStyle={styles.title}
                            />
                        </View>
                        <Mybutton style={styles.button}
                            title="Rechercher"
                            customClick={this.searchUser.bind(this)}
                        />

                    </View>
                    <View style={styles.container}>
                        <FlatList
                            data={this.state.FlatListItems}
                            renderItem={({ item }) => (

                                <CollapsibleList
                                    numberOfVisibleItems={2}
                                    wrapperStyle={styles.wrapperCollapsibleList}
                                    onToggle={collapsed =>
                                        collapsed
                                            ? this.setState({ buttonText: 'Moins' })
                                            : this.setState({ buttonText: 'Plus...' })
                                    }
                                    buttonContent={
                                        <View style={styles.button2}>
                                            <Text style={styles.buttonText}>{this.state.buttonText}</Text>
                                        </View>
                                    }>
                                    <View style={styles.collapsibleItem}>
                                        <Text style={{ fontWeight: 'bold' }}>{item.nom}</Text>
                                    </View>
                                    <View style={styles.collapsibleItem}>
                                        <Text>{item.adresse}</Text>
                                    </View>
                                    <View style={styles.collapsibleItem}>
                                        <Text>Address: {item.description}</Text>
                                    </View>
                                    <View style={styles.collapsibleItem} >

                                        <Text>pas de restrictions sur l'age</Text>
                                    </View>
                                    <View style={styles.collapsibleItem}>
                                        <Text>public acceuili: {item.public_cible}</Text>
                                    </View>
                                    <View style={styles.collapsibleItem}>
                                        <Text>Acces: {item.acces}</Text>
                                    </View>
                                    <View style={styles.collapsibleItem}>
                                        <Text>{item.tel}</Text>
                                    </View>
                                </CollapsibleList>
                            )}
                        />
                    </View>
                </ScrollView>
            </>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 25,
        marginRight: 25,
        marginTop: 10,
        marginBottom: 0,
        padding: 20,
        backgroundColor: 'white',
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 5,
    },
    picker: {
        width: 200,
        height: 40,
        backgroundColor: '#FFF0E0',
        borderColor: 'black',
        borderWidth: 1,
    },
    pickerItem: {
        color: 'red'
    },
    button: {
        justifyContent: 'flex-start',
    },
    pickerTexte: {
        textAlign: 'center',
        width: 60,
        height: 40,
        backgroundColor: '#FFF0E0',
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 16,
    },
    container3: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        marginTop: 5,
    },
    wrapperCollapsibleList: {
        flex: 1,
        marginTop: 10,
        overflow: 'hidden',
        backgroundColor: '#FFF',
        borderRadius: 5,
    },
    button2: {
        padding: 10,
        backgroundColor: '#FF9800',
        //backgroundColor: '#c2185b',
    },
    collapsibleItem: {
        //borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#CCC',
        padding: 5,
    },
    buttonText: {
        color: '#FFF',
    },

});


// tx.executeSql(" SELECT * FROM test50 WHERE nom LIKE '" + joined + "' UNION SELECT * FROM test50 WHERE age_max LIKE " + input_age + " ", [], (tx, results) => {