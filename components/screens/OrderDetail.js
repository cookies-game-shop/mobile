import React, {useState} from 'react';
import {useStripe} from '@stripe/stripe-react-native';
import {View, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';
import {COLOURS} from '../database/Database';
import {StripeProvider} from '@stripe/stripe-react-native';
import PaymentScreen from './PaymentScreen';

const OrderDetail = ({navigation}) => {
  return (
    <View style={styles.container}>
      <PaymentScreen />
    </View>
  );
};
const styles = StyleSheet.create({
  styleName: {
    width: 300,
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
  },
});
export default OrderDetail;
