import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Lottery } from '../types';

interface Props {
  lottery: Lottery;
  selected: boolean;
  onSelect: () => void;
}

export function LotteryCard({ lottery, selected, onSelect }: Props) {
  const isDisabled = lottery.status === 'finished';

  return (
    <TouchableOpacity
      style={[
        styles.card,
        selected && styles.cardSelected,
        isDisabled && styles.cardDisabled,
      ]}
      onPress={isDisabled ? undefined : onSelect}
      activeOpacity={isDisabled ? 1 : 0.7}
    >
      <Text style={styles.name}>{lottery.name}</Text>
      <Text style={styles.prize}>{lottery.prize}</Text>
      <Text style={styles.id}>{lottery.id}</Text>
      <Text style={styles.status}>
        {lottery.status === 'running' ? '🔄' : '✅'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    marginBottom: 12,
  },
  cardSelected: {
    borderColor: '#6200ee',
    borderWidth: 2,
  },
  cardDisabled: {
    backgroundColor: '#f5f5f5',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  prize: {
    fontSize: 13,
    color: '#555',
    marginBottom: 2,
  },
  id: {
    fontSize: 11,
    color: '#aaa',
  },
  status: {
    position: 'absolute',
    top: 12,
    right: 12,
    fontSize: 16,
  },
});
