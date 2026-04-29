import { View, StyleSheet } from "react-native";
import { Form } from "./Form";
import { useNewLottery } from "../hooks/useNewLottery";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import Toast from "react-native-toast-message";

type AddLotteryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddLottery'>;

export function AddLottery() {
  const { createNewLottery, loading, error } = useNewLottery();
  const navigation = useNavigation<AddLotteryScreenNavigationProp>();

  const handleSubmit = (name: string, prize: string) => {
    createNewLottery({ name, prize })
      .then(() => {
        navigation.goBack();
        Toast.show({
          type: "success",
          text1: "New lottery added successfully!",
        });
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Failed to add lottery",
        });
      });
  };

  return (
    <View style={styles.container}>
      <Form
        title="Add Lottery"
        placeholder1="Lottery Name"
        placeholder2="Lottery Prize"
        buttonText="Add"
        loading={loading}
        onSubmit={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
}); 