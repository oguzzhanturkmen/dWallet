import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const Settings = () => {
  const [cardDetails, setCardDetails] = useState({
    holderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleUpdate = (key, value) => {
    setCardDetails({
      ...cardDetails,
      [key]: value,
    });
  };

  return (
    <View style={styles.screen}>
      <View style={styles.cardDisplayContainer}>
        <Text style={styles.cardDisplay}>
          {cardDetails.holderName || 'CARDHOLDER NAME'}
          {'\n'}
          {cardDetails.cardNumber || 'XXXX XXXX XXXX XXXX'}
          {'\n'}
          {cardDetails.expiryDate || 'MM/YY'}  {cardDetails.cvv || 'CVV'}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Card Holder Name</Text>
        <TextInput
          placeholder="Enter Card Holder Name"
          onChangeText={(text) => handleUpdate('holderName', text)}
          style={styles.input}
        />

        <Text style={styles.label}>Card Number</Text>
        <TextInput
          placeholder="Enter Card Number"
          onChangeText={(text) => handleUpdate('cardNumber', text)}
          style={styles.input}
          keyboardType="number-pad"
        />

        <Text style={styles.label}>Expiration Date (MM/YY)</Text>
        <TextInput
          placeholder="Enter Expiration Date"
          onChangeText={(text) => handleUpdate('expiryDate', text)}
          style={styles.input}
        />

        <Text style={styles.label}>CVV</Text>
        <TextInput
          placeholder="Enter CVV"
          onChangeText={(text) => handleUpdate('cvv', text)}
          style={styles.input}
          keyboardType="number-pad"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  cardDisplayContainer: {
    marginTop: height * 0.015,
    marginHorizontal: width * 0.025,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.95,
    height: height * 0.25, 
  },
  cardDisplay: {
    textAlign: 'center',
    color: 'black',
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginVertical: 10,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginBottom: 5,
    fontWeight: 'bold',
  },
});

export default Settings;
