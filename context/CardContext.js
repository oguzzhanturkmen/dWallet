import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardContext = createContext();

export const useCards = () => useContext(CardContext);

export const CardProvider = ({ children }) => {
  const [cards, setCards] = useState([]);
  const CARD_STORAGE_KEY = 'CARD_DETAILS';

  useEffect(() => {
    const fetchCards = async () => {
      const storedCards = await AsyncStorage.getItem(CARD_STORAGE_KEY);
      if (storedCards) setCards(JSON.parse(storedCards));
    };

    fetchCards();
  }, []);

  const addCard = async (newCard) => {
    const updatedCards = [...cards, newCard];
    await AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(updatedCards));
    setCards(updatedCards);
  };

  const removeCard = async (cardId) => {
    const updatedCards = cards.filter(card => card.cardId !== cardId);
    await AsyncStorage.setItem(CARD_STORAGE_KEY, JSON.stringify(updatedCards));
    setCards(updatedCards);
  };

  const value = {
    cards,
    addCard,
    removeCard, // Add the removeCard function to the context value
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};
