import {PermissionsAndroid, Platform, Alert} from 'react-native';

export const requestGalleryPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;

    const permission =
        Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    try {
        const granted = await PermissionsAndroid.request(permission);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            Alert.alert(
                'Permission Denied',
                'You need to grant photo access to select a picture.',
            );
            return false;
        }
    } catch (error) {
        Alert.alert('Error', 'Something went wrong while requesting permission.');
        return false;
    }
};
