import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Alert, Image
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useCards } from '../../../context/CardContext';

const { height, width } = Dimensions.get('window');
const colorChoices = ['#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#900C3F', '#581845', '#4C4C4C', '#2ECC71', '#3498DB', '#9B59B6', '#34495E', '#16A085', '#27AE60', '#2980B9', '#8E44AD', '#2C3E50', '#F1C40F', '#E67E22', '#E74C3C', '#95A5A6'];

const EditModal = ({  }) => {
  const { cardId } = useLocalSearchParams();
  const { cards, addCard, updateCard } = useCards();
  const existingCard = cards.find(card => card.cardId === cardId);

  const [cardDetails, setCardDetails] = useState({
    cardId: existingCard ? existingCard.cardId : Math.random().toString(36).substring(5),
    cardName: existingCard ? existingCard.cardName : '',
    holderName: existingCard ? existingCard.holderName : '',
    cardNumber: existingCard ? existingCard.cardNumber : '',
    expiryDate: existingCard ? existingCard.expiryDate : '',
    cvv: existingCard ? existingCard.cvv : '',
    cardColor: existingCard ? existingCard.cardColor : 'gray', 
    cardType: existingCard ? existingCard.cardType : '',
  });
  useEffect(() => {
    console.log(existingCard)
    console.log(cardId)
  }, [cardDetails])


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
      default:
        break;
    }

    setCardDetails(prevDetails => ({
      ...prevDetails,
      [key]: formattedValue,
    }));
  };

  useEffect(() => {
    setCardDetails(currentDetails => ({
      ...currentDetails,
      cardType: getCardType(currentDetails.cardNumber)
    }));
  }, [cardDetails.cardNumber]);

  function getCardType(cardNumber) {
    if (/^4/.test(cardNumber)) return "Visa";
    else if (/^5/.test(cardNumber)) return "Mastercard";
    else if (/^3[47]/.test(cardNumber)) return "American Express";
    else if (/^6/.test(cardNumber)) return "Discover";
    else if (/^(30[0-5]|36|38)/.test(cardNumber)) return "Diners Club";
    else if (/^35(2[89]|[3-8][0-9])/.test(cardNumber)) return "JCB";
    else return "Unknown";
  }

  const saveCardDetails = async () => {
    try {
      if (existingCard) {
        await updateCard(cardDetails.cardId, { ...cardDetails, cardType: getCardType(cardDetails.cardNumber) });
      } else {
        await addCard({ ...cardDetails, cardType: getCardType(cardDetails.cardNumber) });
      }
      router.dismiss();
    } catch (error) {
      Alert.alert("Error", "Failed to save the card details.");
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={{paddingBottom: 200}}>
      <View style={styles.cardLayout}>
        <Text style={styles.cardName}>
          {cardDetails.cardName || 'CARD NAME'}
        </Text>
        <Image source={require('../../../assets/images/chip.png')} style={{width: width * 0.1, height: height * 0.1, resizeMode: 'contain'}}/>
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
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: width}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 20 }}>
            {colorChoices.map((color, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleUpdate('cardColor', color)}
                style={[styles.colorPicker, { backgroundColor: color }]}
              />
            ))}
          </ScrollView>
        </View>
        <View style={{ padding: width * 0.05, paddingBottom: height * 0.4 }}>
          <TextInput
            placeholder="Enter Card Name"
            placeholderTextColor={'gray'}
            onChangeText={(text) => handleUpdate('cardName', text)}
            value={cardDetails.cardName}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter Card Holder Name"
            placeholderTextColor={'gray'}
            onChangeText={(text) => handleUpdate('holderName', text)}
            value={cardDetails.holderName}
            style={styles.input}
          />
          <TextInput
            placeholder="Enter Card Number"
            placeholderTextColor={'gray'}
            onChangeText={(text) => handleUpdate('cardNumber', text)}
            value={cardDetails.cardNumber}
            style={styles.input}
            keyboardType="number-pad"
          />
          <TextInput
            placeholder="Enter Expiration Date (MM/YY)"
            placeholderTextColor={'gray'}
            onChangeText={(text) => handleUpdate('expiryDate', text)}
            value={cardDetails.expiryDate}
            style={styles.input}
            keyboardType="number-pad"
          />
          <TextInput
            placeholder="Enter CVV"
            placeholderTextColor={'gray'}
            onChangeText={(text) => handleUpdate('cvv', text)}
            value={cardDetails.cvv}
            style={styles.input}
            keyboardType="number-pad"
          />
          <TouchableOpacity onPress={saveCardDetails} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
  },
  cardDisplayContainer: {
    marginTop: height * 0.015,
    marginHorizontal: width * 0.025,
    borderRadius: 20,
    padding: width * 0.05,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'gray', // Default background color
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardName: {
    color: 'white',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDetails: {
    color: 'white',
    fontSize: width * 0.04,
    marginBottom: 10,
  },
  expirationDate: {
    color: 'white',
    fontSize: width * 0.04,
    marginBottom: 10,
  },
  holderName: {
    color: 'white',
    fontSize: width * 0.04,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginVertical: 10,
    color: 'white',
    padding: 10,
  },
  saveButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  colorPicker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  
});

export default EditModal;

