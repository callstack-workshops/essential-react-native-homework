import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { useState } from 'react';
import { colors } from '../colors';

interface RegistrationSheetProps {
  visible: boolean;
  selectedCount: number;
  onClose: () => void;
  onRegister: (name: string) => void;
}

export default function RegistrationSheet({ visible, selectedCount, onClose, onRegister }: RegistrationSheetProps) {
  const [name, setName] = useState('');

  const isDisabled = name.trim().length === 0 || selectedCount === 0;

  const handleRegister = () => {
    onRegister(name.trim());
    setName('');
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheet}>
              <Text style={styles.title}>Register to lotteries</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />
              <Pressable
                style={[styles.button, isDisabled && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={isDisabled}
              >
                <Text style={[styles.buttonText, isDisabled && styles.buttonTextDisabled]}>Register</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'white',
  },
  sheet: {
    flex: 1,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    width: '100%',
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.buttonPrimary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.grey,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: '#888',
  },
});
