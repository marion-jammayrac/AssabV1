// TEST FONCTIONEL SIMPLE EXPANDABLE 

/*

return (
      <>    
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <ScrollView style={{flex: 1, padding: 10}}>
            <CollapsibleList
              numberOfVisibleItems={2}
              wrapperStyle={styles.wrapperCollapsibleList}
              onToggle={collapsed =>
                collapsed
                  ? this.setState({buttonText: 'Show Less'})
                  : this.setState({buttonText: 'Show More'})
              }
              buttonContent={
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{this.state.buttonText}</Text>
                </View>
              }
              
          ></CollapsibleList>
              <FlatList data={this.state.FlatListItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
            <View key={item.user_id} style={{ backgroundColor: 'white', padding: 20 }}>
              <View style={styles.collapsibleItem}>
               <Text style={{ fontWeight: 'bold' }}>{item.nom}</Text>
              </View>
              <View style={styles.collapsibleItem}>
                <Text>Address: {item.adresse}</Text>
              </View>
              <View style={styles.collapsibleItem}>
                <Text>{item.mail}</Text>
              </View>
              <View style={styles.collapsibleItem}>
                <Text>Acces: {item.acces}</Text>
              </View>
              </View>
              )}
            />
          </ScrollView>
        </SafeAreaView>
        
      </>
      
    );
    */

import React, { Component,useState } from 'react';
//import react in our project
import { StyleSheet, View, Text, ScrollView, } from 'react-native';
//import basic react native components
import { openDatabase } from 'react-native-sqlite-storage';
import CollapsibleList from "react-native-collapsible-list";
import { SafeAreaView, StatusBar,} from 'react-native';
//Connction to access the pre-populated user_db.db
var db = openDatabase({ name: 'test50.db', createFromLocation : 1});


const TestExpandable = () => {
  const [buttonText, setButtonText] = useState('Show More');

  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1, padding: 10}}>
        <CollapsibleList
          numberOfVisibleItems={2}
          wrapperStyle={styles.wrapperCollapsibleList}
          onToggle={collapsed =>
            collapsed
              ? this.setState({ buttonText: 'Show More' })
              : this.setState({ buttonText: 'Show Less' })
          }
          buttonContent={
            <View style={styles.button}>
              <Text style={styles.buttonText}>{this.state.buttonText}</Text>
            </View>
          }>
          <View style={styles.collapsibleItem}>
            <Text>Hello Collapsable List :)</Text>
          </View>
          <View style={styles.collapsibleItem}>
            <Text>Collapsable List Item</Text>
          </View>
          <View style={styles.collapsibleItem}>
            <Text>
              Collapsable List Item Multi line is also supported: Lorem ipsum
              dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
              nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
              commodo consequat. Duis autem vel eum iriure dolor in hendrerit
              in vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla facilisi.
            </Text>
          </View>
          <View style={styles.collapsibleItem}>
            <Text>Collapsable List Item</Text>
          </View>
          <View style={styles.collapsibleItem}>
            <Text>Hello Collapsable List :)</Text>
          </View>
          <View style={styles.collapsibleItem}>
            <Text>Collapsable List Item</Text>
          </View>
          <View style={styles.collapsibleItem}>
            <Text>Collapsable List Item</Text>
          </View>
          <View style={styles.collapsibleItem}>
            <Text>Collapsable List Item</Text>
          </View>
          <View style={styles.collapsibleItem}>
            <Text>Collapsable List Item</Text>
          </View>
          <View style={styles.collapsibleItem}>
            <Text>Collapsable List Item</Text>
          </View>
        </CollapsibleList>
      </ScrollView>
    </SafeAreaView>
  </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  wrapperCollapsibleList: {
    flex: 1,
    marginTop: 20,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#c2185b',
  },
  collapsibleItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCC',
    padding: 10,
  },
  buttonText: {
    color: '#FFF',
  },
});

export default TestExpandable

