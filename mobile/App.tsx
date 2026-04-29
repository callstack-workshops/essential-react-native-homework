import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddLottery } from './components/AddLottery';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './components/Home';


const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

