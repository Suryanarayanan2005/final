  import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
  // Radio Option Component
  const RadioOption = ({ options, value, onChange }) => (
    <View style={styles.radioGroup}>
      {options.map((opt) => (
        <TouchableOpacity key={opt} style={styles.radioOption} onPress={() => onChange(opt)}>
          <Ionicons
            name={value === opt ? 'radio-button-on' : 'radio-button-off'}
            size={20}
            color="#0B8B42"
          />
          <Text style={styles.radioText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Checkbox Group Component
  const CheckboxGroup = ({ options, values, onToggle }) => (
    <View style={styles.checkboxGroup}>
      {options.map((opt) => (
        <TouchableOpacity key={opt} style={styles.checkboxOption} onPress={() => onToggle(opt)}>
          <Ionicons
            name={values.includes(opt) ? 'checkbox' : 'square-outline'}
            size={20}
            color="#0B8B42"
          />
          <Text style={styles.radioText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  export default function BasicDetailsScreen() {
    const [hamlet, setHamlet] = useState(null);
    const [hamletOpen, setHamletOpen] = useState(false);
    const [hamletItems] = useState([
      { label: 'Hamlet 1', value: 'hamlet1' },
      { label: 'Hamlet 2', value: 'hamlet2' },
    ]);

    const [panchayat, setPanchayat] = useState(null);
    const [panchayatOpen, setPanchayatOpen] = useState(false);
    const [panchayatItems] = useState([
      { label: 'Panchayat 1', value: 'panchayat1' },
      { label: 'Panchayat 2', value: 'panchayat2' },
    ]);

    const [block, setBlock] = useState(null);
    const [blockOpen, setBlockOpen] = useState(false);
    const [blockItems] = useState([
      { label: 'Block A', value: 'blockA' },
      { label: 'Block B', value: 'blockB' },
    ]);

    const [identityType, setIdentityType] = useState('');
    const [otherIdentity, setOtherIdentity] = useState('');
    const [gender, setGender] = useState('');
    const [householdType, setHouseholdType] = useState('');
    const [houseOwnership, setHouseOwnership] = useState('');
    const [houseType, setHouseType] = useState('');
    const [caste, setCaste] = useState('');
    const [toiletAvailability, setToiletAvailability] = useState('');
    const [toiletCondition, setToiletCondition] = useState('');
    const [education, setEducation] = useState([]);
    const [drinkingSource, setDrinkingSource] = useState([]);
    const [potability, setPotability] = useState([]);
    const [domesticSource, setDomesticSource] = useState([]);
    const [occupation, setOccupation] = useState([]);
    const [specialCategories, setSpecialCategories] = useState([]);
    const [disabledCount, setDisabledCount] = useState('');

    const toggleCheckbox = (value, state, setState) => {
      setState(state.includes(value)
        ? state.filter((item) => item !== value)
        : [...state, value]
      );
    };

    return (
      <KeyboardAwareScrollView style={styles.container}>
        <ScrollView contentContainerStyle={styles.inner}>
          <Animatable.View animation="fadeInUp" duration={600}>
          <Text style={styles.heading_land}>LAND REDEVELOPMENT FORM</Text>
            <View style={styles.headingContainer}>
                        <TouchableOpacity onPress={() => router.push("/dashboard")}>
                          <Ionicons name="arrow-back" size={24} color="#0B8B42" />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Basic Details</Text>
                      </View>

            <Text style={styles.label}>1. Name of Farmer</Text>
            <TextInput style={styles.input} placeholder="Enter name" placeholderTextColor="#888" />

            <Text style={styles.label}>2. Mobile Number</Text>
            <TextInput style={styles.input} keyboardType="phone-pad" placeholder="Enter mobile" placeholderTextColor="#888" />

            <Text style={styles.label}>3. Hamlet</Text>
            <View style={{ zIndex: 1000 }}>
              <DropDownPicker
                open={hamletOpen}
                value={hamlet}
                items={hamletItems}
                setOpen={setHamletOpen}
                setValue={setHamlet}
                placeholder="Select Hamlet"
                listMode="SCROLLVIEW"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
              />
            </View>

            <Text style={styles.label}>4. Panchayat</Text>
            <View style={{ zIndex: 999 }}>
              <DropDownPicker
                open={panchayatOpen}
                value={panchayat}
                items={panchayatItems}
                setOpen={setPanchayatOpen}
                setValue={setPanchayat}
                placeholder="Select Panchayat"
                listMode="SCROLLVIEW"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
              />
            </View>

            <Text style={styles.label}>5. Block</Text>
            <View style={{ zIndex: 998 }}>
              <DropDownPicker
                open={blockOpen}
                value={block}
                items={blockItems}
                setOpen={setBlockOpen}
                setValue={setBlock}
                placeholder="Select Block"
                listMode="SCROLLVIEW"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
              />
            </View>

            <Text style={styles.label}>6. Identity Card</Text>
            <RadioOption
              options={['Aadhar', 'EPIC', 'Driving License', 'Others']}
              value={identityType}
              onChange={setIdentityType}
            />
            {identityType === 'Others' && (
              <TextInput
                style={styles.input}
                placeholder="Specify other identity card"
                placeholderTextColor="#888"
                value={otherIdentity}
                onChangeText={setOtherIdentity}
              />
            )}

            <Text style={styles.label}>7. ID Card Number</Text>
            <TextInput style={styles.input} placeholder="Enter ID No." placeholderTextColor="#888" />

            <Text style={styles.label}>8. Gender</Text>
            <RadioOption options={['Male', 'Female', 'Transgender']} value={gender} onChange={setGender} />

            <Text style={styles.label}>9. Father / Spouse</Text>
            <TextInput style={styles.input} placeholder="Enter name" placeholderTextColor="#888" />

            <Text style={styles.label}>10. Type of Households</Text>
            <RadioOption options={['Nuclear', 'Joint']} value={householdType} onChange={setHouseholdType} />

            <Text style={styles.label}>11. Household Members</Text>
            <View style={styles.row}>
              <TextInput style={styles.inputHalf} placeholder="Adults" keyboardType="numeric" placeholderTextColor="#888" />
              <TextInput style={styles.inputHalf} placeholder="Children" keyboardType="numeric" placeholderTextColor="#888" />
            </View>

            <Text style={styles.label}>12. Occupation</Text>
            <CheckboxGroup options={['Agriculture', 'Business', 'Other']} values={occupation} onToggle={(val) => toggleCheckbox(val, occupation, setOccupation)} />

            <Text style={styles.label}>13. Special Category</Text>
            <View style={styles.row}>
              <CheckboxGroup options={['Disabled']} values={specialCategories} onToggle={(val) => toggleCheckbox(val, specialCategories, setSpecialCategories)} />
              {specialCategories.includes('Disabled') && (
                <TextInput
                  style={styles.inputHalf}
                  placeholder="Number"
                  keyboardType="numeric"
                  placeholderTextColor="#888"
                  value={disabledCount}
                  onChangeText={setDisabledCount}
                />
              )}
            </View>

            <Text style={styles.label}>14. Caste</Text>
            <RadioOption options={['OC', 'OBC', 'SC', 'ST']} value={caste} onChange={setCaste} />

            <Text style={styles.label}>15. House Ownership</Text>
            <RadioOption options={['Rented', 'Owned']} value={houseOwnership} onChange={setHouseOwnership} />

            <Text style={styles.label}>16. Type of House</Text>
            <RadioOption options={['Pucca', 'Kutcha']} value={houseType} onChange={setHouseType} />

            <Text style={styles.label}>17. Drinking Water Source</Text>
            <CheckboxGroup options={['Ponds', 'Wells & Borewells', 'Trucks']} values={drinkingSource} onToggle={(val) => toggleCheckbox(val, drinkingSource, setDrinkingSource)} />

            <Text style={styles.label}>18. Potability</Text>
            <CheckboxGroup options={['Ponds', 'Wells & Borewells', 'Tanks']} values={potability} onToggle={(val) => toggleCheckbox(val, potability, setPotability)} />

            <Text style={styles.label}>19. Domestic Water Source</Text>
            <CheckboxGroup options={['Ponds', 'Wells & Borewells', 'Tanks']} values={domesticSource} onToggle={(val) => toggleCheckbox(val, domesticSource, setDomesticSource)} />

            <Text style={styles.label}>20. Toilet Availability</Text>
            <RadioOption options={['Yes', 'No']} value={toiletAvailability} onChange={setToiletAvailability} />

            <Text style={styles.label}>21. Toilet Condition</Text>
            <RadioOption options={['Working', 'Not Working']} value={toiletCondition} onChange={setToiletCondition} />

            <Text style={styles.label}>22. Education of Householder</Text>
            <RadioOption options={['Illiterate', 'Primary', 'Secondary', 'University']} value={education} onChange={setEducation} />

            <TouchableOpacity style={styles.nextBtn}
                          onPress={() => {
                            router.push('./lnd_own');
                          }}>
              
              <Text style={styles.nextBtnText}>NEXT</Text>
              
            </TouchableOpacity>
          </Animatable.View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }

  // Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1F7ED',
    },
    inner: {
      padding: 20,
      paddingBottom: 20,
    },
    heading_land: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#0B8B42',
      marginBottom: 20,
      textAlign: 'center', 
    },headingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#0B8B42',
      marginBottom:3,
    },
    label: {
      fontSize: 14,
      marginVertical: 8,
      color: '#333',
      fontWeight: '600',
    },
    input: {
      borderWidth: 1,
      borderColor: '#A5D6A7',
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 10,
      backgroundColor: '#E8F5E9',
      color: '#333',
      fontSize: 14,
    },
    inputHalf: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#A5D6A7',
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 10,
      backgroundColor: '#E8F5E9',
      color: '#333',
      fontSize: 14,
      marginRight: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    radioGroup: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 5,
    },
    radioOption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
      marginBottom: 8,
    },
    radioText: {
      marginLeft: 5,
      fontSize: 14,
      color: '#333',
    },
    checkboxGroup: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    checkboxOption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
      marginBottom: 8,
    },
    nextBtn: {
      backgroundColor: '#134e13',
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    nextBtnText: {
      
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    dropdown: {
      borderColor: '#A5D6A7',
      borderRadius: 10,
      marginBottom: 10,
      backgroundColor: '#E8F5E9',
    },
    dropdownContainer: {
      borderColor: '#A5D6A7',
      backgroundColor: '#E8F5E9',
      borderRadius: 10,
    },
  });
