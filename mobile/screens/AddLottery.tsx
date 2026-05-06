import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddLotteryForm from "../components/Form";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function AddLottery() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
        <View style={styles.navigationContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5 name="chevron-left" size={20} color="blue" />
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <AddLotteryForm />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 48,
        position: 'relative',
    },
    navigationContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: 'grey',
        paddingBlock: 12,
    },
    formContainer: {
        justifyContent: 'center',
        height: '100%',
    },
});