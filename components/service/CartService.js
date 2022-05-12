import axios from 'axios';
import QueryString from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
class cartService {
  addToCart(username, game_id) {
    axios
      .post(
        `http://192.168.56.1:8080/user/add-to-card?username=${username}&game_id=${game_id}`,
        QueryString.stringify({
          username: username,
          game_id: game_id,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${AsyncStorage.getItem('token')}`,
          },
        },
      )
      .then(function (res) {
        console.log(res.data);
      });
  }
}

export default new cartService();
