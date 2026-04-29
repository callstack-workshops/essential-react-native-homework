import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddLottery } from './components/AddLottery';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './components/Home';
import Toast from 'react-native-toast-message';

export type RootStackParamList = {
  Home: undefined;
  AddLottery: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddLottery" component={AddLottery} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
      <Toast />
    </>
  );
}

