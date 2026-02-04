// import { View, Text } from 'react-native'
// import React from 'react'

// const CRMs = () => {
//   return (
//     <View>
//       <Text>CRMs</Text>
//     </View>
//   )
// }

// export default CRMs

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from 'react-native';

const CRMs = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={() => setPopupVisible(true)}
      >
        <View style={styles.card}>
          <Text style={styles.title}>  CRMs Coming Soon</Text>
          <Text style={styles.subtitle}>
            We’re working hard to bring this feature to you.
          </Text>

          <View style={styles.divider} />

          {/* <Text style={styles.description}>
            Tap anywhere to see the popup!
          </Text> */}
        </View>
      </TouchableOpacity>

      {/* Popup */}
      {popupVisible && (
        <View style={styles.popupOverlay}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Notice</Text>
            <Text style={styles.popupText}>
              This feature is still under development. Stay tuned!
            </Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setPopupVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CRMs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: '#111827',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    width: '60%',
    backgroundColor: '#374151',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    color: '#D1D5DB',
    textAlign: 'center',
  },
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15,23,42,0.8)', // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '80%',
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 10,
  },
  popupText: {
    fontSize: 14,
    color: '#D1D5DB',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  closeText: {
    color: '#F9FAFB',
    fontWeight: '600',
  },
});
