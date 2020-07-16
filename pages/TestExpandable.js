/*Example of Expandable ListView in React Native*/
import React, { Component, useState } from 'react';
//import react in our project
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
//import basic react native components
import { openDatabase } from 'react-native-sqlite-storage';
import CollapsibleList from "react-native-collapsible-list";
import { SafeAreaView, StatusBar, } from 'react-native';

import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'test50.db', createFromLocation: 1 });


export default class TestExpandable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FlatListItems: [],
            buttonText: 'Plus...',
            userData: '',
            input_name: '',

        };


        db.transaction(tx => {
            tx.executeSql("SELECT * FROM test50", [], (tx, results) => {
                var temp = [];
                for (let i = 0; i < results.rows.length; ++i) {
                    temp.push(results.rows.item(i));
                }
                this.setState({
                    FlatListItems: temp,
                });
            });
        });
    }

    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={styles.container}>
                        <View>
                            
                            <FlatList
                                data={this.state.FlatListItems}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View>
                                        <CollapsibleList
                                            numberOfVisibleItems={2}
                                            wrapperStyle={styles.wrapperCollapsibleList}
                                            onToggle={collapsed =>
                                                collapsed
                                                    ? this.setState({ buttonText: 'Moins' })
                                                    : this.setState({ buttonText: 'Plus...' })
                                            }
                                            buttonContent={
                                                <View style={styles.button}>
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
                                            <View style={styles.collapsibleItem}>
                                                <Text>Acces: {item.acces}</Text>
                                            </View>
                                            <View style={styles.collapsibleItem}>
                                                <Text>{item.tel}</Text>
                                            </View>
                                            <View style={styles.collapsibleItem}>
                                                <Text>{item.mail}</Text>
                                            </View>
                                        </CollapsibleList>

                                    </View>
                                )}
                            />
                        </View>
                </SafeAreaView>
            </>
        );
    }
}


const styles = StyleSheet.create({
    container: {
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
    button: {
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
