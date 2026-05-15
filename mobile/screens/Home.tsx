import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Fab from '../components/Fab';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigationTypes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import LotteriesList from '../components/LotteriesList';
import { useState } from 'react';
import { useRegisteredLotteries } from '../hooks/useRegisteredLotteries';
import RegistrationSheet from '../components/RegistrationSheet';
import { colors } from '../colors';
import Toast from 'react-native-toast-message';

type HomeNavigation = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigation>();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sheetVisible, setSheetVisible] = useState(false);
  const { registeredIds, register } = useRegisteredLotteries();

  const navigateToAddLottery = () => {
    navigation.navigate('AddLottery');
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleRegister = async (name: string) => {
    try {
      await register(name, selectedIds);
      Toast.show({
        type: 'success',
        text1: 'Registered successfully!',
        text2: `Lottery IDs: ${selectedIds.join(', ')}`,
      });
      setSelectedIds([]);
      setSheetVisible(false);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Registration failed',
        text2: 'Please try again.',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setSheetVisible(true)}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Lotteries</Text>
        <FontAwesome5 name="dice-five" size={32} color="black" />
      </View>
      <View style={styles.lotteriesContainer}>
        <LotteriesList
          selectedIds={selectedIds}
          registeredIds={registeredIds}
          onToggleSelect={handleToggleSelect}
        />
      </View>
      <Fab onPress={navigateToAddLottery} />
      <RegistrationSheet
        visible={sheetVisible}
        selectedCount={selectedIds.length}
        onClose={() => setSheetVisible(false)}
        onRegister={handleRegister}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingBottom: 24,
    position: 'relative',
    alignItems: 'center',
  },
  topBar: {
    width: '100%',
    paddingHorizontal: 16,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 32,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  registerButtonText: {
    color: colors.buttonSecondary,
    fontSize: 16,
  },
  lotteriesContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 24,
  },
});
