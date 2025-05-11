import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

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
    totalArea: '2.5',
    pradanContribution: '5000',
    farmerContribution: '2000',
    totalAmount: '7000',
    measuredBy: '', // <- New field for radio selection
  });

  const [isEditable, setIsEditable] = useState(true);
  const [plantations, setPlantations] = useState([{ type: '', number: '', price: '' }]);
  const [otherExpenses, setOtherExpenses] = useState('');
  const [files, setFiles] = useState({ patta: null }); // <-- Declare files state

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Form Data Submitted:', formData);
    if (onSubmit) {
      onSubmit();
    }
    router.push('/dashboard_verifier');
  };

  const handlePlantationChange = (index, field, value) => {
    const updated = [...plantations];
    updated[index][field] = value;
    setPlantations(updated);
  };

  const addPlantationRow = () => {
    setPlantations([...plantations, { type: '', number: '', price: '' }]);
  };

  const handleDeletePlantationRow = (index) => {
    const updated = plantations.filter((_, idx) => idx !== index);
    setPlantations(updated);
  };

  const calculateTotalExpenses = () => {
    const plantationTotal = plantations.reduce((acc, plantation) => {
      return acc + (parseFloat(plantation.price || 0) * parseInt(plantation.number || 0));
    }, 0);
    return plantationTotal + (parseFloat(otherExpenses) || 0);
  };

  const totalExpenses = calculateTotalExpenses();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#0B8B42" />
        </TouchableOpacity>
        <Text style={styles.header}>Horticulture Form Verification</Text>
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
          <TextInput
            style={styles.input}
            value={formData[item.field]}
            editable={isEditable}
            onChangeText={(text) => handleChange(item.field, text)}
          />
        </View>
      ))}

      {[ 
        { label: 'Total Area (in Hectare)', field: 'totalArea' },
        { label: 'Pradan Contribution', field: 'pradanContribution' },
        { label: 'Farmer Contribution', field: 'farmerContribution' },
      ].map((item, index) => (
        <View style={styles.formGroup} key={index}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput
            style={styles.inputEditable}
            value={formData[item.field]}
            editable={isEditable}
            onChangeText={(text) => handleChange(item.field, text)}
            keyboardType="numeric"
          />
        </View>
      ))}

      {/* Plantation Table Section */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Plantation Details</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Type</Text>
          <Text style={styles.tableHeaderText}>Number</Text>
          <Text style={styles.tableHeaderText}>Price</Text>
        </View>

        {plantations.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <TextInput
              style={styles.tableInput}
              placeholder="e.g. Mango"
              value={item.type}
              onChangeText={(text) => handlePlantationChange(index, 'type', text)}
              editable={isEditable}
            />
            <TextInput
              style={styles.tableInput}
              placeholder="0"
              keyboardType="numeric"
              value={item.number}
              onChangeText={(text) => handlePlantationChange(index, 'number', text)}
              editable={isEditable}
            />
            <TextInput
              style={styles.tableInput}
              placeholder="0.00"
              keyboardType="numeric"
              value={item.price}
              onChangeText={(text) => handlePlantationChange(index, 'price', text)}
              editable={isEditable}
            />
            {isEditable && (
              <TouchableOpacity onPress={() => handleDeletePlantationRow(index)}>
                <Ionicons name="trash" size={width * .06} color="red" />
              </TouchableOpacity>
            )}
          </View>
        ))}

        {isEditable && plantations.length > 0 && (
          <TouchableOpacity onPress={addPlantationRow} style={styles.addRowIconContainer}>
            <Ionicons name="add-circle" size={width * .12} color="#0B8B42" />
          </TouchableOpacity>
        )}

        {/* Other Expenses and Total Expenses */}
        <View style={styles.tableRow}>
          <TextInput
            style={styles.tableInput}
            placeholder="Other Expenses"
            keyboardType="numeric"
            value={otherExpenses}
            onChangeText={(text) => setOtherExpenses(text)}
            editable={isEditable}
          />
          <TextInput
            style={styles.tableInput}
            placeholder="Total Expenses"
            value={`₹ ${totalExpenses.toFixed(2)}`}
            editable={false}
          />
        </View>
      </View>

      {[ 

        { label: 'Total Amount', field: 'totalAmount', editable: false },
      ].map((item, index) => (
        <View style={styles.formGroup} key={index}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput
            style={styles.inputEditable}
            value={formData[item.field]}
            editable={isEditable}
            onChangeText={(text) => handleChange(item.field, text)}
            keyboardType="numeric"
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

      {/* Measured By - Radio Buttons */}
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
  },  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.01,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: height * 0.015,
    alignItems: 'center', // Align the delete button to the right
  },
  tableInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.012,
    backgroundColor: '#E8F5E9',
    marginRight: width * 0.02,
    fontSize: width * 0.04,
  },
  addRowIconContainer: {
    marginVertical: height * 0.02,
    alignItems: 'center',
  },
});

export default BasicDetailsForm;
