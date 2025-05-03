import React, {useState, useRef, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface OtpModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
}

const OtpModal: React.FC<OtpModalProps> = ({visible, onClose, onSubmit}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    onSubmit(enteredOtp);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Text style={{fontSize: 18}}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Enter Verification Code</Text>
          <Text style={styles.subtitle}>
            We have sent the verification code to your Email
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                style={styles.otpBox}
                keyboardType="number-pad"
                maxLength={1}
                value={value}
                onChangeText={text => handleChange(text, index)}
                ref={ref => (inputs.current[index] = ref)}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.submit, otp.every(d => d) ? styles.active : {}]}
            onPress={handleSubmit}
            disabled={!otp.every(d => d)}>
            <Text style={{color: '#fff'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modal: {
    width: 300,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  close: {
    alignSelf: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  subtitle: {
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 4,
  },
  submit: {
    backgroundColor: '#aaa',
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 8,
    marginBottom: 10,
  },
  active: {
    backgroundColor: '#4CAF50',
  },
  resend: {
    color: '#e65a00',
    marginTop: 8,
  },
});

export default OtpModal;
