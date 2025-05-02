import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import PrimaryTextInput from '../components/PrimaryTextInput.tsx';
import {validateField} from '../utils/FormValidation.tsx';
import PrimaryButton from '../components/PrimaryButton.tsx';
import {useNavigation} from '@react-navigation/native';
import {requestGalleryPermission} from '../utils/AndroidPermissionUtil.ts';

const ProfileEditScreen = () => {
  const {navigate} = useNavigation();

  const [imageUri, setImageUri] = useState(null);
  const [bio, setBio] = useState('');
  const [bioError, setBioError] = useState('');
  const [imageError, setImageError] = useState('');

  const pickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) return;

    launchImageLibrary({mediaType: 'photo'}, response => {
      if (
        !response.didCancel &&
        response.assets &&
        response.assets.length > 0
      ) {
        setImageUri(response.assets[0].uri);
        setImageError('');
      }
    });
  };

  const handleBioChange = (text: string) => {
    setBio(text);
    const error = validateField('bio', text, {bio: text});
    setBioError(error);
  };

  const handleProceed = () => {
    const bioValidationError = validateField('bio', bio, {bio});
    console.log(bioValidationError);
    const imageValidationError = imageUri ? '' : 'Profile picture is required.';

    setBioError(bioValidationError);
    setImageError(imageValidationError);

    if (!bioValidationError && !imageValidationError) {
      navigate('Geofence');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.profileContainer}>
            <Image
              source={
                imageUri ? {uri: imageUri} : require('../assets/Image/user.png')
              }
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
              <AntDesign name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {imageError ? (
            <Text style={styles.errorText}>{imageError}</Text>
          ) : null}

          <PrimaryTextInput
            style={styles.bioInput}
            multiline
            placeholder="Write your bio (max 100 words)"
            value={bio}
            onChangeText={handleBioChange}
            label="About"
            error={bioError}
          />
          <PrimaryButton title="Proceed" onPress={handleProceed} />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  profileContainer: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'slategray',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bioInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 200,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -20,
    marginBottom: 16,
    marginLeft: 4,
  },
});

export default ProfileEditScreen;
