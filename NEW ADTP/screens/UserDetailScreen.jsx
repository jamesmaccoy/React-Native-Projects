import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Image, Text } from 'react-native';
//Importing Image
import img from "../assets/User_details.png";
import firebase from '../database/firebaseDb';

class UserDetailScreen extends Component {

  constructor() {
    super();
    this.state = {
      agency: '',
      repName: '',
      isLoading: false
    };
  }

  componentDidMount() {
    // const dbRef = firebase.firestore().collection('agencies').doc(this.props.route.params.userkey)
    // dbRef.get().then((res) => {
    //   if (res.exists) {
    //     const user = res.data();
    //     this.setState({
    //       key: res.id,
    //       agency: user.agency,
    //       repName: user.repName,
    //       isLoading: false
    //     });
    //   } else {
    //     console.log("Document does not exist!");
    //   }
    // });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('agencies').doc(this.state.key);
    updateDBRef.set({
      agency: this.state.agency,
      repName: this.state.repName,
    }).then((docRef) => {
      this.setState({
        key: '',
        agency: '',
        repName: '',
        isLoading: false,
      });
      this.props.navigation.navigate('UserScreen');
    })
      .catch((error) => {
        console.error("Error: ", error);
        this.setState({
          isLoading: false,
        });
      });
  }

  deleteUser() {
    // const dbRef = firebase.firestore().collection('agencies').doc(this.props.route.params.userkey)
    //   dbRef.delete().then((res) => {
    //       console.log('Item removed from database')
    //       this.props.navigation.navigate('UserScreen');
    //   })
  }

  openTwoButtonAlert = () => {
    Alert.alert(
      'Delete User',
      'Are you sure?',
      [
        { text: 'Yes', onPress: () => this.deleteUser() },
        { text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel' },
      ],
      {
        cancelable: true
      }
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      )
    }
    return (
      <ScrollView>
        <Image
          style={styles.tinyLogo}
          source={img}
        />
        <View style={styles.container}>
          <View style={styles.agency_name_container}>
            <View>
              <Text style={styles.agency_txt}>Agency name</Text>
            </View>
            <View>
              <Text style={styles.agency_txt}>10</Text>
            </View>
          </View>
          {/* <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Name'}
            value={this.state.agency}
            onChangeText={(val) => this.inputValueUpdate(val, 'agency')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={'Rep name'}
            value={this.state.repName}
            onChangeText={(val) => this.inputValueUpdate(val, 'repName')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Update'
            onPress={() => this.updateUser()}
            color="#19AC52"
          />
        </View>
        <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
            color="#E37399"
          />
        </View> */}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  agency_name_container: {
    flex: 1,
    flexDirection: "row",
    borderColor: "#000000",
    borderWidth: 1,
    width: "100%"
  },
  agency_txt: {
    fontSize: 26,
    fontWeight: "100",
    width:"auto"
  },
  topImage: {
    width: "100%",
    height: 50,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop:30
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
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
    marginBottom: 7,
  },
})

export default UserDetailScreen;
