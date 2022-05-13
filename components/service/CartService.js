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
}

export default new cartService();
