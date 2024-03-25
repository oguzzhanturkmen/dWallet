import { StyleSheet, ScrollView, Text, View  } from 'react-native';

import CreditCard from '../components/CreditCard';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {Link} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router';
import { useCards } from '../context/CardContext';

const { width, height } = Dimensions.get('window');

export default function TabOneScreen() {
  const { cards, removeCard } = useCards();
  

  

  const [isPressedOnEditButton, setIsPressedOnEditButton] = useState(false);

  const handleCardPress = (cardId) => {
    console.log('Card Pressed');
    console.log(cardId)
    router.push({
      pathname: `savedCardModal/${cardId}` ,
      params: {
        cardId: cardId,
        
      }
   })}
   const handleEditButtonPress = () => {
      setIsPressedOnEditButton(!isPressedOnEditButton);
      console.log(isPressedOnEditButton)
    }
    
  
  
  return (
    <View style={styles.container}>
      <SafeAreaView style ={{backgroundColor : 'black'}}>
        <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center' , paddingBottom : 10 ,paddingHorizontal : 20 , paddingTop : 20, backgroundColor : 'black'}}>
        <View>
          <TouchableOpacity onPress={handleEditButtonPress} >
          <Text style={{color : 'white'}}>Edit Card</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{color : 'white' , fontWeight : 'bold' , fontSize : 20}}>Credit Cards</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('modal')} >
          <Text style={{color : 'white'}}>Add Card</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
      {cards.length > 0 ? (
        <ScrollView>
          <View style={{flexDirection : 'column' , gap : height * -0.1 , backgroundColor : null }}>
          {cards.map((card, index) => (
            <TouchableOpacity style={styles.containerShadow} onPress={() => handleCardPress(card.cardId)}
            >
              {isPressedOnEditButton ? (
                <TouchableOpacity onPress={() => removeCard(card.cardId)} style={{backgroundColor : 'white' , justifyContent : 'center', width : 40 , height : 40 , position : 'absolute' , top : 2 , right: 2 , zIndex : 20 , backgroundColor : 'red' , borderRadius : 40  }} >
              <View style={{backgroundColor : 'white' , justifyContent : 'center', width : 40 , height : 40 , position : 'absolute' , top : 2 , right: 2 , zIndex : 20 , backgroundColor : 'red' , borderRadius : 40  }}>
                <Text style={{color : 'white' , fontSize : 20 , fontWeight : 'bold' , textAlign : 'center' , alignSelf : 'center' , }}>X</Text>
              </View>
              </TouchableOpacity>) : null}
            <CreditCard key={index} cardDetails={card} />
            
            </TouchableOpacity>
          ))}
          </View>
        </ScrollView>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color : 'white'}}>No cards added yet.</Text>
        </View>
      )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    
  },
  containerShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
