// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   FlatList,
// } from 'react-native';

// const callSummary = {
//   totalCalls: 19,
//   outgoing: 8,
//   incoming: 7,
//   missed: 4,
//   talkTime: '02:45:30',
// };

// const callListData = [
//   { id: '1', type: 'Outgoing', number: '900000001', date: 'Tue, 19 Jan 04:32 PM' },
//   { id: '2', type: 'Incoming', number: '900000002', date: 'Wed, 20 Jan 10:12 AM' },
//   { id: '3', type: 'Missed', number: '900000003', date: 'Thu, 21 Jan 02:15 PM' },
//   { id: '4', type: 'Missed', number: '900000004', date: 'Thu, 21 Jan 02:17 PM' },
//   { id: '5', type: 'Missed', number: '900000005', date: 'Thu, 21 Jan 02:20 PM' },
// ];

// const CALL_TYPES = ['All Types', 'Incoming', 'Outgoing', 'Missed'];
// const TIME_FILTERS = ['All Time', 'Today', 'This Week', 'This Month', 'This Year'];

// const Activity = () => {
//   const [callTypeFilter, setCallTypeFilter] = useState('All Types');
//   const [timeFilter, setTimeFilter] = useState('All Time');

//   const [showTypeDropdown, setShowTypeDropdown] = useState(false);
//   const [showTimeDropdown, setShowTimeDropdown] = useState(false);

//   // Filter call list based on selected type
//   const filteredCallList =
//     callTypeFilter === 'All Types'
//       ? callListData
//       : callListData.filter(item => item.type === callTypeFilter);

//   const renderCallCard = ({ item }) => {
//     let color = '#3b82f6';
//     if (item.type === 'Incoming') color = '#10b981';
//     if (item.type === 'Missed') color = '#ef4444';

//     return (
//       <View style={styles.callItemCard}>
//         <View style={styles.callItemLeft}>
//           <View style={styles.callNumberCircle}>
//             <Text style={styles.callNumberText}>{item.number.slice(-2)}</Text>
//           </View>
//           <Text style={styles.callItemNumber}>{item.number}</Text>
//           <Text style={styles.callItemDate}>{item.date}</Text>
//         </View>

//         <View style={styles.callItemRight}>
//           <Text style={[styles.callTypeText, { color }]}>{item.type}</Text>
//           <Text style={styles.callItemDuration}>Duration: 05:32</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <FlatList
//       data={filteredCallList}
//       keyExtractor={(item) => item.id}
//       renderItem={renderCallCard}
//       contentContainerStyle={styles.container}
//       ListHeaderComponent={
//         <>
//           {/* Header */}
//           <View style={styles.topRow}>
//             <Text style={styles.title}>Call Activity</Text>
//             <Text style={styles.subTitle}>{callSummary.totalCalls} total call log</Text>
//           </View>

//           <Text style={styles.sectionTitle}>Today's Activity</Text>

//           {/* Summary Card */}
//           <View style={styles.card}>
//             <View style={styles.statsRow}>
//               {['totalCalls', 'outgoing', 'incoming', 'missed'].map((key) => (
//                 <View style={styles.statsItem} key={key}>
//                   <Text style={styles.statsNumber}>{callSummary[key]}</Text>
//                   <Text style={styles.statsLabel}>
//                     {key.charAt(0).toUpperCase() + key.slice(1)}
//                   </Text>
//                 </View>
//               ))}
//             </View>

//             <View style={styles.divider} />

//             <Text style={styles.talkTimeText}>{callSummary.talkTime}</Text>
//             <Text style={styles.talkTimeLabel}>Total Talk Time</Text>
//           </View>

//           {/* Filters */}
//           <View style={styles.filterRow}>
//             {/* Call Type Dropdown */}
//             <View style={styles.dropdownWrapper}>
//               <TouchableOpacity
//                 style={styles.filterButton}
//                 onPress={() => setShowTypeDropdown(!showTypeDropdown)}
//               >
//                 <Text>{callTypeFilter}</Text>
//               </TouchableOpacity>

//               {showTypeDropdown &&
//                 CALL_TYPES.map((type) => (
//                   <TouchableOpacity
//                     key={type}
//                     style={styles.dropdownItem}
//                     onPress={() => {
//                       setCallTypeFilter(type);
//                       setShowTypeDropdown(false);
//                     }}
//                   >
//                     <Text>{type}</Text>
//                   </TouchableOpacity>
//                 ))}
//             </View>

