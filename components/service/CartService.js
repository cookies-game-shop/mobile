import axios from 'axios';
import QueryString from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';

class cartService {
  async addToCart(game_id) {
    axios
      .post(
        `http://192.168.56.1:8080/user/add-to-card?game_id=${game_id}`,
        QueryString.stringify({
          game_id: game_id,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        },
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  async deleteFromCart(game_id) {
    axios
      .delete(`http://192.168.56.1:8080/user/delete-card?game_id=${game_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },

        data: JSON.stringify({
          game_id: game_id,
        }),
      })
      .then(function (res) {
        console.log(res.data);
      });
  }
}

export default new cartService();
