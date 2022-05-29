import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';
import CustomButton from '../screens/CustomButton';
import {COLOURS} from '../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import axios from 'react-native-axios';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigation = useNavigation();
  const onChangeUserNameHandler = username => {
    setUsername(username);
  };
  const onChangeFirstNameHandler = firstName => {
    setFirstName(firstName);
  };
  const onChangeLastNameHandler = lastName => {
    setLastName(lastName);
  };
  const onChangePasswordHandler = password => {
    setPassword(password);
  };
  const onSignUpPressed = async () => {
    if (!username.trim() || !password.trim()) {
      alert('Name or Email is invalid');
      return;
    }

    const response = await axios.post(
      'http://192.168.56.1:8080/user/register',
      {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
      },
    );
    if (response.status === 200) {
      alert(` You have created: ${JSON.stringify(response.data)}`);
      setUsername('');
      setPassword('');
      navigation.navigate('SignIn');
    } else {
      throw new Error('An error has occurred');
    }
  };
  const onNavigate = () => {
    navigation.navigate('SignIn');
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.title}>Create Account</Text>
        <TextInput
          value={firstName}
          onChangeText={onChangeFirstNameHandler}
          placeholder="First Name"
          style={styles.container}
        />
        <TextInput
          value={lastName}
          onChangeText={onChangeLastNameHandler}
          placeholder="Last Name"
          style={styles.container}
        />
        <TextInput
          value={username}
          onChangeText={onChangeUserNameHandler}
          placeholder="Username"
          style={styles.container}
        />
        <TextInput
          value={password}
          onChangeText={onChangePasswordHandler}
          placeholder="Password"
          secureTextEntry={true}
          style={styles.container}
        />
        <Pressable
          onPress={onSignUpPressed}
          // onPress={() => onSignUpPressed(this)}
          style={[styles.containerForButton, styles.container_PRIMARY]}>
          <Text style={styles.text}>Register</Text>
        </Pressable>
        <CustomButton
          text="Do you have account? Go to Sign-In"
          onPress={onNavigate}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLOURS.backgroundLight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  back: {
    fontSize: 18,
    color: COLOURS.backgroundDark,
    padding: 12,
    borderRadius: 12,
    marginRight: 300,
  },
  container: {
    backgroundColor: COLOURS.white,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#e8e8e8',
    paddingHorizontal: 23,
    marginVertical: 5,
  },
  container_PRIMARY: {
    backgroundColor: '#000',
  },
  containerForButton: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});
export default Registration;
