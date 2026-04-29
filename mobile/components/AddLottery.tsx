import { View, StyleSheet } from "react-native";
import { Form } from "./Form";
import { useNewLottery } from "../hooks/useNewLottery";

export function AddLottery() {
  const { createNewLottery, loading, error } = useNewLottery();

  const handleSubmit = (name: string, prize: string) => {
    createNewLottery({ name, prize });
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