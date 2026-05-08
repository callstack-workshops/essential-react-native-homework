import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FAB } from '../components/FAB';
import { LotteryCard } from '../components/LotteryCard';
import { useLotteries } from '../hooks/useLotteries';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { data: lotteries, loading, fetchLotteries } = useLotteries();
  const [filter, setFilter] = useState('');

  useIsFocused();

  const filteredLotteries = lotteries.filter((l) =>
    l.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          value={filter}
          onChangeText={setFilter}
          placeholder="Filter lotteries"
          placeholderTextColor="#aaa"
        />
      </View>

      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#6200ee" />
        </View>
      )}

      {!loading && lotteries.length === 0 && (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No lotteries yet.</Text>
        </View>
      )}

      {!loading && lotteries.length > 0 && filteredLotteries.length === 0 && (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No results for "{filter}"</Text>
        </View>
      )}

      <FlatList
        data={filteredLotteries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LotteryCard
            lottery={item}
            selected={false}
            onSelect={() => {}}
          />
        )}
        contentContainerStyle={styles.list}
        onRefresh={fetchLotteries}
        refreshing={loading}
      />

      <FAB onPress={() => navigation.navigate('AddLottery', { onGoBack: fetchLotteries })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
    color: '#000',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  centered: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
});
