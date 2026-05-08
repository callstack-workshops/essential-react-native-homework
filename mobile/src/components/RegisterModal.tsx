import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useLotteryRegister } from '../hooks/useLotteryRegister';

interface Props {
  visible: boolean;
  selectedLotteries: Array<string>;
  onClose: () => void;
  onSubmit: () => void;
}

export function RegisterModal({
  visible,
  selectedLotteries,
  onClose,
  onSubmit,
}: Props) {
  const { loading, error, registerToLotteries } = useLotteryRegister();
  const [name, setName] = useState('');
  const [touched, setTouched] = useState(false);

  const nameError = name.length > 0 && name.length < 4 ? 'Name must be at least 4 characters' : undefined;
  const isValid = name.length >= 4;

  const handleClose = () => {
    setName('');
    setTouched(false);
    onClose();
  };

  const handleSubmit = () => {
    if (!isValid) return;
    registerToLotteries({ name, lotteries: selectedLotteries })
      .then(() => {
        onSubmit();
        handleClose();
      })
      .catch(() => {});
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Register for a lottery</Text>

          <TextInput
            style={[styles.input, touched && nameError ? styles.inputError : null]}
            placeholder="Enter your name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
            onBlur={() => setTouched(true)}
          />
          {touched && nameError ? (
            <Text style={styles.errorText}>{nameError}</Text>
          ) : null}

          {error ? <Text style={styles.serverError}>{error}</Text> : null}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submitButton, (!isValid || loading) && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={!isValid || loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitText}>Register</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheet: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '85%',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    color: '#111',
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
    marginTop: 4,
  },
  serverError: {
    fontSize: 14,
    color: '#e53935',
    marginTop: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cancelText: {
    color: '#555',
    fontSize: 15,
  },
  submitButton: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonDisabled: {
    backgroundColor: '#bbb',
  },
  submitText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
