import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {COLOURS} from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'react-native-axios';
import CartService from '../service/CartService';
import {setImage} from '../service/utils';
const ProductInfo = ({route, navigation}) => {
  const {productID} = route.params;
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchProducts();
  });

  const fetchProducts = () => {
    axios
      .get(`http://192.168.56.1:8080/game/get-game?id=${productID}`)
      .then(res => {
        const cop = setImage(res.data);
        setProduct(cop);
        // console.log(setImage(res.data));
        // setProduct(setImage(res.data));
        // setProduct(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addToCart = e => {
    e.preventDefault();
    CartService.addToCart(productID).then(() => {
      alert('success');
      navigation.navigate('Home');
    });
  };

  return (
    <View style={styles.headers}>
      <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle="dark-content"
      />
      <ScrollView>
        <View style={styles.root}>
          <View style={styles.styleForNavigate}>
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Entypo name="chevron-left" style={styles.entypoStyleForBack} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageForBack}>
          <Image
            source={{uri: product.previewImage}}
            accessibilityLabel={product.name}
            style={styles.image}
          />
        </View>
        <View style={styles.entypoStyleForShoppingHeader}>
          <View style={styles.entypoStyleForShoppingRoot}>
            <Entypo name="shopping-cart" style={styles.entypoShopping} />
            <Text style={styles.textForShopping}>Shopping</Text>
          </View>
          <View style={styles.textNameRoot}>
            <Text style={styles.textName}>{product.name}</Text>
          </View>
          <Text style={styles.textParStyle}>{product.par}</Text>
          <View>
            <Text style={styles.textPriceStyle}>Price: ${product.price}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonRootStyle}>
        <TouchableOpacity onPress={addToCart} style={styles.buttonAddToCart}>
          <Text style={styles.textAddToCartStyle}> Add to cart </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headers: {
    width: '100%',
    height: '100%',
    backgroundColor: COLOURS.white,
    position: 'relative',
  },
  root: {
    width: '100%',
    // backgroundColor: COLOURS.backgroundLight,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  styleForNavigate: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingLeft: 16,
  },
  entypoStyleForBack: {
    fontSize: 18,
    color: COLOURS.backgroundDark,
    padding: 12,
    backgroundColor: COLOURS.backgroundLight,
    borderRadius: 10,
  },
  imageForBack: {
    // width: width,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  entypoStyleForShoppingHeader: {
    paddingHorizontal: 16,
    marginTop: 6,
    // marginLeft: 20,
  },
  entypoStyleForShoppingRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  entypoShopping: {
    fontSize: 18,
    color: COLOURS.blue,
    marginRight: 6,
  },
  textForShopping: {
    fontSize: 12,
    color: COLOURS.black,
  },
  textNameRoot: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textName: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginVertical: 4,
    color: COLOURS.black,
    maxWidth: '84%',
  },
  textParStyle: {
    fontSize: 12,
    color: COLOURS.black,
    fontWeight: '400',
    letterSpacing: 1,
    opacity: 0.5,
    lineHeight: 20,
    maxWidth: '85%',
    marginBottom: 18,
  },
  textPriceStyle: {
    fontSize: 18,
    fontWeight: '500',
    maxWidth: '85%',
    color: COLOURS.black,
    marginBottom: 4,
  },
  buttonRootStyle: {
    position: 'relative',
    bottom: 3,
    height: '8%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAddToCart: {
    width: '86%',
    height: '90%',
    backgroundColor: COLOURS.blue,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAddToCartStyle: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1,
    color: COLOURS.white,
    textTransform: 'uppercase',
  },
});
export default ProductInfo;
