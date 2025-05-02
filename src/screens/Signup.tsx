import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function Signup() {
  return (
    <View>
      <Text style={styles.container}>Sign up</Text>
    </View>
  );
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'yellow',
        }
    })

export default Signup;
