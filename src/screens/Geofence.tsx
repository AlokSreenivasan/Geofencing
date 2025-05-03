import React, { useEffect, useState, useRef } from 'react';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import PrimaryButton from '../components/PrimaryButton.tsx';

function Geofence() {
  const [userLocation, setUserLocation] = useState(null);
  const [fenceCenter, setFenceCenter] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [status, setStatus] = useState('Set the fence to begin');

  const FENCE_RADIUS = 20; // meters
  const mapRef = useRef(null);

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
            clearInterval(interval);
          },
          error => {
            console.log('Waiting for location to be enabled...');
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
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
          { enableHighAccuracy: true, distanceFilter: 1 },
      );
    }

    return () => {
      if (watchId) Geolocation.clearWatch(watchId);
    };
  }, [isTracking, fenceCenter]);

  // Recenter map on user location change
  useEffect(() => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion(
          {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0001,
            longitudeDelta: 0.0001,
          },
          500
      );
    }
  }, [userLocation]);

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
                ref={mapRef}
                style={styles.map}
                mapType="standard"
                region={{
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                  latitudeDelta: 0.0009,
                  longitudeDelta: 0.0009,
                }}>
              <Marker coordinate={userLocation} title="You are here" />
              {fenceCenter && (
                  <Circle
                      center={fenceCenter}
                      radius={FENCE_RADIUS}
                      strokeColor="red"
                      fillColor="rgba(255,0,0,0.3)"
                      zIndex={10}
                  />
              )}
            </MapView>
        ) : (
            <View style={styles.loadingContainer}>
              <Text style={styles.statusText}>Fetching current location...</Text>
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
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
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
});

export default Geofence;
