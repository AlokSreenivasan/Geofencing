import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

function About() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About</Text>
        </View>
    );
}

    const styles = StyleSheet.create({
        container: {
            padding: 14,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            paddingTop: 46,
            textAlign: 'center',
            marginBottom: 5,
        },
});

export default About;
