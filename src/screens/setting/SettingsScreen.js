import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* Header */}
        <Text style={styles.headerTitle}>Manage Leads</Text>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>P</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Prashant</Text>
            <Text style={styles.subText}>Web</Text>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Contacted</Text>
            </View>
          </View>

          <Text style={styles.close}>✕</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionBtn, styles.call]}>
            <Text style={styles.actionText}>📞 Call</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, styles.email]}>
            <Text style={styles.actionText}>✉ Email</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, styles.whatsapp]}>
            <Text style={styles.actionText}>💬 WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <Text style={[styles.tabText, styles.activeTab]}>Activity</Text>
          <Text style={styles.tabText}>Tasks (1)</Text>
          <Text style={styles.tabText}>AI Insights</Text>
        </View>

        {/* Activity Header */}
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>Activity History</Text>
          <Text style={styles.addActivity}>+ Add Activity</Text>
        </View>

        {/* Activity List */}
        {[
          'WhatsApp chat with Prashant',
          'Outgoing call to Prashant',
          'Task created: Check',
          'Test',
          'WhatsApp chat with Prashant',
        ].map((item, index) => (
          <View key={index} style={styles.activityCard}>
            <Text style={styles.activityText}>{item}</Text>
            <Text style={styles.activityTime}>Jan 21 · 12:35 AM</Text>
          </View>
        ))}
        {/* {[
  'WhatsApp chat with Prashant',
  'Outgoing call to Prashant',
  'Task created: Check',
  'Test',
  'WhatsApp chat with Prashant',
].map((item, index) => (
  <View key={`${item}-${index}`} style={styles.activityCard}>
    <Text style={styles.activityText}>{item}</Text>
    <Text style={styles.activityTime}>Jan 21 · 12:35 AM</Text>
  </View>
))} */}


      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1220',
  },
  content: {
    padding: 16,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },

  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#121A2F',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },

  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  subText: {
    color: '#9CA3AF',
    fontSize: 12,
  },

  statusBadge: {
    marginTop: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#1E40AF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  statusText: {
    color: '#BFDBFE',
    fontSize: 11,
  },

  close: {
    color: '#9CA3AF',
    fontSize: 18,
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },

  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 10,
    alignItems: 'center',
  },

  call: {
    backgroundColor: '#064E3B',
  },
  email: {
    backgroundColor: '#1E3A8A',
  },
  whatsapp: {
    backgroundColor: '#065F46',
  },

  actionText: {
    color: '#ECFEFF',
    fontSize: 13,
    fontWeight: '500',
  },

  tabs: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  tabText: {
    marginRight: 18,
    color: '#9CA3AF',
    fontSize: 13,
  },

  activeTab: {
    color: '#fff',
    fontWeight: '600',
  },

  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  activityTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  addActivity: {
    color: '#60A5FA',
    fontSize: 13,
  },

  activityCard: {
    backgroundColor: '#111827',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  activityText: {
    color: '#E5E7EB',
    fontSize: 13,
  },

  activityTime: {
    marginTop: 4,
    color: '#6B7280',
    fontSize: 11,
  },
});
