import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [setShowFromModal,setShowFrom]=useState(false);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/pradan_tran.png")} style={styles.logo} />
      <Text style={styles.title}>Login to Pradan</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={width * .06} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="abcd@gmail.com"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.passwordContainer}>
        <FontAwesome name="lock" size={width * .08}
 style={styles.icon} />
        <TextInput
          style={{ flex: 1, fontSize: 16, color: '#000' }}
          placeholder="••••••"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Text style={{ color: '#4a7744' }}>{secureText ? 'Show' : 'Hide'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton}
      onPress={() => {
        setShowFrom(false);
        router.push("/dashboard");
      }}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton}
      onPress={() => {
        setShowFrom(false);
        router.push("/dashboard_verifier");
      }}>
        <Text style={styles.loginButtonText}>VERIFIER LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05, // 5% of screen width
  },
  logo: {
    width: width * 0.5, // 50% of screen width
    height: height * 0.1, // 10% of screen height
    resizeMode: 'contain',
    marginBottom: height * 0.03,
  },
  title: {
    fontSize: width * 0.06, // ~24px on standard 360px width
    fontWeight: 'bold',
    marginBottom: height * 0.04,
    color: '#000',
  },
  inputContainer: {
    width: '100%',
    marginBottom: height * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4a7744',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.025,
    backgroundColor: '#F5F5F5',
  },
  input: {
    flex: 1,
    height: height * 0.065, // ~50px on 720px height
    fontSize: width * 0.042, // ~16px
    color: '#000',
    backgroundColor: 'transparent',
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4a7744',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.025,
    backgroundColor: '#F5F5F5',
  },
  icon: {
    marginRight: width * 0.025,
    color: '#4a7744',
  },
  loginButton: {
    marginTop: height * 0.03,
    backgroundColor: '#134e13',
    borderRadius: width * 0.02,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
});


export default LoginScreen;