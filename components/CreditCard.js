import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'expo-linear-gradient'
import { Image } from 'react-native';

const { width, height } = Dimensions.get('window');

const CreditCard = ({ cardDetails }) => {
  const getCardImage = () => {
    switch (cardDetails.cardType) {
      case 'Visa':
        console.log('Visa')
        return require('../assets/images/visa.png');
      case 'Mastercard':
        return require('../assets/images/mastercard.png');
      // Add cases for other card types as needed
      default:
        console.log('Default')
        console.log(cardDetails.cardType)
        return null;
    }
  };
  
  return (
   
      
    <View style={[styles.cardDisplayContainer, { backgroundColor: cardDetails.cardColor || "#874e2d" }]}>
    <View style={{width: width * 0.6 , height: width * 0.6, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', backgroundColor : 'white', position : 'absolute' , opacity : 0.1 , borderRadius : width , right : width * -0.3 , top : 0, shadowColor :'black' , shadowOffset : 10 , shadowRadius : 20 ,}}/>
      
        <View style={styles.cardLayout}>
          <View >
            <View style={{flexDirection : 'row', justifyContent : 'space-between' , alignItems : 'center'  , width : '100%' , paddingBottom : 10 }}>
              
      <Text style={styles.cardName}>
        {cardDetails.cardName || 'CARD NAME'}
      </Text>
      <Image source={getCardImage(cardDetails.cardType)} style={{width: width * 0.1, height: height * 0.035, resizeMode: 'contain'}}/>
      </View>
      <Text style={styles.cardNumber}>
        {'﹡﹡﹡﹡  ﹡﹡﹡﹡  ﹡﹡﹡﹡ ' + cardDetails.cardNumber.slice(-4)}
      </Text>
      </View>
      <Image source={require('../assets/images/chip.png')} style={{width: width * 0.1, height: height * 0.1, resizeMode: 'contain'}}/>
      
     
      </View>
      
      
      
     
    </View>
    
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
    
    

  },
  cardDisplayContainer: {
    
    marginHorizontal: width * 0.025,
    
    borderRadius: 20,
    padding: width * 0.05,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
    width: width * 0.95,
    height: height * 0.25, 
    overflow : 'hidden'
    
    
  },
  cardDisplay: {
    
    color: 'black',
  },
  inputContainer: {
    flex: 1,
    padding: 20,
    paddingBottom : height * 0.1
    

  },
  cardLayout: {
    width : '100%',
    height : '100%',
    
    alignItems : 'flex-start',
  },
  cardName : {
    color : 'white',
    fontSize : width * 0.05,
    fontWeight : 'bold',
    
  },
  cardDetails:{
    color : 'white',
    fontSize : width * 0.04,
    fontWeight : 500
  },
  expirationDateTitle: {
    fontSize: 10,
    color: '#a6a6a6',
  },
  expirationDate: {
    fontSize: 12,
    color: 'white',
  },
  cardNumber: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    
  },
  cardHolder: {
    fontSize: 12,
    color: 'white',
  },
});

export default CreditCard;
