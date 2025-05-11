import { router } from 'expo-router';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

const { height, width } = Dimensions.get('window');

const mockData = [
  { id: 1, name: 'John Doe', form: 'Type A', date: '2025-04-10' },
  { id: 2, name: 'Jane Smith', form: 'Type B', date: '2025-04-11' },
  { id: 3, name: 'Alice Johnson', form: 'Type C', date: '2025-04-12' },
  // Add more mock data as needed
];

const BioContainer = ({ name, form, date, onPress }) => (
  <TouchableOpacity onPress={() => { router.push("/Land_Form/preview"); }} style={styles.bioContainer}>
    <View style={styles.leftContainer}>
      <Text style={styles.name}>{name}</Text>
    </View>
    <View style={styles.rightContainer}>
      <Text style={styles.rightText}>
        <Text style={styles.label}>Form: </Text>{form}
      </Text>
      <Text style={styles.rightText}>
        <Text style={styles.label}>Date: </Text>{date}
      </Text>
    </View>
  </TouchableOpacity>
);

const FormSubmissionsScreen = ({ navigation, route }) => {
  const handleBioPress = (item) => {
    // Example action when bio box is pressed
    console.log('Bio pressed:', item);
    // You can navigate to another screen here
    router.push(`/bioDetails/${item.id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={width * .05}
          onPress={() => { router.push("/dashboard"); }}
          iconColor="#fff"
        />
        <Text style={styles.title}>DRAFT</Text>
      </View>

      {/* Separator Line */}
      <View style={styles.separator} />

      <ScrollView style={styles.scrollView}>
        {mockData.length === 0 ? (
          <Text style={styles.noResults}>No forms found</Text>
        ) : (
          mockData.map((item) => (
            <Card key={item.id} style={styles.card}>
              <BioContainer
                name={item.name}
                form={item.form}
                date={item.date}
                onPress={() => handleBioPress(item)}
              />
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#1B5E20',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: height * 0.01,
    paddingBottom: height * 0.01,
    paddingHorizontal: width * 0.04,
    elevation: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: height * 0.022, // Responsive font size
    fontWeight: 'bold',
    marginLeft: -width * 0.01,
    flex: 1,
    textAlign: 'left',
  },
  separator: {
    height: 0,
    backgroundColor: '#ddd',
    marginTop: height * 0.06, // Space below fixed header
  },
  scrollView: {
    marginTop: height * 0.06,
    paddingHorizontal: width * 0.04,
  },
  noResults: {
    textAlign: 'center',
    fontSize: height * 0.022,
    color: '#888',
  },
  card: {
    marginBottom: height * 0.015,
    backgroundColor: '#F5F5F5',
    elevation: 5,
    borderRadius: width * 0.025,
    padding: height * 0.015,
  },
  bioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftContainer: {
    flex: 1.2,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 0.9,
    alignItems: 'flex-start',
  },
  name: {
    fontSize: height * 0.022,
    fontWeight: 'bold',
    color: '#388E3C',
  },
  rightText: {
    fontSize: height * 0.018,
    color: '#555',
    textAlign: 'left',
    width: '100%',
    marginBottom: height * 0.005,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
});


export default FormSubmissionsScreen;