//             {/* Time Dropdown */}
//             <View style={styles.dropdownWrapper}>
//               <TouchableOpacity
//                 style={styles.filterButton}
//                 onPress={() => setShowTimeDropdown(!showTimeDropdown)}
//               >
//                 <Text>{timeFilter}</Text>
//               </TouchableOpacity>

//               {showTimeDropdown &&
//                 TIME_FILTERS.map((time) => (
//                   <TouchableOpacity
//                     key={time}
//                     style={styles.dropdownItem}
//                     onPress={() => {
//                       setTimeFilter(time);
//                       setShowTimeDropdown(false);
//                     }}
//                   >
//                     <Text>{time}</Text>
//                   </TouchableOpacity>
//                 ))}
//             </View>
//           </View>
//         </>
//       }
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: { backgroundColor: '#f3f4f6', padding: 15 },

//   topRow: { marginBottom: 10 },
//   title: { fontSize: 20, fontWeight: 'bold' },
//   subTitle: { fontSize: 14, color: '#6b7280' },
//   sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 10 },

//   card: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 15 },
//   statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
//   statsItem: { alignItems: 'center' },
//   statsNumber: { fontSize: 16, fontWeight: 'bold' },
//   statsLabel: { fontSize: 12, color: '#6b7280' },

//   divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 10 },
//   talkTimeText: { fontSize: 16, fontWeight: 'bold' },
//   talkTimeLabel: { fontSize: 12, color: '#6b7280' },

//   filterRow: { flexDirection: 'row', justifyContent: 'space-between', zIndex: 10 },

//   dropdownWrapper: { width: '48%' },

//   filterButton: { backgroundColor: '#fff', padding: 10, borderRadius: 8 },

//   dropdownItem: {
//     backgroundColor: '#fff',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e5e7eb',
//   },

//   callItemCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 10,
//   },

//   callItemLeft: { flex: 1 },
//   callItemRight: { alignItems: 'flex-end', justifyContent: 'center' },

//   callNumberCircle: {
//     width: 35,
//     height: 35,
//     borderRadius: 18,
//     backgroundColor: '#e5e7eb',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 5,
//   },

//   callNumberText: { fontWeight: 'bold' },
//   callItemNumber: { fontSize: 14 },
//   callItemDate: { fontSize: 12, color: '#6b7280' },
//   callTypeText: { fontSize: 14, fontWeight: 'bold' },
//   callItemDuration: { fontSize: 12, color: '#6b7280' },
// });

// export default Activity

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';

const callSummary = {
  totalCalls: 19,
  outgoing: 8,
  incoming: 7,
  missed: 4,
  talkTime: '02:45:30',
  avgDuration: '05:32',
};

const callListData = [
  { id: '1', name: 'Arbaz', type: 'Outgoing', number: '900000001', date: 'Tue, 19 Jan 04:32 PM' },
  { id: '2', name: 'Rahul', type: 'Incoming', number: '900000002', date: 'Wed, 20 Jan 10:12 AM' },
  { id: '3', name: 'Ankit', type: 'Missed', number: '900000003', date: 'Thu, 21 Jan 02:15 PM' },
  { id: '4', name: 'Sanya', type: 'Missed', number: '900000004', date: 'Thu, 21 Jan 02:17 PM' },
  { id: '5', name: 'Priya', type: 'Missed', number: '900000005', date: 'Thu, 21 Jan 02:20 PM' },
];

const CALL_TYPES = ['All Types', 'Incoming', 'Outgoing', 'Missed'];
const TIME_FILTERS = ['All Time', 'Today', 'This Week', 'This Month', 'This Year'];

