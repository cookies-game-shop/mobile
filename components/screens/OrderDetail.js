import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLOURS} from '../database/Database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderDetail = ({navigation}) => {
  const [total, setTotal] = useState(null);

  //get total price of all items in the cart
  const getTotal = productData => {
    let total = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].productPrice;
      total = total + productPrice;
    }
    setTotal(total);
  };

  //checkout

  // const checkOut = async () => {
  //   try {
  //     await AsyncStorage.removeItem('cartItems');
  //   } catch (error) {
  //     return error;
  //   }
  //
  //   // ToastAndroid.show('Items will be Deliverd SOON!', ToastAndroid.SHORT);
  //
  //   navigation.navigate('Home');
  // };
  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View style={styles.root}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.title}>Order Detail Page</Text>
        <View />
      </View>
      <View style={styles.rootSecond}>
        <TextInput placeholder="First name" style={styles.container} />
        <TextInput placeholder="Last name" style={styles.container} />
        <TextInput placeholder="Email" style={styles.container} />
      </View>
      <View
        style={{
          paddingHorizontal: 16,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: COLOURS.black,
            fontWeight: '500',
            letterSpacing: 1,
          }}>
          Payment Method
        </Text>
      </View>
      <View style={styles.rootSecond}>
        <TextInput
          placeholder="Credit card/Debit card/PayPal"
          style={styles.container}
        />
        <TextInput placeholder="Name on card" style={styles.container} />
        <TextInput placeholder="Credit card number" style={styles.container} />
        <TextInput
          placeholder="Expiration"
          style={{
            backgroundColor: COLOURS.white,
            width: '70%',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#e8e8e8',
            paddingHorizontal: 23,
            marginVertical: 5,
          }}
        />
        <TextInput
          placeholder="CVV"
          style={{
            backgroundColor: COLOURS.white,
            width: '50%',
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#e8e8e8',
            paddingHorizontal: 23,
            marginVertical: 5,
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: -5,
            height: '8%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            // onPress={() => (total != 0 ? checkOut() : null)}
            style={{
              width: '86%',
              height: '90%',
              backgroundColor: COLOURS.blue,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                letterSpacing: 1,
                color: COLOURS.white,
                textTransform: 'uppercase',
              }}>
              CHECKOUT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: COLOURS.black,
    fontWeight: '500',
    marginRight: 30,
    letterSpacing: 1,
  },
  back: {
    fontSize: 18,
    color: COLOURS.backgroundDark,
    padding: 12,
    backgroundColor: COLOURS.backgroundLight,
    borderRadius: 12,
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
  rootSecond: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLOURS.backgroundLight,
  },
});
export default OrderDetail;
