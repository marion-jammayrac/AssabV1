/*Screen to register the user*/
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