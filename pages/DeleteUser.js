/*Screen to delete the user*/
import React from 'react';
import { Button, Text, View, Alert } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'test50.db', createFromLocation : 1});
export default class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_name: '',
    };
  }
  deleteUser = () => {
    var that = this;
    const { input_name } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  test50 where nom=?',
        [input_name],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Structure deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please insert a valid Name');
          }
        }
      );
    });
  };
 
  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Mytextinput
          placeholder="Enter Structure name"
          onChangeText={input_name => this.setState({ input_name })}
          style={{ padding:10 }}
        />
        <Mybutton
          title="Delete Structure"
          customClick={this.deleteUser.bind(this)}
        />
      </View>
    );
  }
}