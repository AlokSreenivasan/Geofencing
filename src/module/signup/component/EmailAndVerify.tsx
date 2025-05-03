import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

interface Props {
  value: string;
  onChange: (text: string) => void;
  onVerify: () => void;
  error?: string;
}

const EmailAndVerify: React.FC<Props> = ({
  value,
  onChange,
  onVerify,
  error,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={[styles.input]}
          placeholder="Enter your email"
          value={value}
          onChangeText={onChange}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.verifyButton} onPress={onVerify}>
          <Text style={styles.verifyText}>Verify</Text>
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  verifyButton: {
    backgroundColor: '#0a0a23',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  verifyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default EmailAndVerify;
