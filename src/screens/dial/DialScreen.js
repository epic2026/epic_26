// // // import React, { useState } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   StyleSheet,
// // //   TouchableOpacity,
// // //   SafeAreaView,
// // //   Linking,
// // //   Alert,
// // // } from 'react-native';

// // // const Dial = ({ onBack }) => {
// // //   const [number, setNumber] = useState('');

// // //   const addDigit = (digit) => {
// // //     setNumber(prev => prev + digit);
// // //   };

// // //   const deleteDigit = () => {
// // //     setNumber(prev => prev.slice(0, -1));
// // //   };

// // //   const makeCall = async () => {
// // //     if (!number) {
// // //       Alert.alert('Error', 'Please enter a number');
// // //       return;
// // //     }

// // //     const phoneUrl = `tel:${number}`;

// // //     try {
// // //       const supported = await Linking.canOpenURL(phoneUrl);
// // //       if (!supported) {
// // //         Alert.alert('Error', 'Calling not supported');
// // //         return;
// // //       }
// // //       await Linking.openURL(phoneUrl);
// // //     } catch (err) {
// // //       Alert.alert('Error', 'Failed to open dialer');
// // //     }
// // //   };

// // //   const renderButton = (digit) => (
// // //     <TouchableOpacity
// // //       style={styles.dialButton}
// // //       onPress={() => addDigit(digit)}
// // //     >
// // //       <Text style={styles.dialText}>{digit}</Text>
// // //     </TouchableOpacity>
// // //   );

// // //   return (
// // //     <SafeAreaView style={styles.container}>
// // //       {/* Number Display */}
// // //       <View style={styles.display}>
// // //         <Text style={styles.number}>
// // //           {number || 'Enter number'}
// // //         </Text>
// // //       </View>

// // //       {/* Dial Pad */}
// // //       <View style={styles.pad}>
// // //         <View style={styles.row}>
// // //           {renderButton('1')}
// // //           {renderButton('2')}
// // //           {renderButton('3')}
// // //         </View>
// // //         <View style={styles.row}>
// // //           {renderButton('4')}
// // //           {renderButton('5')}
// // //           {renderButton('6')}
// // //         </View>
// // //         <View style={styles.row}>
// // //           {renderButton('7')}
// // //           {renderButton('8')}
// // //           {renderButton('9')}
// // //         </View>
// // //         <View style={styles.row}>
// // //           {renderButton('*')}
// // //           {renderButton('0')}
// // //           {renderButton('#')}
// // //         </View>
// // //       </View>

// // //       {/* Action Buttons */}
// // //       <View style={styles.actions}>
// // //         {/* Back */}
// // //         <TouchableOpacity
// // //           style={styles.actionBtn}
// // //           onPress={onBack}
// // //         >
// // //           <Text style={styles.actionText}>✖</Text>
// // //         </TouchableOpacity>

// // //         {/* Call */}
// // //         <TouchableOpacity
// // //           style={[styles.actionBtn, styles.callBtn]}
// // //           onPress={makeCall}
// // //         >
// // //           <Text style={styles.actionText}>📞</Text>
// // //         </TouchableOpacity>

// // //         {/* Delete */}
// // //         <TouchableOpacity
// // //           style={styles.actionBtn}
// // //           onPress={deleteDigit}
// // //         >
// // //           <Text style={styles.actionText}>⌫</Text>
// // //         </TouchableOpacity>
// // //       </View>
// // //     </SafeAreaView>
// // //   );
// // // };

// // // export default Dial;

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#F3F4F6',
// // //     justifyContent: 'space-between',
// // //     paddingVertical: 20,
// // //   },

// // //   display: {
// // //     alignItems: 'center',
// // //     marginTop: 80,
// // //   },

// // //   number: {
// // //     fontSize: 34,
// // //     fontWeight: 'bold',
// // //     color: '#111',
// // //   },

// // //   pad: {
// // //     alignItems: 'center',
// // //   },

// // //   row: {
// // //     flexDirection: 'row',
// // //     marginVertical: 18,
// // //   },

