import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');

const RadioOption = ({ options, value, onChange }) => (
  <View style={styles.radioGroup}>
    {options.map((opt) => (
      <TouchableOpacity key={opt} style={styles.radioOption} onPress={() => onChange(opt)}>
        <Ionicons
          name={value === opt ? 'radio-button-on' : 'radio-button-off'}
          size={width * .05}
          color="#0B8B42"
        />
        <Text style={styles.radioText}>{opt}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const CheckboxOption = ({ options, values, onToggle }) => (
  <View style={styles.checkboxGroup}>
    {options.map((opt) => (
      <TouchableOpacity key={opt} style={styles.checkboxOption} onPress={() => onToggle(opt)}>
        <Ionicons
          name={values.includes(opt) ? 'checkbox' : 'square-outline'}
          size={width * .05}
          color="#0B8B42"
        />
        <Text style={styles.radioText}>{opt}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default function LandFormScreen() {
  const navigation = useNavigation(); // Hook for navigation

  const [ownership, setownership] = useState('');
  const [irrigation, setIrrigation] = useState('');
  const [areaIrrigated, setAreaIrrigated] = useState('');
  const [rainfed, setRainfed] = useState('');
  const [tankfed, setTankfed] = useState('');
  const [wellfed, setWellfed] = useState('');
  const [pattaNumber, setPattaNumber] = useState('');
  const [totalArea, setTotalArea] = useState('');
  const [revenueVillage, setRevenueVillage] = useState(null);
  const [cropSeason, setCropSeason] = useState('');
  const [otherCropSeason, setOtherCropSeason] = useState('');
  const [livestock, setLivestock] = useState([]);
  const [goat, setGoat] = useState('');
const [sheep, setSheep] = useState('');
const [milch, setMilch] = useState('');
const [draught, setDraught] = useState('');
const [poultry, setPoultry] = useState('');
const [others, setOthers] = useState('');


  const handleToggleLivestock = (option) => {
    if (livestock.includes(option)) {
      setLivestock(livestock.filter((item) => item !== option));
    } else {
      setLivestock([...livestock, option]);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Animatable.View animation="fadeInUp" duration={600}>
          <Text style={styles.heading_land}>PLANTATION FORM</Text>

          <View style={styles.headingContainer}>
            <TouchableOpacity onPress={() => router.push("/plantation_form/Basic details")}>
              <Ionicons name="arrow-back" size={width * .06} color="#0B8B42" />
            </TouchableOpacity>
            <Text style={styles.heading}>Land Ownership & Livestock Details</Text>
          </View>
{/* 24. Well for Irrigation */}
<Text style={styles.label}>25.Land Ownership</Text>
          <RadioOption
            options={['Owner Cultivator', 'Lease Holder']}
            value={ownership}
            onChange={(val) => {
              setownership(val);
              if (val !== 'Yes') setownership('');
            }}
          />
          {/* 24. Well for Irrigation */}
          <Text style={styles.label}>26. Well for Irrigation</Text>
          <RadioOption
            options={['Yes', 'No']}
            value={irrigation}
            onChange={(val) => {
              setIrrigation(val);
              if (val !== 'Yes') setAreaIrrigated('');
            }}
          />

          {irrigation === 'Yes' && (
            <>
              <Text style={styles.label}>Area irrigated (ha)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter area irrigated"
                placeholderTextColor="#888"
                value={areaIrrigated}
                onChangeText={setAreaIrrigated}
              />
            </>
          )}

<Text style={styles.label}>27. Irrigated Lands (ha)</Text>
<View style={styles.row}>
  <View style={styles.inputHalfWrapper}>
    <Text style={styles.subLabel}>Rainfed</Text>
    <TextInput
      style={styles.inputHalf}
      keyboardType="numeric"
      placeholder="0"
      placeholderTextColor="#888"
      value={rainfed}
      onChangeText={setRainfed}
    />
  </View>
  <View style={styles.inputHalfWrapper}>
    <Text style={styles.subLabel}>Tankfed</Text>
    <TextInput
      style={styles.inputHalf}
      keyboardType="numeric"
      placeholder="0"
      placeholderTextColor="#888"
      value={tankfed}
      onChangeText={setTankfed}
    />
  </View>
  <View style={styles.inputHalfWrapper}>
    <Text style={styles.subLabel}>Well Irrigated</Text>
    <TextInput
      style={styles.inputHalf}
      keyboardType="numeric"
      placeholder="0"
      placeholderTextColor="#888"
      value={wellfed}
      onChangeText={setWellfed}
    />
  </View>
</View>


          {/* 26. Patta Number */}
          <Text style={styles.label}>28. Patta Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter patta number"
            placeholderTextColor="#888"
            value={pattaNumber}
            onChangeText={setPattaNumber}
          />

          {/* 27. Total Area */}
          <Text style={styles.label}>29. Total Area (ha)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter total area"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={totalArea}
          />
          {/* 28. Revenue Village (Dropdown) */}
          <Text style={styles.label}>30. Taluk</Text>
          <View style={{ zIndex: 1000, marginBottom: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter Taluk"
              placeholderTextColor="#888"

            />
          </View>
          {/* 28. Revenue Village (Dropdown) */}
          <Text style={styles.label}>31. Firka</Text>
          <View style={{ zIndex: 1000, marginBottom: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter Firka"
              placeholderTextColor="#888"

            />
          </View>

          {/* 28. Revenue Village (Dropdown) */}
          <Text style={styles.label}>32. Revenue Village</Text>
          <View style={{ zIndex: 1000, marginBottom: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter revenue village"
              placeholderTextColor="#888"
            />
          </View>

          {/* 29. Crop Season */}
          <Text style={styles.label}>33. Crop Season</Text>
          <RadioOption
            options={['Kharif (Jun - Sept)', 'Rabi (Oct - Dec)', 'Other']}
            value={cropSeason}
            onChange={setCropSeason}
          />

          {cropSeason === 'Other' && (
            <TextInput
              style={styles.input}
              placeholder="Specify other crop season"
              placeholderTextColor="#888"
              value={otherCropSeason}
              onChangeText={setOtherCropSeason}
            />
          )}

          {/* 30. Livestock at Home */}
          <Text style={styles.label}>34. Livestock at Home</Text>

<View style={styles.row}>
  <View style={styles.inputHalfWrapper}>
    <Text style={styles.subLabel}>Goat</Text>
    <TextInput
      style={styles.inputHalf}
      keyboardType="numeric"
      placeholder="0"
      placeholderTextColor="#888"
      value={goat}
      onChangeText={setGoat}
    />
  </View>
  <View style={styles.inputHalfWrapper}>
    <Text style={styles.subLabel}>Sheep</Text>
    <TextInput
      style={styles.inputHalf}
      keyboardType="numeric"
      placeholder="0"
      placeholderTextColor="#888"
      value={sheep}
      onChangeText={setSheep}
    />
  </View>
  <View style={styles.inputHalfWrapper}>
    <Text style={styles.subLabel}>Milch Animals</Text>
    <TextInput
      style={styles.inputHalf}
      keyboardType="numeric"
      placeholder="0"
      placeholderTextColor="#888"
      value={milch}
      onChangeText={setMilch}
    />
  </View>
</View>

<View style={styles.row}>
  <View style={styles.inputHalfWrapper}>
    <Text style={styles.subLabel}>Draught Animals</Text>
    <TextInput
      style={styles.inputHalf}
      keyboardType="numeric"
      placeholder="0"
      placeholderTextColor="#888"
      value={draught}
      onChangeText={setDraught}
    />
  </View>
  <View style={styles.inputHalfWrapper}>
    <Text style={styles.subLabel}>Poultry</Text>
    <TextInput
      style={styles.inputHalf}
      keyboardType="numeric"
      placeholder="0"
      placeholderTextColor="#888"
      value={poultry}
      onChangeText={setPoultry}
    />
  </View>
  <View style={styles.inputHalfWrapper}>
    <Text style={styles.subLabel}>Others</Text>
    <TextInput
      style={styles.inputHalf}
      keyboardType="numeric"
      placeholder="0"
      placeholderTextColor="#888"
      value={others}
      onChangeText={setOthers}
    />
  </View>
</View>


          <TouchableOpacity
            style={styles.nextBtn}
           onPress={() => {
                                                           router.push('/plantation_form/proposed_work_by_farmer');
                                                         }}>
            <Text style={styles.nextBtnText}>NEXT</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F7ED',
  },
  inner: {
    padding: width * 0.05,
    paddingBottom: height * 0.025,
  },
  heading_land: {
    fontSize: width * 0.055, // ~22 on 400px width
    fontWeight: 'bold',
    color: '#0B8B42',
    marginBottom: height * 0.025,
    textAlign: 'center',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.025,
  },
  heading: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#0B8B42',
    marginLeft: width * 0.025,
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
    borderRadius: width * 0.025,
    paddingHorizontal: width * 0.035,
    paddingVertical: height * 0.015,
    backgroundColor: '#E8F5E9',
    color: '#333',
    fontSize: width * 0.035,
    marginBottom: height * 0.015,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: height * 0.01,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: width * 0.04,
    marginBottom: height * 0.01,
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: height * 0.015,
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: width * 0.04,
    marginBottom: height * 0.01,
  },
  radioText: {
    marginLeft: width * 0.015,
    fontSize: width * 0.035,
    color: '#333',
  },
  irrigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.015,
  },
  irrigationInput: {
    flex: 1,
    marginRight: width * 0.02,
  },
  nextBtn: {
    backgroundColor: '#134e13',
    paddingVertical: height * 0.018,
    borderRadius: width * 0.025,
    alignItems: 'center',
    marginTop: height * 0.025,
    marginBottom: height * 0.025,
  },
  nextBtnText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: '600',
  },
  dropdown: {
    borderColor: '#A5D6A7',
    backgroundColor: '#E8F5E9',
    borderRadius: width * 0.025,
    minHeight: height * 0.06,
    paddingHorizontal: width * 0.025,
  },
  dropdownContainer: {
    borderColor: '#A5D6A7',
    backgroundColor: '#F1F7ED',
    borderRadius: width * 0.025,
  },


  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.015,
  },

  inputHalfWrapper: {
    flex: 1,
    marginHorizontal: width * 0.02,
  },

  subLabel: {
    fontSize: width * 0.033,
    color: '#555',
    marginBottom: height * 0.005,
    fontWeight: '500',
  },

  inputHalf: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    borderRadius: width * 0.025,
    paddingHorizontal: width * 0.035,
    paddingVertical: height * 0.015,
    backgroundColor: '#E8F5E9',
    color: '#333',
    fontSize: width * 0.035,
    marginRight: width * 0.025,
  },
});