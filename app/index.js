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

    const handleCardEditPress = (cardId) => {
      console.log('Card Edit Pressed');
      console.log(cardId)
      router.push({
        pathname: `savedCardModal/${cardId}/editModal` ,
        params: {
          cardId: cardId,
          
        }
     })}
    
  
  
  return (
    <View style={styles.container}>
      <SafeAreaView style ={{backgroundColor : 'black'}}>
        <View style={{flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center' , paddingBottom : 2 ,paddingHorizontal : 20 , paddingTop : 20, backgroundColor : 'black' ,}}>
        <View style={{width : width * 0.16}}>
          {cards.length > 0 ? (
          <TouchableOpacity onPress={handleEditButtonPress} >
            {isPressedOnEditButton ? (
          <Text style={{color : 'white'}}>Done</Text>
            ) : (<Text style={{color : 'white'}}>Edit Card</Text>)}
          </TouchableOpacity>
          ) : null}
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
        <ScrollView style={{paddingTop : 12}}>
          <View style={{flexDirection : 'column' , gap : height * -0.1 , backgroundColor : null }}>
          {cards.map((card, cardId)  => (
            
            <TouchableOpacity style={styles.containerShadow} onPress={() => handleCardPress(card.cardId)}
            >
              {isPressedOnEditButton ? (
                <View style={{flexDirection : 'row' , gap : 10 , position : 'absolute',  top : -13 , right: 2 , zIndex : 20 }}>
                <TouchableOpacity onPress={() => removeCard(card.cardId)} style={{backgroundColor : 'white' , justifyContent : 'center', width : 30 , height : 30 , position : 'absolute' , top : 2 , right: 2 , zIndex : 20 , backgroundColor : 'red' , borderRadius : 100  }} >
              <View style={{  }}>
                <Text style={{color : 'white' , fontSize : 20 , fontWeight : 'bold' , textAlign : 'center' , alignSelf : 'center' , }}>X</Text>
              </View>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor : 'white' , justifyContent : 'center', width : 30 , height : 30 , position : 'absolute' , top : 2 , right: 40 , zIndex : 20 , backgroundColor : '#b6c2d6' , borderRadius : 100  }} onPress={() => handleCardEditPress(card.cardId)} >
              <View style={{ justifyContent : 'center'  }}>
                <Text style={{color : 'white' , fontSize : 14 , fontWeight : 'bold' , textAlign : 'center' , alignSelf : 'center' , }}>...</Text>
                </View>
              </TouchableOpacity>
              </View>
              ) : null}
            <CreditCard key={cardId} cardDetails={card} />
            
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
