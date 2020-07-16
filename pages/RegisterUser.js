import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet, Picker, TextInput } from 'react-native';

import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      besoin: 'Sante ou Social ',
      precisez: 'Je Cherche...',
      sexe: 'Sexe',
      input_age: '',

      couvertureSante: "Sans Droits"
    }
  }

  render() {
    return (
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
            <Picker.Item label="Médecin Généraliste" value="MedGe" />
            <Picker.Item label="Psychologique" value="psy" />
            <Picker.Item label="Addictions" value="addictions" />
            <Picker.Item label="Gynéco-obstétrique" value="gyneco" />
            <Picker.Item label="Sérologie,(VIH, Hépatite..)" value="serologie" />
            <Picker.Item label="Podologie" value="podologie" />
            <Picker.Item label="Dentaire" value="dentaire" />
            <Picker.Item label="Laboratoire" value="labo" />
            <Picker.Item label="Imagerie Médicale" value="imgMed" />
          </Picker>
        </View>

        <View style={styles.container2}>
          <Text style={styles.title}>Sexe :</Text>
          <Picker
            style={[styles.picker]} itemStyle={styles.pickerItem}
            selectedValue={this.state.sexe}
            onValueChange={(itemValue) => this.setState({ sexe: itemValue })}
          >
            <Picker.Item label="Homme" value="homme" />
            <Picker.Item label="Femme" value="femme" />
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
          title="Rechercher !"
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
    marginBottom: 200,
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
});

/*
QUESTION ASSURANCE ET DROITS

 <View style={styles.container2}>
            <Text style={styles.title}>Couverture Santé :</Text>
          <Picker
            style={[styles.picker]} itemStyle={styles.pickerItem}
            selectedValue={this.state.couvertureSante}
            onValueChange={(itemValue) => this.setState({ couvertureSante: itemValue })}
          >
            <Picker.Item label="Sans Droits" value="sansdroits" />
            <Picker.Item label="Droits potentiels ou ouvert" value="droitsPotentiels" />
          </Picker>
        </View>
*/


/*
import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'test50.db', createFromLocation : 1});

export default class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Nomdelastructure: '',
      Addresse: '',
      Acces: '',
      mail: '',
    };
  }

  register_user = () => {
    var that = this;
    const { Nomdelastructure } = this.state;
    const { Addresse } = this.state;
    const { Acces } = this.state;
    const { mail } = this.state;
    //alert(user_name, user_contact, user_address);
    if (Nomdelastructure) {
      if (Addresse) {
        if (Acces) {
          if (mail) {
          db.transaction(function(tx) {
            tx.executeSql(
              'INSERT INTO table_user (nom, adresse, acces, mail) VALUES (?,?,?)',
              [Nomdelastructure, Addresse, Acces, mail],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'You are Registered Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('HomeScreen'),
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Registration Failed');
                }
              }
            );
          });
        } else {
          //CHANGER LES INTITULER DE ELSE
          alert('Please fill mail');
        }
        } else {
          alert('Please fill adresse');
        }
      } else {
        alert('Please fill Contact Number');
      }
    } else {
      alert('Please fill nom');
    }
  };

  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Enter Name"
              onChangeText={Nomdelastructure => this.setState({ Nomdelastructure })}
              style={{ padding:10 }}
            />
            <Mytextinput
              placeholder="Enter Addresse"
              onChangeText={Addresse => this.setState({ Addresse })}
              maxLength={10}
              //keyboardType="numeric"
              style={{ padding:10 }}
            />
            <Mytextinput
              placeholder="Enter Access"
              onChangeText={Acces => this.setState({ Acces })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: 'top',padding:10 }}
            />
            <Mytextinput
              placeholder="Enter Mail"
              onChangeText={mail => this.setState({ mail })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: 'top',padding:10 }}
            />
            <Mybutton
              title="Submit"
              customClick={this.register_user.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

*/