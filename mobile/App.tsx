import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

enableScreens();
import { HomeScreen } from './src/screens/HomeScreen';
import { AddLotteryScreen } from './src/screens/AddLotteryScreen';
import type { RootStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="AddLottery"
          component={AddLotteryScreen}
          options={{ title: 'Add a new lottery' }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