const Activity = () => {
  const [callTypeFilter, setCallTypeFilter] = useState('All Types');
  const [timeFilter, setTimeFilter] = useState('All Time');

  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  // Filter call list based on selected type
  const filteredCallList =
    callTypeFilter === 'All Types'
      ? callListData
      : callListData.filter(item => item.type === callTypeFilter);

  const renderCallCard = ({ item }) => {
    let color = '#3b82f6';
    if (item.type === 'Incoming') color = '#10b981';
    if (item.type === 'Missed') color = '#ef4444';

    return (
      <View style={styles.callItemCard}>
        <View style={styles.callItemLeft}>
          <View style={styles.callNumberCircle}>
            <Text style={styles.callNumberText}>{item.number.slice(-2)}</Text>
          </View>
          <Text style={styles.callItemName}>{item.name}</Text>
          <Text style={styles.callItemNumber}>{item.number}</Text>
          <Text style={styles.callItemDate}>{item.date}</Text>
        </View>

        <View style={styles.callItemRight}>
          <Text style={[styles.callTypeText, { color }]}>{item.type}</Text>
          <Text style={styles.callItemDuration}>Duration: 05:32</Text>
        </View>
      </View>
    );
  };

  const HeaderComponent = () => (
    <View>
      {/* Header */}
      <View style={styles.topRow}>
        <Text style={styles.title}>Call Activity</Text>
        <Text style={styles.subTitle}>{callSummary.totalCalls} total call log</Text>
      </View>

      <Text style={styles.sectionTitle}>Today's Activity</Text>

      {/* Summary Card */}
      <View style={styles.card}>
        <View style={styles.statsRow}>
          {['totalCalls', 'outgoing', 'incoming'].map((key) => (
            <View style={styles.statsItem} key={key}>
              <Text style={styles.statsNumber}>{callSummary[key]}</Text>
              <Text style={styles.statsLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        {/* Talk Time and Missed + Avg Duration */}
        <View style={styles.talkRow}>
          {/* Total Talk Time on Left */}
          <View>
            <Text style={styles.talkTimeText}>{callSummary.talkTime}</Text>
            <Text style={styles.talkTimeLabel}>Total Talk Time</Text>
          </View>

          {/* Missed + Avg Duration on Right */}
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[styles.talkTimeText, { color: '#ef4444' }]}>{callSummary.missed}</Text>
            <Text style={styles.talkTimeLabel}>Missed</Text>
            <Text style={[styles.avgDurationText, { marginTop: 5 }]}>
              Avg Duration: {callSummary.avgDuration}
            </Text>
          </View>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        {/* Call Type Dropdown */}
        <View style={styles.dropdownWrapper}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowTypeDropdown(!showTypeDropdown)}
          >
            <Text style={{ color: '#fff' }}>{callTypeFilter}</Text>
          </TouchableOpacity>

          {showTypeDropdown &&
            CALL_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={styles.dropdownItem}
                onPress={() => {
                  setCallTypeFilter(type);
                  setShowTypeDropdown(false);
                }}
              >
                <Text style={{ color: '#fff' }}>{type}</Text>
              </TouchableOpacity>
            ))}
        </View>

        {/* Time Dropdown */}
        <View style={styles.dropdownWrapper}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowTimeDropdown(!showTimeDropdown)}
          >
            <Text style={{ color: '#fff' }}>{timeFilter}</Text>
          </TouchableOpacity>

          {showTimeDropdown &&
            TIME_FILTERS.map((time) => (
              <TouchableOpacity
                key={time}
                style={styles.dropdownItem}
                onPress={() => {
                  setTimeFilter(time);
                  setShowTimeDropdown(false);
                }}
              >
                <Text style={{ color: '#fff' }}>{time}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={filteredCallList}
      keyExtractor={(item) => item.id}
      renderItem={renderCallCard}
      contentContainerStyle={{ paddingTop: 40, backgroundColor: '#000', paddingHorizontal: 15, paddingBottom: 20 }}
      ListHeaderComponent={HeaderComponent}
    />
  );
};

const styles = StyleSheet.create({
  topRow: { marginBottom: 15 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  subTitle: { fontSize: 14, color: '#9ca3af' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginVertical: 15, color: '#fff' },

  card: { backgroundColor: '#1f1f1f', borderRadius: 10, padding: 15, marginBottom: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  statsItem: { alignItems: 'center' },
  statsNumber: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  statsLabel: { fontSize: 12, color: '#9ca3af' },

  divider: { height: 1, backgroundColor: '#374151', marginVertical: 10 },

  talkRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },

  talkTimeText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  talkTimeLabel: { fontSize: 12, color: '#9ca3af' },
  avgDurationText: { fontSize: 12, color: '#9ca3af' },

  filterRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },

  dropdownWrapper: { width: '48%' },
  filterButton: { backgroundColor: '#1f1f1f', padding: 10, borderRadius: 8 },
  dropdownItem: {
    backgroundColor: '#1f1f1f',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },

  callItemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  callItemLeft: { flex: 1 },
  callItemRight: { alignItems: 'flex-end', justifyContent: 'center' },

  callNumberCircle: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },

  callNumberText: { fontWeight: 'bold', color: '#fff' },
  callItemName: { fontSize: 14, fontWeight: 'bold', color: '#fff', marginBottom: 2 },
  callItemNumber: { fontSize: 14, color: '#fff' },
  callItemDate: { fontSize: 12, color: '#9ca3af' },
  callTypeText: { fontSize: 14, fontWeight: 'bold' },
  callItemDuration: { fontSize: 12, color: '#9ca3af' },
});

export default Activity;
