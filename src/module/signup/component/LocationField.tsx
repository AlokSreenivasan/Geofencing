import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface Props {
  city: string;
  state: string;
  country: string;
}

const LocationField: React.FC<Props> = ({city, state, country}) => {
  return (
    <View style={styles.row}>
      <TextInput
        style={[styles.input, styles.col]}
        placeholder="City"
        value={city}
        editable={false}
      />
      <TextInput
        style={[styles.input, styles.col]}
        placeholder="State"
        value={state}
        editable={false}
      />
      <TextInput
        style={[styles.input, styles.col]}
        placeholder="Country"
        value={country}
        editable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 14,
  },
  col: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 8,
  },
});

export default LocationField;
