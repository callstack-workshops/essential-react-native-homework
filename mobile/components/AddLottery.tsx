import { View, StyleSheet } from "react-native";
import { Form } from "./Form";

export function AddLottery() {
  const handleSubmit = (name: string, numbers: string) => {
    console.log("Lottery Name:", name);
    console.log("Numbers:", numbers);
  };

  return (
    <View style={styles.container}>
      <Form
        title="Add Lottery"
        placeholder1="Lottery Name"
        placeholder2="Lottery Prize"
        buttonText="Add"
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