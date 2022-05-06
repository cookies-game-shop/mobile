import axios from 'axios';
import QueryString from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
class AuthService {
  login(username, password) {
    return axios
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
      .then(function (response) {
        console.log(response.data);
        AsyncStorage.setItem('token', response.data.access_token);
        AsyncStorage.setItem('refresh_token', response.data.refresh_token);
        return response.data;
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
        console.log(response.data);
        AsyncStorage.setItem('token', response.data.access_token).then(() =>
          console.log('success!'),
        );
        AsyncStorage.setItem('refresh_token', response.data.refresh_token).then(
          () => console.log('success!'),
        );
        return true;
      });
    return false;
  }

  getCurrentUser() {
    return JSON.parse(AsyncStorage.getItem('user'));
  }
}

export default new AuthService();
