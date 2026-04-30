import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import useLotteryRegister from "../hooks/useLotteryRegister";
import Toast from "react-native-toast-message";

type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;

export function Register() {
  const route = useRoute<RegisterScreenRouteProp>();
  const navigation = useNavigation();
  const { lotteryIds } = route.params;
  const [name, setName] = useState("");
  const [touched, setTouched] = useState(false);
  const { registerToLotteries, loading, error } = useLotteryRegister();

  const isFieldValid = name.length >= 4;
  const showError = touched && !isFieldValid;
  const isButtonDisabled = !isFieldValid || loading;

  const handleSubmit = () => {
    if (isFieldValid && !loading) {
      registerToLotteries({ name, lotteries: lotteryIds })
        .then(() => {
          navigation.goBack();
          Toast.show({
            type: "success",
            text1: "Successfully registered!",
          });
        })
        .catch(() => {
          Toast.show({
            type: "error",
            text1: "Failed to register",
          });
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register for Lottery</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, showError && styles.inputError]}
          value={name}
          onChangeText={setName}
          onBlur={() => setTouched(true)}
          placeholder="Enter your name"
        />
        {showError && (
          <Text style={styles.errorText}>Must be at least 4 characters</Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isButtonDisabled}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Register</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#ff3b30",
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 12,
    marginTop: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
