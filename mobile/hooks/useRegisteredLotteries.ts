import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'registeredLotteryIds';

export default function useRegisteredLotteries() {
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);

  useEffect(() => {
    loadRegisteredIds();
  }, []);

  const loadRegisteredIds = async () => {
    try {
      const storedIds = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedIds) {
        setRegisteredIds(JSON.parse(storedIds));
      }
    } catch (error) {
      console.error('Failed to load registered lottery IDs:', error);
    }
  };

  const addRegisteredIds = async (lotteryIds: string[]) => {
    try {
      const updatedIds = [...new Set([...registeredIds, ...lotteryIds])];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIds));
      setRegisteredIds(updatedIds);
    } catch (error) {
      console.error('Failed to save registered lottery IDs:', error);
      throw error;
    }
  };

  return {
    registeredIds,
    addRegisteredIds,
    loadRegisteredIds,
  };
}
