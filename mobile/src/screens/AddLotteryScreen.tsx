import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Form } from '../components/Form';
import { useNewLottery } from '../hooks/useNewLottery';
import type { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AddLottery'>;
type Route = RouteProp<RootStackParamList, 'AddLottery'>;

export function AddLotteryScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { loading, error, createNewLottery } = useNewLottery();

  const handleSubmit = (values: { name: string; prize: string }) =>
    createNewLottery(values).then(() => {
      route.params.onGoBack();
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: 'New lottery added successfully!',
      });
    });

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Form onSubmit={handleSubmit} loading={loading} error={error} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
  },
});
