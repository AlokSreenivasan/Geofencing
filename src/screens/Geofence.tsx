import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {Circle, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import PrimaryButton from '../components/PrimaryButton.tsx';

function Geofence() {
  const [userLocation, setUserLocation] = useState(null);
  const [fenceCenter, setFenceCenter] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [status, setStatus] = useState('Set the fence to begin');
  const [waitingForLocation, setWaitingForLocation] = useState(true);

  const FENCE_RADIUS = 2; // meters

  // Request permission on Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  }, []);

  // Retry fetching location every 3s until available
  useEffect(() => {
    const interval = setInterval(() => {
      Geolocation.getCurrentPosition(
        position => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(coords);
          setWaitingForLocation(false);
          clearInterval(interval);
        },
        error => {
          console.log('Waiting for location to be enabled...');
        },
        {enableHighAccuracy: true, timeout: 5000, maximumAge: 0},
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Start tracking movement if enabled
  useEffect(() => {
    let watchId;

    if (isTracking) {
      watchId = Geolocation.watchPosition(
        position => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          setUserLocation(coords);

          if (fenceCenter) {
            const dist = getDistanceBetween(coords, fenceCenter);
            setStatus(
              dist <= FENCE_RADIUS ? 'Inside Fence ✅' : 'Outside Fence 🚨',
            );
          }
        },
        error => console.log(error),
        {enableHighAccuracy: true, distanceFilter: 10},
      );
    }

    return () => {
      if (watchId) Geolocation.clearWatch(watchId);
    };
  }, [isTracking, fenceCenter]);

  const setFence = () => {
    if (userLocation) {
      setFenceCenter(userLocation);
      setStatus('Fence set. Tap "Track Movement" to start.');
    }
  };

  const getDistanceBetween = (loc1, loc2) => {
    const toRad = deg => (deg * Math.PI) / 180;
    const R = 6371e3;
    const dLat = toRad(loc2.latitude - loc1.latitude);
    const dLon = toRad(loc2.longitude - loc1.longitude);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(loc1.latitude)) *
        Math.cos(toRad(loc2.latitude)) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  return (
    <View style={styles.container}>
      {userLocation ? (
        <MapView
          style={styles.map}
          region={{
            latitude: userLocation?.latitude,
            longitude: userLocation?.longitude,
            latitudeDelta: 0.0001,
            longitudeDelta: 0.0001,
          }}>
          <Marker coordinate={userLocation} title="You are here" />
          {fenceCenter && (
            <Circle
              center={fenceCenter}
              radius={FENCE_RADIUS}
              strokeColor="#4A90E2"
              fillColor="rgba(74,144,226,0.2)"
            />
          )}
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.statusText}>Waiting for location...</Text>
        </View>
      )}

      <View style={styles.bottomPanel}>
        <Text style={styles.status}>{status}</Text>


        <PrimaryButton title="Set Fence" onPress={setFence} />
        <PrimaryButton
          title={isTracking ? 'Stop Tracking' : 'Track Movement'}
          onPress={() => setIsTracking(prev => !prev)}
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  map: {...StyleSheet.absoluteFillObject},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 3,
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    fontWeight: '500',
  },
  statusText: {
    fontSize: 18,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default Geofence;
