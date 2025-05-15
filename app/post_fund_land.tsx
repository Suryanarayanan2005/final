import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const BasicDetailsForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { onSubmit } = route.params || {};

  const [formData, setFormData] = useState({
    name: 'John Doe',
    fatherSpouse: 'Father Name',
    code: '12345',
    hamlet: 'Hamlet Name',
    panchayat: 'Panchayat Name',
    revenueVillage: 'Revenue Village Name',
    block: 'Block Name',
    district: 'District Name',
    totalArea: '100 Acres',
    pradanContribution: '5000',
    farmerContribution: '2000',
    measuredBy: 'Associate',
  });

  // const [isEditable, setIsEditable] = useState(false);
  const [files, setFiles] = useState({});

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFilePick = async (key) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (!result.canceled) {
        setFiles((prev) => ({ ...prev, [key]: result.assets[0] }));
      }
    } catch (error) {
      console.error('File pick error:', error);
    }
  };

  const handleSubmit = () => {
    console.log('Form Data Submitted:', formData, files);
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={width * 0.06} color="#0B8B42" />
        </TouchableOpacity>
        <Text style={styles.header}>Post Fund Land Inspection</Text>
      </View>

      {[
        { label: 'Name of Farmer', field: 'name' },
        { label: 'Father/Spouse', field: 'fatherSpouse' },
        { label: 'Code', field: 'code' },
        { label: 'Hamlet', field: 'hamlet' },
        { label: 'Panchayat', field: 'panchayat' },
        { label: 'Revenue Village', field: 'revenueVillage' },
        { label: 'Block', field: 'block' },
        { label: 'District', field: 'district' },
      ].map((item, index) => (
        <View style={styles.formGroup} key={index}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput style={styles.input} value={formData[item.field]} editable={false} />
        </View>
      ))}

{[
  { label: 'Total Area', field: 'totalArea' },
  { label: 'PRADAN contribution (in Rs)', field: 'pradanContribution' },
  { label: 'Farmer contribution (in Rs)', field: 'farmerContribution' },
].map((item, index) => (
  <View style={styles.formGroup} key={index}>
    <Text style={styles.label}>{item.label}</Text>
    <TextInput
      style={styles.inputEditable}
      value={formData[item.field]}
      onChangeText={(text) => handleChange(item.field, text)}
    />
  </View>
))}


      <Text style={styles.label}> File submitted:</Text>
      <View style={styles.uploadGroup}>
        <TouchableOpacity style={styles.uploadBox} onPress={() => handleFilePick('patta')}>
          <Ionicons
            name={files['patta'] ? 'document-attach' : 'cloud-upload-outline'}
            size={width * 0.05}
            color="#0B8B42"
          />
          <Text style={styles.uploadLabel}>Payment Received Proof</Text>
          <Text style={styles.uploadStatus}>{files['patta'] ? 'Uploaded' : 'Tap to Upload'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Measured By</Text>
        <View style={styles.radioGroup}>
          {['Associate', 'Coordinator'].map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.radioOption}
              onPress={() => handleChange('measuredBy', option)}
            >
              <View style={styles.radioOuter}>
                {formData.measuredBy === option && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={() => router.push('/dashboard')}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: width * 0.05,
    backgroundColor: '#F3F6F4',
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.02,
    marginBottom: height * 0.02,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#0B8B42',
    marginLeft: width * 0.025,
  },
  formGroup: {
    marginBottom: height * 0.02,
  },
  label: {
    fontSize: width * 0.035,
    marginVertical: height * 0.01,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.012,
    backgroundColor: '#E8F5E9',
    color: '#333',
    fontSize: width * 0.035,
    height: height * 0.06,
  },
  inputEditable: {
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.012,
    backgroundColor: '#E8F5E9',
    color: '#333',
    fontSize: width * 0.035,
    height: height * 0.06,
    flex: 1,
  },
  editableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: height * 0.006,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: width * 0.04,
    marginBottom: height * 0.012,
  },
  radioOuter: {
    width: width * 0.053,
    height: width * 0.053,
    borderRadius: width * 0.0265,
    borderWidth: 2,
    borderColor: '#0B8B42',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: width * 0.026,
    height: width * 0.026,
    borderRadius: width * 0.013,
    backgroundColor: '#0B8B42',
  },
  radioLabel: {
    marginLeft: width * 0.013,
    fontSize: width * 0.035,
    color: '#333',
  },
  submitButton: {
    marginTop: height * 0.03,
    backgroundColor: '#0B8B42',
    paddingVertical: height * 0.015,
    borderRadius: width * 0.03,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: width * 0.05,
    color: '#fff',
    fontWeight: 'bold',
  },
  uploadGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  uploadBox: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: width * 0.025,
    padding: width * 0.03,
    marginBottom: height * 0.02,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
  },
  uploadLabel: {
    fontSize: width * 0.035,
    fontWeight: '600',
    marginTop: height * 0.01,
    color: '#333',
    textAlign:'center',
  },
  uploadStatus: {
    fontSize: width * 0.03,
    color: '#777',
    marginTop: height * 0.005,
    textAlign: 'center',
  },
});

export default BasicDetailsForm;