// // //   dialButton: {
// // //     width: 80,
// // //     height: 80,
// // //     borderRadius: 40,
// // //     backgroundColor: '#E5E7EB',
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     marginHorizontal: 10,
// // //   },

// // //   dialText: {
// // //     fontSize: 28,
// // //     fontWeight: 'bold',
// // //   },

// // //   actions: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-around',
// // //     marginBottom: 30,
// // //   },

// // //   actionBtn: {
// // //     width: 70,
// // //     height: 70,
// // //     borderRadius: 35,
// // //     backgroundColor: '#6B7280',
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //   },

// // //   callBtn: {
// // //     backgroundColor: '#10B981',
// // //   },

// // //   actionText: {
// // //     fontSize: 26,
// // //     color: '#fff',
// // //   },
// // // });


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   Linking,
//   Alert,
// } from 'react-native';

// const Dial = ({ navigation }) => {
//   const [number, setNumber] = useState('');

//   const addDigit = (digit) => {
//     setNumber((prev) => prev + digit);
//   };

//   const deleteDigit = () => {
//     setNumber((prev) => prev.slice(0, -1));
//   };

//   const makeCall = async () => {
//     if (!number) {
//       Alert.alert('Error', 'Please enter a number');
//       return;
//     }

//     const phoneUrl = `tel:${number}`;

//     try {
//       const supported = await Linking.canOpenURL(phoneUrl);
//       if (!supported) {
//         Alert.alert('Error', 'Calling not supported');
//         return;
//       }
//       await Linking.openURL(phoneUrl);
//     } catch {
//       Alert.alert('Error', 'Failed to open dialer');
//     }
//   };

//   const renderButton = (digit) => (
//     <TouchableOpacity
//       key={digit}   // ✅ FIX: key added
//       style={styles.dialButton}
//       onPress={() => addDigit(digit)}
//     >
//       <Text style={styles.dialText}>{digit}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>

//       {/* Display */}
//       <View style={styles.display}>
//         <Text style={styles.number}>{number || 'Enter number'}</Text>
//       </View>

//       {/* Dial Pad */}
//       <View style={styles.pad}>
//         <View style={styles.row}>{['1','2','3'].map(renderButton)}</View>
//         <View style={styles.row}>{['4','5','6'].map(renderButton)}</View>
//         <View style={styles.row}>{['7','8','9'].map(renderButton)}</View>
//         <View style={styles.row}>{['*','0','#'].map(renderButton)}</View>
//       </View>

//       {/* Actions */}
//       <View style={styles.actions}>
//         <TouchableOpacity
//           style={styles.actionBtn}
//           onPress={() => navigation?.goBack()}
//         >
//           <Text style={styles.actionText}>✕</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.actionBtn, styles.callBtn]}
//           onPress={makeCall}
//         >
//           <Text style={styles.actionText}>📞</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.actionBtn}
//           onPress={deleteDigit}
//         >
//           <Text style={styles.actionText}>⌫</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Dial;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F3F4F6',
//     justifyContent: 'space-between',
//     paddingVertical: 20,
//   },
//   display: {
//     alignItems: 'center',
//     marginTop: 60,
//   },
//   number: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#111',
//   },
//   pad: {
//     alignItems: 'center',
//   },
//   row: {
//     flexDirection: 'row',
//     marginVertical: 10,
//   },
//   dialButton: {
//     width: 75,
//     height: 75,
//     borderRadius: 37,
//     backgroundColor: '#E5E7EB',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 10,
//   },
//   dialText: {
//     fontSize: 26,
//     fontWeight: '600',
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 30,
//   },
//   actionBtn: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: '#6B7280',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   callBtn: {
//     backgroundColor: '#10B981',
//   },
//   actionText: {
//     fontSize: 26,
//     color: '#fff',
//   },
// });

// import { View, Text } from 'react-native'
// import React from 'react'

// const DialScreen = () => {
//   return (
//     <View>
//       <Text>DialScreen</Text>
//     </View>
//   )
// }

// export default DialScreen
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from 'react-native';

const DialScreen = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={() => setPopupVisible(true)}
      >
        <View style={styles.card}>
          <Text style={styles.title}> Dial Coming Soon</Text>
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

export default DialScreen;

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
