import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

interface FormProps {
  title: string;
  label1?: string;
  label2?: string;
  placeholder1?: string;
  placeholder2?: string;
  buttonText?: string;
  onSubmit: (value1: string, value2: string) => void;
}

export function Form({
  title,
  placeholder1 = "Enter value",
  placeholder2 = "Enter value",
  buttonText = "Submit",
  onSubmit,
}: FormProps) {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [touched1, setTouched1] = useState(false);
  const [touched2, setTouched2] = useState(false);

  const isValid = value1.length >= 4 && value2.length >= 4;
  const showError1 = touched1 && value1.length > 0 && value1.length < 4;
  const showError2 = touched2 && value2.length > 0 && value2.length < 4;

  const handleSubmit = () => {
    if (isValid) {
      onSubmit(value1, value2);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, showError1 && styles.inputError]}
          value={value1}
          onChangeText={setValue1}
          onBlur={() => setTouched1(true)}
          placeholder={placeholder1}
        />
        {showError1 && (
          <Text style={styles.errorText}>Must be at least 4 characters</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, showError2 && styles.inputError]}
          value={value2}
          onChangeText={setValue2}
          onBlur={() => setTouched2(true)}
          placeholder={placeholder2}
        />
        {showError2 && (
          <Text style={styles.errorText}>Must be at least 4 characters</Text>
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, !isValid && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!isValid}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
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
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
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
