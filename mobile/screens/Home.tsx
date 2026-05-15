import { StyleSheet, Text, View } from "react-native";
import Fab from "../components/Fab";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigationTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import LotteriesList from "../components/LotteriesList";

type HomeNavigation = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<HomeNavigation>();
    const navigateToAddLottery = () => {
        navigation.navigate("AddLottery");
    };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
      <Text style={styles.title}>Lotteries</Text>
      <FontAwesome5 name="dice-five" size={32} color="black" />
      </View>
      <View style={styles.lotteriesContainer}>
        <LotteriesList />
      </View>
      <Fab onPress={navigateToAddLottery} />
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
    title: {
        fontSize: 32,
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
    },
    lotteriesContainer: {
        flex: 1,
        width: '100%',
        paddingTop: 24,
    },
});