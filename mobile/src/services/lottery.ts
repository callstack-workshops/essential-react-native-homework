import Constants from 'expo-constants';
import { Lottery } from '../types';

const host = Constants.expoConfig?.hostUri?.split(':')[0] ?? 'localhost';
const API_URL = `http://${host}:3000`;

export async function createNewLottery({
  name,
  prize,
}: {
  name: string;
  prize: string;
}): Promise<Lottery> {
  const response = await fetch(`${API_URL}/lotteries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'simple', name, prize }),
  });

  const body = (await response.json()) as Lottery;
  return body;
}

export async function getLotteries(): Promise<Array<Lottery>> {
  const response = await fetch(`${API_URL}/lotteries`);
  const body = (await response.json()) as Array<Lottery>;
  return body;
}
