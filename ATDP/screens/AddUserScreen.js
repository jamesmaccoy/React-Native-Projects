import React, { Component } from 'react';
import { TouchableOpacity,Text, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';


class AddUserScreen extends Component {


  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('agencies');
    this.state = {
      agency: '',
      repName: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeUser() {
    if(this.state.agency === ''){
     alert('Fill at least your name!')
    } else {
      this.setState({
        isLoading: true,
      });
      this.dbRef.add({
        agency: this.state.agency,
        repName: this.state.repName,
      }).then((res) => {
        this.setState({
          agency: '',
          repName: '',
          isLoading: false,
        });
        this.props.navigation.navigate('UserScreen')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }


    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Agency Name'}
              value={this.state.agency}
              onChangeText={(val) => this.inputValueUpdate(val, 'agency')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Contact Name'}
              value={this.state.repName}
              onChangeText={(val) => this.inputValueUpdate(val, 'repName')}
          />
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.buttonInner}
            onPress={() => this.storeUser()}
          >
          <Text>ADD</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: '#ffffff'
  },
  inputGroup: {
    flex: 1,
    padding: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#65a984',
    backgroundColor: '#ededed',

  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    color: '#6fa686',
    backgroundColor: '#ffffff',
    padding: 10,
    borderWidth:1,
    borderColor:'#e9e9e9',
  },
  buttonInner: {
    padding: 10,
  },
})

export default AddUserScreen;
