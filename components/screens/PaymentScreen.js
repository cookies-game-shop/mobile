import React, {useState} from 'react';
import {
  CardField,
  CardFieldInput,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import {COLOURS} from '../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Home from './Home';

const PaymentScreen = () => {
  const [card, setCard] = useState(CardFieldInput.Details | null);
  const {confirmPayment, handleCardAction} = useStripe();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();
  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!card?.complete || !email || !name || !phone) {
      alert('Please enter Complete card details and Email');
    } else {
      alert('success');
      navigation.navigate('Home');
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" style={styles.back} />
        </TouchableOpacity>
        <TextInput
          value={name}
          onChangeText={text => setName(text)}
          placeholder="Name"
          style={styles.container}
        />
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email"
          style={styles.container}
        />
        <TextInput
          value={phone}
          onChangeText={text => setPhone(text)}
          placeholder="Phone"
          style={styles.container}
        />
        <StripeProvider publishableKey="pk_test_51JLlrQSCrqIF8lRiuhSYY7MVJSgCX6UwcuCBpj1uXQCqGncGi4KA9Zbsa9cj42TtuaNd8fN8QMu0YPXEjT6veHiY00RqWsKaoE">
          <CardField
            postalCodeEnabled={false}
            placeholder={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            }}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={cardDetails => {
              setCard(cardDetails);
            }}
            onFocus={focusedField => {
              console.log('focusField', focusedField);
            }}
          />
        </StripeProvider>
        <Button
          style={styles.button}
          title="Checkout"
          color="#841584"
          onPress={handlePayPress}
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
  back: {
    fontSize: 18,
    color: COLOURS.backgroundDark,
    backgroundColor: COLOURS.white,
    padding: 12,
    borderRadius: 12,
    marginRight: 320,
  },
  container: {
    backgroundColor: COLOURS.white,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#e8e8e8',
    paddingHorizontal: 23,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#00aeef',
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 15,
  },
});
export default PaymentScreen;
