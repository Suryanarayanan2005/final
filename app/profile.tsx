import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  Button,
  Card,
  Divider,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen() {
  const router = useRouter();
  const scrollRef = useRef(null);

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogout = () => {
    router.replace('/');
  };

  const handleChangePassword = () => {
    const toggled = !showChangePassword;
    setShowChangePassword(toggled);

    if (!toggled) {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowOldPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);

      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const handleGoBack = () => {
    router.push("/dashboard");
  };

  const handleSubmitPasswordChange = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
    setShowChangePassword(false);

    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <Animatable.View animation="fadeInRight" duration={500} style={styles.container}>
      <View style={styles.headerBox}>
        <IconButton
          icon="arrow-left"
          size={width * 0.06}
          onPress={handleGoBack}
          iconColor="#fff"
          style={styles.backIcon}
        />
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scrollContainer}
        scrollEnabled={showChangePassword}
      >
        <Card style={styles.card}>
          <Card.Content style={styles.profileSection}>
            <Image
              source={require('../assets/images/akk.jpeg')}
              style={styles.avatar}
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>Akshaykumar S</Text>
              <Text style={styles.role}>Field Executive</Text>
            </View>
          </Card.Content>

          <Divider style={{ marginVertical: 12 }} />

          <View style={styles.infoSection}>
            {[
              { label: 'Email', value: 'akshaykumar059004@pradan.net' },
              { label: 'Mobile', value: '+91 9876543210' },
              { label: 'Date of Joining', value: '15 March 2023' },
              { label: 'Location', value: 'Jharkhand' },
            ].map((item, index) => (
              <View key={index} style={styles.itemBlock}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.value}>{item.value}</Text>
                <Divider style={styles.itemDivider} />
              </View>
            ))}

            <TouchableOpacity onPress={handleChangePassword}>
              <Text style={styles.changePassword}>Change Password</Text>
            </TouchableOpacity>
          </View>

          {showChangePassword && (
            <View style={styles.passwordBox}>
              <TextInput
                label="Old Password"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry={!showOldPassword}
                right={
                  <TextInput.Icon
                    icon={showOldPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowOldPassword(!showOldPassword)}
                    size={width * .06}
                  />
                }
                style={styles.input}
              />

              <TextInput
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                right={
                  <TextInput.Icon
                    icon={showNewPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowNewPassword(!showNewPassword)}
                    size={width * .06}
                  />
                }
                style={styles.input}
              />

<TextInput
  label="Confirm New Password"
  value={confirmPassword}
  onChangeText={setConfirmPassword}
  secureTextEntry={!showConfirmPassword}
  right={
    <TextInput.Icon
      icon={showConfirmPassword ? 'eye-off' : 'eye'}
      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
      size={width * .06}
    />
  }
  style={styles.input}
/>


              <Button
                mode="contained"
                onPress={handleSubmitPasswordChange}
                style={styles.submitBtn}
                labelStyle={styles.submitBtnText}
              >
                Submit
              </Button>
            </View>
          )}
        </Card>

        <Button
  mode="contained"
  style={styles.logoutButton}
  labelStyle={styles.logoutButtonText}
  onPress={handleLogout}
>
  Logout
</Button>

      </ScrollView>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContainer: {
    paddingBottom: height * 0.05,
  },
  headerBox: {
    backgroundColor: '#1B5E20',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: height * 0.01,
    paddingBottom: height * 0.02,
    paddingHorizontal: width * 0.04,
    elevation: 4,
  },
  backIcon: {
    marginRight: width * 0.02,
    paddingTop: height * 0.011,
  },
  headerTitle: {
    color: '#fff',
    paddingTop: height * 0.01,
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  card: {
    margin: width * 0.04,
    borderRadius: width * 0.05,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    backgroundColor: '#fff',
    elevation: 3,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: width * 0.2,
    width: width * 0.2,
    borderRadius: width * 0.1,
    marginRight: width * 0.04,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  role: {
    fontSize: width * 0.035,
    color: '#4CAF50',
    fontWeight: '500',
    marginTop: height * 0.002,
  },
  infoSection: {
    marginTop: height * 0.015,
  },
  itemBlock: {
    marginBottom: height * 0.018,
  },
  label: {
    fontSize: width * 0.04,
    color: '#1B5E20',
    marginBottom: height * 0.003,
  },
  value: {
    fontSize: width * 0.042,
    color: '#333',
    fontWeight: '500',
  },
  itemDivider: {
    marginTop: height * 0.012,
  },
  changePassword: {
    marginTop: height * 0.012,
    color: '#1B5E20',
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: width * 0.037,
  },
  passwordBox: {
    marginTop: height * 0.025,
  },
  input: {
    marginBottom: height * 0.015,
    backgroundColor: '#fff',
    padding: width * 0.03,
    borderRadius: width * 0.02,
    fontSize: width * 0.04,
  },
  submitBtn: {
    backgroundColor: '#1B5E20',
    borderRadius: width * 0.02,
    marginTop: height * 0.01,
    paddingVertical: height * 0.012,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#fff',
    fontSize: width * 0.03,  // Adjust for readability
    fontWeight: 'bold',
  },
  logoutButton: {
    marginHorizontal: width * 0.04,
    marginTop: height * 0.03,
    backgroundColor: '#1B5E20',
    borderRadius: width * 0.025,
    paddingVertical: height * 0.01,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: width * 0.03,  // Adjust for readability
    fontWeight: 'bold',
  },
});