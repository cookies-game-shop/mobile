import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
class UserService {
  // adminCheck(user) {
  //   axios
  //     .get('http://192.168.56.1:8080/user/get-admin-creds')
  //     .then(response => {
  //       console.log(response.data);
  //       return response.data;
  //     });
  // }
  getUser(username) {
    axios
      .get(`http://192.168.56.1:8080/user/get-user/${username}`)
      .then(response => {
        console.log(response.data);
        return response.data;
      });
  }
  getLoggedIn() {
    const token = AsyncStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }
}
export default new UserService();
