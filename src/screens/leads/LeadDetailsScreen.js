import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const LeadDetailsScreen = ({ lead, onClose }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Lead Details</Text>
          <Pressable onPress={onClose}>
            <Text style={styles.close}>✕</Text>
          </Pressable>
        </View>

        <DetailRow label="Name" value={lead.name} />
        <DetailRow label="Phone" value={lead.phone} />
        <DetailRow label="Status" value={lead.status} />
        <DetailRow label="Deal Value" value={`$${lead.dealValue}k`} />
      </View>
    </View>
  );
};

const DetailRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(2,6,23,0.95)',
    padding: 16,
  },
  container: {
    backgroundColor: '#020617',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  close: {
    fontSize: 22,
    color: '#fff',
  },
  row: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#94a3b8',
  },
  value: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
    marginTop: 2,
  },
});

export default LeadDetailsScreen;
