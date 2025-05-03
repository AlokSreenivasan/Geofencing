import React from 'react';
import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';

interface Props extends TextInputProps {
  label: string;
}

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

const PrimaryTextInput: React.FC<Props> = ({label, error, style, ...rest}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={[styles.input, style]} {...rest} />
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default PrimaryTextInput;
