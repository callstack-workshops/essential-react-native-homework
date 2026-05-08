import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAB } from '../components/FAB';
import { LotteryCard } from '../components/LotteryCard';
import { RegisterModal } from '../components/RegisterModal';
import { useLotteries } from '../hooks/useLotteries';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const REGISTERED_KEY = 'registeredLotteryIds';

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { data: lotteries, loading, fetchLotteries } = useLotteries();
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [registeredIds, setRegisteredIds] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useIsFocused();

  useEffect(() => {
    AsyncStorage.getItem(REGISTERED_KEY).then((val) => {
      if (val) setRegisteredIds(JSON.parse(val));
    });
  }, []);

  const filteredLotteries = lotteries.filter((l) =>
    l.name.toLowerCase().includes(filter.toLowerCase()),
  );

  const handleSelect = (id: string) => {
    if (registeredIds.includes(id)) return;
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleRegisterSuccess = async () => {
    const updated = [...new Set([...registeredIds, ...selected])];
    setRegisteredIds(updated);
    await AsyncStorage.setItem(REGISTERED_KEY, JSON.stringify(updated));
    setSelected([]);
    fetchLotteries();
  };

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
            selected={selected.includes(item.id)}
            registered={registeredIds.includes(item.id)}
            onSelect={() => handleSelect(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
        onRefresh={fetchLotteries}
        refreshing={loading}
      />

      {selected.length > 0 && (
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.registerButtonText}>
            Register ({selected.length})
          </Text>
        </TouchableOpacity>
      )}

      <FAB onPress={() => navigation.navigate('AddLottery', { onGoBack: fetchLotteries })} />

      <RegisterModal
        visible={modalVisible}
        selectedLotteries={selected}
        onClose={() => setModalVisible(false)}
        onSubmit={handleRegisterSuccess}
      />
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
    paddingBottom: 160,
  },
  centered: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
  registerButton: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: '#6200ee',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 28,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
