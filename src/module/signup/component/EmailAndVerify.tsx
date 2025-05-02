import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
    value: string;
    onChange: (text: string) => void;
    onVerify: () => void;
}

const EmailAndVerify: React.FC<Props> = ({ value, onChange, onVerify }) => {
    return (
        <View style={styles.row}>
            <TextInput
                style={[styles.input, { flex: 1 }]}
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
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#fafafa',
        padding: 12,
        borderRadius: 8,
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
});

export default EmailAndVerify;
