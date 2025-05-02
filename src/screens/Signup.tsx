import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import PrimaryButton from '../components/PrimaryButton.tsx';
import LocationField from '../module/signup/component/LocationField.tsx';
import EmailAndVerify from '../module/signup/component/EmailAndVerify.tsx';
import {useNavigation} from '@react-navigation/native';
import PrimaryTextInput from '../components/PrimaryTextInput.tsx';

function Signup() {
  const {navigate} = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
    password: '',
    confirmPassword: '',
  });

  const signupUser = () => {
    navigate('About');
  };
  const handleFieldChange =
    (field: keyof typeof formData) => (text: string) => {
      setFormData(prev => ({...prev, [field]: text}));
    };
  const handleVerify = () => {
    alert('Email verified!');
  };
  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>
            <Text style={styles.subtitle}>
              Create an account to get started
            </Text>

            <PrimaryTextInput
              label="Name"
              placeholder="Enter Name"
              onChangeText={handleFieldChange('name')}
            />

            <Text style={styles.label}>Email</Text>

            <EmailAndVerify
              value={formData.email}
              onChange={handleFieldChange('email')}
              onVerify={handleVerify}
            />

            <PrimaryTextInput
              label="Pincode"
              placeholder="Enter Pincode"
              onChangeText={handleFieldChange('pincode')}
            />

            <LocationField
              city={formData.city}
              state={formData.state}
              country={formData.country}
            />

            <PrimaryTextInput
              label="Password"
              placeholder="Enter Password"
              secureTextEntry
              onChangeText={handleFieldChange('password')}
            />

            <PrimaryTextInput
              label="Retype Password"
              placeholder="Retype Password"
              secureTextEntry
              onChangeText={handleFieldChange('confirmPassword')}
            />

            <PrimaryButton title="Sign Up" onPress={signupUser} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  subtitle: {
    fontSize: 15,
    paddingTop: 10,
    alignSelf: 'center',
    marginBottom: 24,
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
    marginBottom: 14,
  },
});

export default Signup;
