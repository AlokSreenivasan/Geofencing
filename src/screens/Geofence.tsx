import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import MapView from 'react-native-maps';

function Geofence() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Geofence</Text>
      <MapView style={styles.map}></MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Geofence;
