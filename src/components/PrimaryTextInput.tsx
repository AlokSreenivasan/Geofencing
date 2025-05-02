import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
    label: string;
}

const PrimaryTextInput: React.FC<Props> = ({ label, style, ...rest }) => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={[styles.input, style]} {...rest} />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
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
});

export default PrimaryTextInput;
