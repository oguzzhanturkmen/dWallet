import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
import { Platform } from 'react-native';
import {  router } from 'expo-router'
import { useCards } from '../context/CardContext';


const { height, width } = Dimensions.get('window');

const CARD_STORAGE_KEY = 'CARD_DETAILS';
const colorChoices = ['#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#900C3F', '#581845', '#4C4C4C', '#2ECC71', '#3498DB', '#9B59B6', '#34495E', '#16A085', '#27AE60', '#2980B9', '#8E44AD', '#2C3E50', '#F1C40F', '#E67E22', '#E74C3C', '#95A5A6'];

const Settings = () => {
  const [cardDetails, setCardDetails] = useState({
    cardId: Math.random().toString(36).substring(5),
    cardName: '',
    holderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardColor: 'gray', 
    cardType: '',
  });
  const { addCard } = useCards();
  const handleUpdate = (key, value) => {
    let formattedValue = value;
  
    switch (key) {
      case 'cardNumber':
        formattedValue = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
        break;
      case 'expiryDate':
        formattedValue = value.replace(/\D/g, '').slice(0, 4).replace(/(.{2})/, '$1/');
        break;
      case 'cvv':
        formattedValue = value.replace(/\D/g, '').slice(0, 4);
        break;
    }
  
    setCardDetails({
      ...cardDetails,
      [key]: formattedValue,
    });
  };
  function getCardType(cardNumber) {
    if (/^4/.test(cardNumber)) {
        return "Visa";
    } else if (/^5/.test(cardNumber)) {
        return "Mastercard";
    } else if (/^3[47]/.test(cardNumber)) {
        return "American Express";
    } else if (/^6(?:011|5[0-9]{2}|4[4-9][0-9]|22(?:1(?:2[6-9]|[3-9][0-9])|[2-8][0-9]{2}|9(?:[01][0-9]|2[0-5])))/.test(cardNumber)) {
        return "Discover";
    } else if (/^(30[0-5]|36|38)/.test(cardNumber)) {
        return "Diners Club";
    } else if (/^35(?:2[89]|[3-8][0-9])/.test(cardNumber)) {
        return "JCB";
    } else {
        return "Unknown";
    }
}

  const saveCardDetails = async () => {
    try {
      cardDetails.cardType = getCardType(cardDetails.cardNumber);
      await addCard(cardDetails);
      router.dismiss();
    } catch (error) {
      Alert.alert("Error", "Failed to save the card details.");
    }
  };

  // Optionally, create a function to load existing cards
  const loadCards = async () => {
    try {
      const cards = await AsyncStorage.getItem(CARD_STORAGE_KEY);
      if (cards) {
        // Do something with the cards, like setting state
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load the cards.");
    }
  };

  return (
    <View style={styles.screen}>
      <View style={{width : width}}>
      
      <View style={[styles.cardDisplayContainer, { backgroundColor: cardDetails.cardColor || "#874e2d" }]}>
      <View style={{width: width * 0.6 , height: width * 0.54, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', backgroundColor : 'white', position : 'absolute' , opacity : 0.1 , borderRadius : width , right : width * -0.3 , top : 0 ,}}/>
        <View >
          
          <View style={styles.cardLayout}>
        <Text style={styles.cardName}>
          {cardDetails.cardName || 'CARD NAME'}
        </Text>
        <Image source={require('../assets/images/chip.png')} style={{width: width * 0.1, height: height * 0.1, resizeMode: 'contain'}}/>
        <View style={{flexDirection : 'column'}}>
          <View style={{flexDirection : 'row', justifyContent : 'flex-end' , alignItems : 'center' , gap : 5}}>
        <Text style={styles.expirationDateTitle}>
          {'EXP'}
        </Text>
        <Text style={styles.expirationDate}>
          {cardDetails.expiryDate || 'MM/YY'}
        </Text>
        
        </View>
        <Text style={styles.cardDetails}>
          {cardDetails.cardNumber || '**** **** **** ****'}
        </Text>
        <Text style={styles.holderName}>
          {cardDetails.holderName || 'CARDHOLDER NAME'}
        </Text>
       
        </View>
        </View>
        </View>
        </View>
       
      </View>
      
      <ScrollView style={{paddingBottom : 200}}>
      <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center' , width : width}}>
      <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  style={{ marginTop: 20}}
>
  {colorChoices.map((color, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => handleUpdate('cardColor', color)}
      style={[styles.colorPicker, { backgroundColor: color }]}
    />
  ))}

</ScrollView>
</View>
      <KeyboardAvoidingView 
        style={{ flex: 1 , }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={30}
      >
      <View style={{ padding : width * 0.05 , height : height * 0.53 , paddingBottom : height * 0.4}}>
       
        <Text style={styles.label}>CARD NAME</Text>
        <TextInput
          placeholder="Enter Card  Name"
          placeholderTextColor={'gray'}
          onChangeText={(text) => handleUpdate('cardName', text)}
          style={styles.input}
          returnKeyType="done"
        />
        <Text style={styles.label}>CARD HOLDER NAME</Text>
        <TextInput
          placeholder="Enter Card Holder Name"
          placeholderTextColor={'gray'}
          onChangeText={(text) => handleUpdate('holderName', text)}
          style={styles.input}
          returnKeyType="done"
        />

        <Text style={styles.label}>CARD NUMBER</Text>
        <TextInput
          placeholder="Enter Card Number"
          placeholderTextColor={'gray'}
          onChangeText={(text) => handleUpdate('cardNumber', text)}
          style={styles.input}
          keyboardType="number-pad"
          returnKeyType="done"
          maxLength={16}
        />

        <Text style={styles.label}>EXPIRATION DATE (MM/YY)</Text>
        <TextInput
          placeholder="Enter Expiration Date"
          placeholderTextColor={'gray'}
          onChangeText={(text) => handleUpdate('expiryDate', text)}
          style={styles.input}
          maxLength={4}
          keyboardType="number-pad"
          returnKeyType="done"
        />

        <Text style={styles.label}>CVV</Text>
        <TextInput
          placeholder="Enter CVV"
          placeholderTextColor={'gray'}
          onChangeText={(text) => handleUpdate('cvv', text)}
          style={styles.input}
          keyboardType="number-pad"
          returnKeyType="done"
          
          maxLength={3}
        />
        <TouchableOpacity onPress={saveCardDetails} style={{ backgroundColor: 'white', padding: 15, borderRadius: 10, position: 'absolute', bottom: 20, width: width * 0.9 , alignSelf : 'center' }}>
      <Text style={{ color: 'black', textAlign: 'center', fontWeight: 'bold' }}>Save</Text>
    </TouchableOpacity>
        
      
      </View>
      </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
    

  },
  containerShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  cardDisplayContainer: {
    marginTop: height * 0.015,
    marginHorizontal: width * 0.025,
    
    borderRadius: 20,
    padding: width * 0.05,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
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
    justifyContent : 'space-between',
    alignItems : 'flex-start',
  },
  input: {
    width: '100%',
    borderBottomWidth: 0.7,
    borderBottomColor: 'white',
    marginVertical: 10,
    paddingBottom : 10,
    color : 'white'
  },
  label: {
    alignSelf: 'flex-start',
    
    marginBottom: 5,
    fontWeight: 'bold',
    color : 'white'
  },
  cardName : {
    color : 'white',
    fontSize : width * 0.05,
    fontWeight : 'bold',
    marginBottom : 10
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
  },
  holderName: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    

  },
  colorPicker: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  
});

export default Settings;
