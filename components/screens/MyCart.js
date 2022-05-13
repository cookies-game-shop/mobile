import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLOURS} from '../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'react-native-axios';

const MyCart = ({navigation}) => {
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(null);
  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
    axios
      .get('http://192.168.56.1:8080/user/get-cart', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      })
      .then(res => {
        // console.log(res);
        setProduct(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  //remove data from Cart

  // const removeItemFromCart = async id => {
  //   let itemArray = await AsyncStorage.getItem('cartItems');
  //   itemArray = JSON.parse(itemArray);
  //   if (itemArray) {
  //     let array = itemArray;
  //     for (let index = 0; index < array.length; index++) {
  //       if (array[index] == id) {
  //         array.splice(index, 1);
  //       }
  //
  //       await AsyncStorage.setItem('cartItems', JSON.stringify(array));
  //       getDataFromDB();
  //     }
  //   }
  // };

  //checkout

  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      return error;
    }

    ToastAndroid.show('Items will be Deliverd SOON!', ToastAndroid.SHORT);

    navigation.navigate('OrderDetail');
  };

  const renderProducts = (item, index) => {
    return (
      <TouchableOpacity
        key={item.key}
        onPress={() => navigation.navigate('ProductInfo', {productID: item.id})}
        style={{
          width: '100%',
          height: 100,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '30%',
            height: 100,
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOURS.backgroundLight,
            borderRadius: 10,
            marginRight: 22,
          }}>
          <Image
            source={{uri: item.previewImage}}
            accessibilityLabel={item.name}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <View>
            <Text
              style={{
                fontSize: 14,
                maxWidth: '100%',
                color: COLOURS.black,
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              {item.name}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  maxWidth: '85%',
                  marginRight: 4,
                }}>
                ${item.price}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {/*<TouchableOpacity onPress={() => removeItemFromCart(data.id)}>*/}
            {/*  <MaterialCommunityIcons*/}
            {/*    name="delete-outline"*/}
            {/*    style={{*/}
            {/*      fontSize: 16,*/}
            {/*      color: COLOURS.backgroundDark,*/}
            {/*      backgroundColor: COLOURS.backgroundLight,*/}
            {/*      padding: 8,*/}
            {/*      borderRadius: 100,*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</TouchableOpacity>*/}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.backgroundLight,
        position: 'relative',
      }}>
      <ScrollView>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: 16,
            paddingHorizontal: 16,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/*for go to Main Page*/}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundDark,
                padding: 12,
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              color: COLOURS.black,
              fontWeight: '500',
              marginRight: 30,
              letterSpacing: 1,
            }}>
            Shopping Cart
          </Text>
          <View />
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 20,
          }}>
          {product ? product.map(renderProducts) : null}
        </View>
        <View>
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 40,
              marginBottom: 80,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 20,
              }}>
              Order Info
            </Text>
            {/*<View*/}
            {/*  style={{*/}
            {/*    flexDirection: 'row',*/}
            {/*    alignItems: 'center',*/}
            {/*    justifyContent: 'space-between',*/}
            {/*  }}>*/}
            {/*  <Text*/}
            {/*    style={{*/}
            {/*      fontSize: 12,*/}
            {/*      fontWeight: '400',*/}
            {/*      maxWidth: '80%',*/}
            {/*      color: COLOURS.black,*/}
            {/*      opacity: 0.5,*/}
            {/*    }}>*/}
            {/*    Total*/}
            {/*  </Text>*/}
            {/*  <Text*/}
            {/*    style={{*/}
            {/*      fontSize: 18,*/}
            {/*      fontWeight: '500',*/}
            {/*      color: COLOURS.black,*/}
            {/*    }}>*/}
            {/*    {total}.00 tenge*/}
            {/*  </Text>*/}
            {/*</View>*/}
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => (total != 0 ? checkOut() : null)}
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
  );
};

export default MyCart;
