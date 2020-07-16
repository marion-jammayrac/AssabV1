/*Screen to view single user*/
import React from 'react';
import { Text, View, Button } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'test50.db', createFromLocation : 1});
 
export default class ViewBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_name: '',
      userData: '',
    };
  }
  searchUser = () => {
    const { input_name } = this.state;
    console.log(this.state.input_name);
    let two = '%';
    let joined = two + input_name + two;
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM test50 where nom LIKE ?',
        [joined],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            this.setState({
              userData: results.rows.item(0),
            });
          } else {
            alert('No structure found');
            this.setState({
              userData: '',
            });
          }
        }
      );
    });
  };
  render() {
    return (
      <View>
        <Mytextinput
          placeholder="Enter Structure name"
          onChangeText={input_name => this.setState({ input_name })}
          style={{ padding:10 }}
        />
        <Mybutton
          title="Search User"
          customClick={this.searchUser.bind(this)}
        />
        <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
          <Text>{this.state.userData.nom}</Text>
          <Text>Address: {this.state.userData.adresse}</Text>
          <Text>Accès: {this.state.userData.acces}</Text>
          <Text>{this.state.userData.description}</Text>
        </View>
      </View>
    );
  }
}