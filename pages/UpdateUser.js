/*Screen to update the user*/
import React from 'react';
import { View, YellowBox, ScrollView, KeyboardAvoidingView, Alert, } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'test48.db', createFromLocation : 1});
 
export default class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_name: '',
      Nomdelastructure: '',
      Addresse: '',
      Acces: '',
      mail: '',
    };
  }
  searchUser = () => {
    const {input_name} =this.state;
    console.log(this.state.input_name);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM test48 where Nomdelastructure = ?',
        [input_name],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len',len);
          if (len > 0) {
            console.log(results.rows.item(0).Adresse);
            this.setState({
             Nomdelastructure:results.rows.item(0).Nomdelastructure,
            });
            this.setState({
             Acces:results.rows.item(0).Acces,
            });
            this.setState({
              mail:results.rows.item(0).mail,
            });
          }else{
            alert('No user found');
            this.setState({
              Nomdelastructure:'',
              Addresse:'',
              Acces:'',
              mail:'',
            });
          }
        }
      );
    });
  };
  updateUser = () => {
    var that=this;
    const { input_name } = this.state;
    const { Nomdelastructure } = this.state;
    const { Addresse } = this.state;
    const { Acces } = this.state;
    const { mail } = this.state;
    if (Nomdelastructure){
      if (Addresse){
        if (Acces){
          if (mail){
          db.transaction((tx)=> {
            tx.executeSql(
              'UPDATE test48 set Nomdelastructure=?, Addresse=? , Accètransportencommun=?, mail=? where Nomdelastructure=?',
              [Nomdelastructure, Addresse, Acces,mail, input_name],
              (tx, results) => {
                console.log('Results',results.rowsAffected);
                if(results.rowsAffected>0){
                  Alert.alert( 'Success', 'User updated successfully',
                    [
                      {text: 'Ok', onPress: () => that.props.navigation.navigate('HomeScreen')},
                    ],
                    { cancelable: false }
                  );
                }else{
                  alert('Updation Failed');
                }
              }
            );
          });
        }else{
          alert('Please fill mail');
        }
        }else{
          alert('Please fill Addresse');
        }
      }else{
        alert('Please fill Contact Number');
      }
    }else{
      alert('Please fill Name');
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
              placeholder="Enter User Id"
              style={{ padding:10 }}
              onChangeText={input_name => this.setState({ input_name })}
            />
            <Mybutton
              title="Search Structure"
              customClick={this.searchUser.bind(this)}
            />
            <Mytextinput
              placeholder="Enter sctructure"
              value={this.state.Nomdelastructure}
              style={{ padding:10 }}
              onChangeText={Nomdelastructure => this.setState({ Nomdelastructure })}
            />
            <Mytextinput
              placeholder="Enter Addresse"
              value={''+ this.state.Addresse}
              onChangeText={Addresse => this.setState({ Addresse })}
              maxLength={10}
              style={{ padding:10 }}
              //keyboardType="numeric"
            />
            <Mytextinput
              value={this.state.Acces}
              placeholder="Enter Access"
              onChangeText={Acces => this.setState({ Acces })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical : 'top', padding:10}}
            />
            <Mytextinput
              value={this.state.mail}
              placeholder="Enter mail"
              onChangeText={mail => this.setState({ mail })}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical : 'top', padding:10}}
            />
            <Mybutton
              title="Update User"
              customClick={this.updateUser.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}