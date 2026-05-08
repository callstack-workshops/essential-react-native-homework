import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

interface FormValues {
  name: string;
  prize: string;
}

interface FormErrors {
  name?: string;
  prize?: string;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name || values.name.length < 4) {
    errors.name = 'Name must be at least 4 characters';
  }
  if (!values.prize || values.prize.length < 4) {
    errors.prize = 'Prize must be at least 4 characters';
  }
  return errors;
}

interface Props {
  onSubmit: (values: FormValues) => Promise<void>;
  loading: boolean;
  error?: string;
}

export function Form({ onSubmit, loading, error }: Props) {
  const [values, setValues] = useState<FormValues>({ name: '', prize: '' });
  const [touched, setTouched] = useState<{ name: boolean; prize: boolean }>({
    name: false,
    prize: false,
  });

  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  const handleBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit(values);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Lottery name</Text>
      <TextInput
        style={[
          styles.input,
          touched.name && errors.name ? styles.inputError : null,
        ]}
        value={values.name}
        onChangeText={(text) => setValues((prev) => ({ ...prev, name: text }))}
        onBlur={() => handleBlur('name')}
        placeholder="Enter lottery name"
        placeholderTextColor="#aaa"
      />
      {touched.name && errors.name ? (
        <Text style={styles.errorText}>{errors.name}</Text>
      ) : null}

      <Text style={styles.label}>Lottery prize</Text>
      <TextInput
        style={[
          styles.input,
          touched.prize && errors.prize ? styles.inputError : null,
        ]}
        value={values.prize}
        onChangeText={(text) =>
          setValues((prev) => ({ ...prev, prize: text }))
        }
        onBlur={() => handleBlur('prize')}
        placeholder="Enter lottery prize"
        placeholderTextColor="#aaa"
      />
      {touched.prize && errors.prize ? (
        <Text style={styles.errorText}>{errors.prize}</Text>
      ) : null}

      {error ? <Text style={styles.serverError}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, (!isValid || loading) && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={!isValid || loading}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Add</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
  inputError: {
    borderColor: '#e53935',
  },
  errorText: {
    fontSize: 12,
    color: '#e53935',
  },
  serverError: {
    fontSize: 14,
    color: '#e53935',
    marginTop: 8,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#bbb',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
