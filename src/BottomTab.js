import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BottomTab = ({ activeTab, setActiveTab }) => {
  const TabItem = ({ label }) => (
    <TouchableOpacity
      style={styles.tab}
      onPress={() => setActiveTab(label)}
    >
      <Text
        style={[
          styles.text,
          activeTab === label && styles.activeText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.tabBar}>
      <TabItem label="Leads" />
      <TabItem label="Activity" />
      <TabItem label="Dial" />
      <TabItem label='CRMs'/>
      <TabItem label='Settings'/>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#888',
    fontSize: 14,
  },
  activeText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});
