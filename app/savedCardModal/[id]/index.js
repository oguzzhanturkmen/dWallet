import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
import { Platform } from 'react-native';
import {  router } from 'expo-router'
import { useCards } from '../../../context/CardContext';
import { useLocalSearchParams } from 'expo-router';
import { ClipboardIcon } from 'react-native-heroicons/outline';
import * as Clipboard from 'expo-clipboard';





const { height, width } = Dimensions.get('window');

const CARD_STORAGE_KEY = 'CARD_DETAILS';


const SavedCardModal = () => {
  
  const { cardId } = useLocalSearchParams();
  const { cards } = useCards();

  const getCardImage = () => {
    switch (card.cardType) {
      case 'Visa':
        console.log('Visa')
        return require('../../../assets/images/visa.png');
      case 'Mastercard':
        return require('../../../assets/images/mastercard.png');
      // Add cases for other card types as needed
      default:
        console.log('Default')
        console.log(card.cardType)
        return null;
    }
  };
  
 const card = cards.find((card) => card.cardId === cardId) || {};

 useEffect(() => {
   console.log(cardId)
    }
    , [card])

  return (
    <View style={styles.screen}>
      <View style={{width : width}}>
      
      <View style={[styles.cardDisplayContainer, { backgroundColor: card.cardColor || "#874e2d" }]}>
      <View style={{width: width * 0.6 , height: width * 0.54, justifyContent: 'center', alignItems: 'center', overflow: 'hidden', backgroundColor : 'white', position : 'absolute' , opacity : 0.1 , borderRadius : width , right : width * -0.3 , top : 0 ,}}/>
        <View >
          
          <View style={styles.cardLayout}>
        <View style={{flexDirection : 'row', justifyContent : 'space-between' , alignItems : 'center'  , width : '100%' , paddingBottom : 10 }}>
              
      <Text style={styles.cardName}>
        {card.cardName || 'CARD NAME'}
      </Text>
      <Image source={getCardImage(card.cardType)} style={{width: width * 0.1, height: height * 0.035, resizeMode: 'contain'}}/>
      </View>
        <Image source={require('../../../assets/images/chip.png')} style={{width: width * 0.1, height: height * 0.1, resizeMode: 'contain'}}/>
        <View style={{flexDirection : 'column'}}>
          <View style={{flexDirection : 'row', justifyContent : 'flex-end' , alignItems : 'center' , gap : 5}}>
        <Text style={styles.expirationDateTitle}>
          {'EXP'}
        </Text>
        <Text style={styles.expirationDate}>
          {card.expiryDate || 'MM/YY'}
        </Text>
        
        </View>
        <Text style={styles.cardDetails}>
          {card.cardNumber || '**** **** **** ****'}
        </Text>
        <Text style={styles.holderName}>
          {card.holderName || 'CARDHOLDER NAME'}
        </Text>
       
        </View>
        </View>
        </View>
        </View>
       
      </View>
      
      <ScrollView style={{paddingBottom : 200}}>
      
      
      <View style={{ padding : width * 0.05 , height : height * 0.53 , paddingBottom : height * 0.4}}>
       
       <View style={styles.sectionContainer}>
        <Text style={styles.label}>CARD NAME</Text>
        <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center' , paddingBottom : 15}}>
        <Text style={{fontSize : 16 , color : 'white' }}>{card.cardName}</Text>
        <TouchableOpacity onPress={() => {
        Clipboard.setString(card.cardName);
        
      }}>
        <ClipboardIcon size={28} color={'white'} />
        </TouchableOpacity>
        </View>
        </View>
        <View  style={styles.sectionContainer}>
        <Text style={styles.label}>CARD HOLDER NAME</Text>
        <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center' , paddingBottom : 15}}>
        <Text style={{fontSize : 16 , color : 'white', marginBottom : 15 }}>{card.holderName}</Text>
        <TouchableOpacity onPress={() => {
        Clipboard.setString(card.holderName);
        
      }}>
        <ClipboardIcon size={28} color={'white'} />
        </TouchableOpacity>
        </View>
        </View>
        <View  style={styles.sectionContainer}>
        <Text style={styles.label}>CARD NUMBER</Text>
        <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center' , paddingBottom : 15}}>
        <Text style={{fontSize : 16 , color : 'white', marginBottom : 15}}>{card.cardNumber}</Text>
        <TouchableOpacity onPress={() => {
        Clipboard.setString(card.cardNumber);
        
      }}>
        <ClipboardIcon size={28} color={'white'} />
        </TouchableOpacity>
        </View>
        </View>
        <View  style={styles.sectionContainer}>
        <Text style={styles.label}>EXPIRATION DATE (MM/YY)</Text>
        <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center' , paddingBottom : 15}}>
        <Text style={{fontSize : 16 , color : 'white', marginBottom : 15}}>{card.expiryDate}</Text>
        <TouchableOpacity onPress={() => {
        Clipboard.setString(card.expiryDate);
        
      }}>
        <ClipboardIcon size={28} color={'white'} />
        </TouchableOpacity>
        </View>
        </View>
        <View  style={styles.sectionContainer}>
        <Text style={styles.label}>CVV</Text>
        <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center' , paddingBottom : 15}}>
        <Text style={{fontSize : 16 , color : 'white', marginBottom : 15}}>{card.cvv}</Text>
        <TouchableOpacity onPress={() => {
        Clipboard.setString(card.cvv);
        
      }}>
        <ClipboardIcon size={28} color={'white'} />
        </TouchableOpacity>
        </View>
        </View>
        
      
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
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginVertical: 10,
    color : 'white'
  },
  label: {
    alignSelf: 'flex-start',
    
    marginBottom: 5,
    fontWeight: 'bold',
    color : 'gray',
    fontSize : 16,
    
    
  },
  cardName : {
    color : 'white',
    fontSize : width * 0.035,
    fontWeight : 'bold'
  },
  cardDetails:{
    color : 'white',
    fontSize : width * 0.04,
    fontWeight : '500'
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
  cardHolder: {
    fontSize: 12,
    color: 'white',
  },
  colorPicker: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  sectionContainer : {
    marginBottom : 20,
    borderBottomColor : '#a6a6a6',
    borderBottomWidth : 0.3,
  },
  holderName: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    

  },
  
  
});

export default SavedCardModal;
