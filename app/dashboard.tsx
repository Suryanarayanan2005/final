import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';

const { width, height } = Dimensions.get('window'); 

import {
  moderateScale,
  scale,
  verticalScale
} from 'react-native-size-matters';


const DashboardScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Today');
  const slideAnim = useState(new Animated.Value(0))[0];
  const [pageIndex, setPageIndex] = useState(0);

  const pageTexts = [
    'Dashboard(Pre)',
    'Dashboard(Post)'
  ];

  const dashboardData = [
    { id: '1', label: 'Total Submitted', icon: 'assignment', color: '#4a7744', count: 120 },
    { id: '2', label: 'Pending Forms', icon: 'hourglass-empty', color: '#FFA500', count: 45 },
    { id: '3', label: 'Rejected Forms', icon: 'cancel', color: '#e63946', count: 15 },
    { id: '4', label: 'Approved Forms', icon: 'check-circle', color: '#2a9d8f', count: 60 },
  ];

  const toggleTab = (tab: string) => {
    setActiveTab(tab);
    Animated.timing(slideAnim, {
      toValue: tab === 'Today' ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const interpolatedTranslate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.2], // 20% of screen width
  });

  const renderCard = ({ item }: any) => {
    const handleCardPress = () => {
      switch (item.id) {
        case '1': router.push('/pre/filter_section_total'); break;
        case '2': router.push('/pre/filter_section_pending'); break;
        case '3': router.push('/pre/filter_section_rejected'); break;
        case '4': router.push('/pre/filter_section_approved'); break;
        default: break;
      }
    };
    return (
      <TouchableOpacity style={styles.card} onPress={handleCardPress}>
        <MaterialIcons name={item.icon} size={width * 0.08} color={item.color} />
        <Text style={styles.count}>{item.count}</Text>
        <Text style={styles.cardLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  const renderCard2 = ({ item }: any) => {
    const handleCardPress = () => {
      switch (item.id) {
        case '1': router.push('/post/filter_section_total'); break;
        case '2': router.push('/post/filter_section_pending'); break;
        case '3': router.push('/post/filter_section_rejected'); break;
        case '4': router.push('/post/filter_section_approved'); break;
        default: break;
      }
    };
    return (
      <TouchableOpacity style={styles.card} onPress={handleCardPress}>
        <MaterialIcons name={item.icon} size={width * 0.08} color={item.color} />
        <Text style={styles.count}>{item.count}</Text>
        <Text style={styles.cardLabel}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/pradan_logo2.jpeg")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Pressable onPress={() => router.replace('/profile')} style={({ pressed }) => [styles.profileCard]}>
        <Image
          source={require('../assets/images/akk.jpeg')}
          style={styles.profileImage}
        />
        <View style={styles.profileText}>
          <Text style={styles.profileName}>Akshaykumar S</Text>
          <Text style={styles.profileDesignation}>Associate</Text>
          <Text style={styles.profileEmail}>akshaykumar059004@pradan.net</Text>
        </View>
      </Pressable>

      <View style={styles.dashboardHeader}>
        <Text style={styles.dashboardTitle}>
          {pageTexts[pageIndex]}
        </Text>

        <View style={styles.slideToggleContainer}>
          <Animated.View
            style={[styles.slideHighlight, { transform: [{ translateX: interpolatedTranslate }] }]}
          />
          <Pressable
            style={styles.slideButton}
            onPress={() => toggleTab('Today')}
          >
            <Text style={[styles.slideText, activeTab === 'Today' && styles.activeText]}>
              Today
            </Text>
          </Pressable>
          <Pressable
            style={styles.slideButton}
            onPress={() => toggleTab('Total')}
          >
            <Text style={[styles.slideText, activeTab === 'Total' && styles.activeText]}>
              Total
            </Text>
          </Pressable>
        </View>
      </View>

      <PagerView style={styles.pagerView} initialPage={0} onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}>
        <FlatList
          key='1'
          data={dashboardData}
          numColumns={2}
          renderItem={renderCard}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 10 }}
        />

        <FlatList
          key='2'
          data={dashboardData}
          numColumns={2}
          renderItem={renderCard2}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.row}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      </PagerView>

      {/* Dots indicator */}
      <View style={styles.dotContainer}>
        {pageIndex === 0 ? (
          <View style={styles.activeDot} />
        ) : (
          <View style={styles.inactiveDot} />
        )}
        {pageIndex === 1 ? (
          <View style={styles.activeDot} />
        ) : (
          <View style={styles.inactiveDot} />
        )}
      </View>

      <Pressable
        style={styles.newFormButton}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="add-circle-outline" size={width * 0.10} color="#fff" />
        <Text style={styles.newFormText}>New Form</Text>
      </Pressable>

      <TouchableOpacity
        style={styles.draftButton}
        onPress={() => {
          router.push("/draft_page");
        }}
      >
        <MaterialIcons name="insert-drive-file" size={width * 0.10} color="#fff" />
        <Text style={styles.newFormText}>Draft</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Choose a Form</Text>

            <Pressable
              style={styles.optionButton}
              onPress={() => {
                setModalVisible(false);
                router.push("/Land_Form/Basic details");
              }}
            >
              <Text style={styles.optionText}>Land Development Form</Text>
            </Pressable>

            <Pressable
              style={styles.optionButton}
              onPress={() => {
                setModalVisible(false);
                router.push("/pond_form/Basic details");
              }}
            >
              <Text style={styles.optionText}>Pond Construction Form</Text>
            </Pressable>

            <Pressable
              style={styles.optionButton}
              onPress={() => {
                setModalVisible(false);
                router.push("/plantation_form/Basic details");
              }}
            >
              <Text style={styles.optionText}>Plantation Form</Text>
            </Pressable>

            <Pressable
              style={[styles.optionButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(10),
  },
  pagerView: {
    flex: 1,
  },
  logo: {
    margin: moderateScale(10),               // smooth scaling
    width: scale(220),                       // horizontal scaling for image width
    height: verticalScale(80),               // vertical scaling for image height
    marginBottom: verticalScale(12),         // vertical spacing
    alignSelf: 'center',
  },
    profileCard: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      marginBottom: verticalScale(8),           // vertical scaling for spacing
      padding: moderateScale(10),                // smooth padding scaling
      borderRadius: moderateScale(12),          // scaling border radius
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: moderateScale(5),           // scaling shadow blur
      shadowOffset: { width: 0, height: verticalScale(2) },  // vertical scaling for shadow offset
      elevation: 4,
    },
    profileImage: {
      width: scale(55),                        // scale the width
      height: scale(55),                       // scale the height
      borderRadius: scale(100),                // rounded image with scaling
      marginRight: scale(12),                  // horizontal margin scaling
    },
    profileText: {
      flex: 1,
    },
    profileName: {
      fontSize: moderateScale(16),             // moderate scaling for font size
      fontWeight: 'bold',
      color: '#134e13',
    },
    profileDesignation: {
      fontSize: moderateScale(14),             // moderate scaling for font size
      color: '#555',
      marginBottom: verticalScale(2),          // vertical scaling for spacing
    },
    profileEmail: {
      fontSize: moderateScale(13),             // moderate scaling for font size
      color: '#777',
    },
    dashboardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: verticalScale(15),          // vertical scaling for spacing
      marginTop: verticalScale(20),             // vertical scaling for top margin
      marginLeft: scale(10),                    // horizontal scaling for left margin
    },
    dashboardTitle: {
      fontSize: moderateScale(20),              // moderate scaling for font size
      fontWeight: 'bold',
      color: '#134e13',
    },
    slideToggleContainer: {
      flexDirection: 'row',
      backgroundColor: '#e6f0e6',
      borderRadius: moderateScale(10),          // moderate scaling for border radius
      overflow: 'hidden',
      marginRight: scale(10),                   // horizontal scaling for right margin
      width: scale(150),                        // scaling width of the container
      height: verticalScale(30),                // vertical scaling for height
      position: 'relative',
    },
    slideButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    slideText: {
      // fontFamily:"Courier",
      fontSize: moderateScale(14),             // moderate scaling for font size
      fontWeight: 'bold',
      color: '#134e13',
    },
    activeText: {
      color: '#fff',
    },
    slideHighlight: {
      position: 'absolute',
      width: scale(80),                       // scaled width for the highlight
      height: '100%',
      backgroundColor: '#134e13',
      borderRadius: moderateScale(10),        // scaling border radius
      zIndex: 0,
    },
    row: {
      justifyContent: 'space-between',
      marginBottom: verticalScale(0),        // vertical scaling for margin
      paddingTop:scale(8),
    },
  card: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(14),             // smooth scaling for rounded corners
    paddingVertical: verticalScale(20),          // vertical scaling
    paddingHorizontal: scale(12),              // horizontal scaling
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: scale(5),                  // horizontal margin
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),              // scale shadow blur
    shadowOffset: {
      width: 0,
      height: verticalScale(0),                  // scale shadow height
    },
    elevation: 5,
  },
  count: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    marginTop: verticalScale(10),
    color: '#333',
  },
  cardLabel: {
    marginTop: verticalScale(5),
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  
  newFormButton: {
    backgroundColor: '#134e13',
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    justifyContent: 'center',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(15),
    borderRadius: moderateScale(10),
    position: 'absolute',
    bottom: verticalScale(30),
    left: scale(20),
    zIndex: 10, // Ensure it's above the separator
  },
  
  draftButton: {
    backgroundColor: '#FFA500',
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    justifyContent: 'center',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(34),
    borderRadius: moderateScale(10),
    position: 'absolute',
    bottom: verticalScale(30),
    right: scale(20),
    zIndex: 10,
  },
  

  
  newFormText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: moderateScale(16),
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    padding: scale(24),
    height: '50%',
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#134e13',
    marginBottom: verticalScale(18),
  },
  optionButton: {
    backgroundColor: '#134e13',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(14),
    width: '100%',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: scale(6),
    shadowOffset: { width: 0, height: verticalScale(3) },
  },
  optionText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#dcdcdc',
  },
  cancelText: {
    color: '#333333',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#e6e6e6',
    marginVertical: verticalScale(16),
    zIndex: 1,  // Keep it at lower zIndex so it's below the New Form button
  }, 
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: verticalScale(100),
  },
  activeDot: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(6),
    backgroundColor: '#134e13',
    margin: scale(5),
  },
  inactiveDot: {
    width: scale(12),
    height: scale(12),
    borderRadius: scale(6),
    backgroundColor: '#ddd',
    margin: scale(5),
  },
});