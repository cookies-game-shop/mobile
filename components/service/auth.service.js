import axios from 'axios';
import QueryString from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
class AuthService {
  async login(username, password, setToken, setIsAdmin) {
    await axios
      .post(
        'http://192.168.56.1:8080/login',
        QueryString.stringify({
          username: username,
          password: password,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then(function (res) {
        setToken(true);
        AsyncStorage.setItem('token', res.data.access_token);
        AsyncStorage.setItem('refresh_token', res.data.refresh_token);
      });
    await axios
      .get('http://192.168.56.1:8080/user/get-admin-creds', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      })
      .then(response => {
        if (response.data === 'ADMIN') {
          AsyncStorage.setItem('admin', response.data);
          setIsAdmin(true);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  //
  // logout() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('refresh_token');
  // }

  refresh_token() {
    axios
      .get('http://192.168.56.1:8080/user/token/refresh', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AsyncStorage.getItem('refresh_token')}`,
        },
      })
      .then(response => {
        AsyncStorage.setItem('token', response.data.access_token);
        AsyncStorage.setItem('refresh_token', response.data.refresh_token);
        return true;
      });
    return false;
  }
}

export default new AuthService();
