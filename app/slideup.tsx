import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { height, width } = Dimensions.get('window');

export default function SlideUpFormSelector() {
  const [modalVisible, setModalVisible] = useState(true); // Set to false if needed

  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.optionText}>Land Form</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.optionText}>Pond Form</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.optionText}>Plantation Form</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, styles.cancelButton]}
              onPress={() => router.back()
              }
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// PRADAN THEMED STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3fdf6',
    paddingHorizontal: width * 0.05,  // 5% of screen width for padding
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: width * 0.06, // Dynamic padding based on width
    elevation: 10,
  },
  optionButton: {
    backgroundColor: '#4CAF50', // PRADAN Green
    paddingVertical: height * 0.04,  // Adjust padding vertically to 4% of screen height
    borderRadius: 16,
    marginBottom: height * 0.02,  // Margin at the bottom based on screen height
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 4,
  },
  optionText: {
    color: '#ffffff',
    fontSize: width * 0.045,  // Font size proportional to screen width
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  cancelText: {
    color: '#333333',
    fontSize: width * 0.045, // Adjust font size proportionally to screen width
    fontWeight: '600',
  },
});