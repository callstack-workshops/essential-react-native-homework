import React, { useState } from "react";
import { Text, View, FlatList, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity } from "react-native";
import { FAB } from "./FAB";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import useLotteries from "../hooks/useLotteries";
import useRegisteredLotteries from "../hooks/useRegisteredLotteries";
import { Lottery } from "../types";
import { LotteryCard } from "./LotteryCard";
import { Ionicons } from "@expo/vector-icons";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { data: lotteries, loading, error, fetchLotteries } = useLotteries();
  const { registeredIds, loadRegisteredIds } = useRegisteredLotteries();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLotteryIds, setSelectedLotteryIds] = useState<string[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchLotteries();
    }, [])
  );

  const openAddLottery = () => {
    navigation.navigate("AddLottery");
  };

  const filteredLotteries = lotteries.filter((lottery) =>
    lottery.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLotteryPress = (lotteryId: string) => {
    if (registeredIds.includes(lotteryId)) {
      return;
    }

    setSelectedLotteryIds((prevSelected) => {
      if (prevSelected.includes(lotteryId)) {
        return prevSelected.filter((id) => id !== lotteryId);
      } else {
        return [...prevSelected, lotteryId];
      }
    });
  };

  const handleRegister = () => {
    navigation.navigate("Register", {
      lotteryIds: selectedLotteryIds,
      onSuccessfulComplete: () => {
        setSelectedLotteryIds([]);
        loadRegisteredIds();
      }
    });
  };

  const isRegisterEnabled = selectedLotteryIds.length > 0;

  const renderLotteryItem = ({ item }: { item: Lottery }) => (
    <LotteryCard
      lottery={item}
      isSelected={selectedLotteryIds.includes(item.id)}
      isRegistered={registeredIds.includes(item.id)}
      onPress={() => handleLotteryPress(item.id)}
    />
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.registerButton, !isRegisterEnabled && styles.registerButtonDisabled]}
        onPress={handleRegister}
        disabled={!isRegisterEnabled}
      >
        <Text style={styles.registerButtonText}>
          Register {selectedLotteryIds.length > 0 ? `(${selectedLotteryIds.length})` : ''}
        </Text>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search lotteries..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredLotteries}
        renderItem={renderLotteryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? "No lotteries found" : "No lotteries yet"}
            </Text>
          </View>
        }
      />
      <FAB onPress={openAddLottery} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  registerButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 0,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
  },
});