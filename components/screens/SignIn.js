import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import Logo from '../database/images/GameStore.png';
import CustomButton from '../screens/CustomButton';
import {COLOURS} from '../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import AuthService from '../service/auth.service';
import {useUserContext} from '../service/UserContext';
const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setToken, setIsAdmin} = useUserContext();
  const navigation = useNavigation();
  const onChangeUserNameHandler = username => {
    setUsername(username);
  };

  const onChangePasswordHandler = password => {
    setPassword(password);
  };
  const onSignInPressed = e => {
    e.preventDefault();
    AuthService.login(username, password, setToken, setIsAdmin).then(() => {
      alert('success');
      navigation.navigate('Home');
    });
  };
  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };
  const {height} = useWindowDimensions();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" style={styles.back} />
        </TouchableOpacity>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <TextInput
          value={username}
          onChangeText={onChangeUserNameHandler}
          placeholder="username"
          style={styles.container}
        />
        <TextInput
          value={password}
          onChangeText={onChangePasswordHandler}
          placeholder="password"
          secureTextEntry={true}
          style={styles.container}
        />
        <Pressable
          onPress={onSignInPressed}
          style={[styles.containerForButton, styles.container_PRIMARY]}>
          <Text style={styles.text}>Sign In</Text>
        </Pressable>
        <CustomButton
          text="Do not have account? Create one"
          onPress={onSignUpPressed}
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
  logo: {
    width: '70%',
    maxWidth: 300,
    height: 100,
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
export default SignIn;
