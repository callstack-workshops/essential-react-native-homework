import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import * as LotteryService from '../services/lottery';

const STORAGE_KEY = 'registeredLotteryIds';

export function useRegisteredLotteries() {
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        setRegisteredIds(JSON.parse(raw) as string[]);
      }
    });
  }, []);

  const register = useCallback(async (name: string, lotteryIds: string[]) => {
    await Promise.all(
      lotteryIds.map((lotteryId) =>
        LotteryService.registerToLottery({ name, lotteryId }),
      ),
    );
    const merged = Array.from(new Set([...registeredIds, ...lotteryIds]));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    setRegisteredIds(merged);
  }, [registeredIds]);

  return { registeredIds, register };
}
