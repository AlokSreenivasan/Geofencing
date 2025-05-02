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
import {validateAllFields, validateField} from '../utils/FormValidation.tsx';
import {fetchLocationFromPincode} from '../utils/LocationUtil.ts';
import OtpModal from "../module/signup/component/OtpModal.tsx";

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

    const [showOtpModal, setShowOtpModal] = useState(false);

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const signupUser = () => {
    const errors = validateAllFields(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      navigate('About');
    }
  };

  const handleFieldChange =
    (field: keyof typeof formData) => async (text: string) => {
      let updatedText = text;

      if (field === 'pincode') {
        setFormData(prev => ({
          ...prev,
          [field]: updatedText,
          city: '',
          state: '',
          country: '',
        }));
      } else {
        setFormData(prev => ({...prev, [field]: updatedText}));
      }

      const updatedForm = {
        ...formData,
        [field]: updatedText,
        ...(field === 'pincode' && {
          city: '',
          state: '',
          country: '',
        }),
      };

      const error = validateField(field, updatedText, updatedForm);
      setFormErrors(prev => ({...prev, [field]: error}));

      if (field === 'pincode' && updatedText.length === 6 && !error) {
        const location = await fetchLocationFromPincode(updatedText);
        setFormData(prev => ({
          ...prev,
          city: location.city,
          state: location.state,
          country: location.country,
        }));
      }
    };

  const handleVerify = () => {
    const emailError = validateField('email', formData.email, formData);
    setFormErrors(prev => ({...prev, email: emailError}));

    if (!emailError) {
      // Optionally trigger API call to send OTP here
      setShowOtpModal(true); // show modal if email is valid
    }
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
              error={formErrors.name}
            />

            <Text style={styles.label}>Email</Text>

            <EmailAndVerify
              value={formData.email}
              onChange={handleFieldChange('email')}
              onVerify={handleVerify}
              error={formErrors.email}
            />

            <OtpModal
              visible={showOtpModal}
              onClose={() => setShowOtpModal(false)}
              onSubmit={otp => {
                console.log('Entered OTP:', otp);
                setShowOtpModal(false);
              }}
            />

            <PrimaryTextInput
              label="Pincode"
              placeholder="Enter Pincode"
              onChangeText={handleFieldChange('pincode')}
              keyboardType="numeric"
              error={formErrors.pincode}
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
              error={formErrors.password}
            />

            <PrimaryTextInput
              label="Retype Password"
              placeholder="Retype Password"
              secureTextEntry
              onChangeText={handleFieldChange('confirmPassword')}
              error={formErrors.confirmPassword}
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
