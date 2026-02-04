// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   ScrollView,
//   Pressable,
//   SafeAreaView,
//   FlatList,
// } from 'react-native';
// import CreateLeadScreen from './CreateLeadScreen';

// const Leads = () => {
//   const [screen, setScreen] = useState('list');
//   const [searchText, setSearchText] = useState('');
//   const [activeFilter, setActiveFilter] = useState('All');

//   const [leads, setLeads] = useState([
//     { id: '1', name: 'Prashant', phone: '8272957571', status: 'New', dealValue: 10 },
//     { id: '2', name: 'Ranjan', phone: '7415557107', status: 'New', dealValue: 5 },
//     { id: '3', name: 'Singh', phone: '8272957572', status: 'Qualified', dealValue: 15 },
//     { id: '4', name: 'Gyan', phone: '7415557103', status: 'Won', dealValue: 20 },
//     { id: '5', name: 'Tenmay', phone: '8272957574', status: 'New', dealValue: 0 },
//     { id: '6', name: 'Vipin', phone: '7415557105', status: 'New', dealValue: 0 },
//     { id: '7', name: 'Praveen', phone: '8272957576', status: 'Qualified', dealValue: 8 },
//     { id: '8', name: 'Akhil', phone: '7415557108', status: 'Won', dealValue: 12 },
//     { id: '9', name: 'Arbaz', phone: '8272957579', status: 'New', dealValue: 0 },
//     { id: '10', name: 'Dubey', phone: '7415557100', status: 'New', dealValue: 0 },
//   ]);

//   const filters = [
//     'All',
//     'New',
//     'Contacted',
//     'Qualified',
//     'Proposal',
//     'Negotiation',
//     'Won',
//     'Lost',
//   ];

//   const addLead = (newLead) => {
//     setLeads([
//       {
//         id: Date.now().toString(),
//         ...newLead,
//         status: newLead.status || 'New',
//         dealValue: newLead.dealValue || 0,
//       },
//       ...leads,
//     ]);
//     setScreen('list');
//   };

//   if (screen === 'CreateLeadScreen') {
//     return <CreateLeadScreen onBack={() => setScreen('list')} onSubmit={addLead} />;
//   }

//   const filteredLeads = leads.filter(l => {
//     const matchFilter = activeFilter === 'All' || l.status === activeFilter;
//     const matchSearch =
//       l.name.toLowerCase().includes(searchText.toLowerCase()) ||
//       l.phone.includes(searchText) ||
//       l.status.toLowerCase().includes(searchText.toLowerCase());
//     return matchFilter && matchSearch;
//   });

//   const newCount = leads.filter(l => l.status === 'New').length;
//   const qualifiedCount = leads.filter(l => l.status === 'Qualified').length;
//   const wonCount = leads.filter(l => l.status === 'Won').length;
//   const pipeline = leads.reduce((sum, l) => sum + Number(l.dealValue || 0), 0);

//   return (
//     <SafeAreaView style={[styles.container, { paddingTop: 40 }]}>
//       {/* HEADER */}
//       <View style={styles.headerRow}>
//         <View>
//           <Text style={styles.title}>Manage Leads</Text>
//           <Text style={styles.subtitle}>{leads.length} total leads</Text>
//         </View>

//         <Pressable style={styles.addBtn} onPress={() => setScreen('CreateLeadScreen')}>
//           <Text style={styles.addBtnText}>+</Text>
//         </Pressable>
//       </View>

//       {/* STATS */}
//       <View style={styles.statsRow}>
//         <StatBox value={newCount} label="New" />
//         <StatBox value={qualifiedCount} label="Qualified" />
//         <StatBox value={wonCount} label="Won" />
//         <StatBox value={`$${pipeline}k`} label="Pipeline" />
//       </View>

//       {/* SEARCH */}
//       <View style={styles.searchBox}>
//         <Text style={styles.searchIcon}>🔍</Text>
//         <TextInput
//           placeholder="Search leads..."
//           placeholderTextColor="#64748b"
//           style={styles.searchInput}
//           value={searchText}
//           onChangeText={setSearchText}
//         />
//       </View>

//       {/* FILTERS */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.filters}
//       >
//         {filters.map(item => (
//           <Pressable
//             key={item}
//             onPress={() => setActiveFilter(item)}
//             style={[
//               styles.filter,
//               activeFilter === item && styles.activeFilter,
//             ]}
//           >
//             <Text style={styles.filterText}>{item}</Text>
//           </Pressable>
//         ))}
//       </ScrollView>

//       {/* LIST */}
//       <FlatList
//         data={filteredLeads}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => <LeadCard lead={item} />}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </SafeAreaView>
//   );
// };

// /* ---------- COMPONENTS ---------- */

// const StatBox = ({ label, value }) => (
//   <View style={styles.statBox}>
//     <Text style={styles.statValue}>{value}</Text>
//     <Text style={styles.statLabel}>{label}</Text>
//   </View>
// );

// const LeadCard = ({ lead }) => (
//   <View style={styles.card}>
//     <View style={styles.avatar}>
//       <Text style={styles.avatarText}>{lead.name[0]}</Text>
//     </View>

//     <View style={styles.info}>
//       <View style={styles.nameRow}>
//         <Text style={styles.name}>{lead.name}</Text>
//         <View style={styles.badge}>
//           <Text style={styles.badgeText}>{lead.status}</Text>
//         </View>
//       </View>

//       <Text style={styles.phone}>{lead.phone}</Text>
//     </View>

//     <View style={styles.actions}>
//       <ActionBtn label="📞" />
//       <ActionBtn label="💬" />
//       <ActionBtn label="✏️" />
//       <ActionBtn label="🗑" />
//     </View>
//   </View>
// );

// const ActionBtn = ({ label }) => (
//   <Pressable style={styles.actionBtn}>
//     <Text>{label}</Text>
//   </Pressable>
// );

// /* ---------- STYLES ---------- */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#020617',
//     paddingHorizontal: 16,
//   },

//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   title: { fontSize: 22, fontWeight: '600', color: '#fff' },
//   subtitle: { color: '#94a3b8', fontSize: 12 },

//   addBtn: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: '#2563eb',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   addBtnText: { color: '#fff', fontSize: 26 },

//   statsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 12,
//   },

//   statBox: {
//     width: '23%',
//     backgroundColor: '#020617',
//     borderRadius: 12,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#1e293b',
//     alignItems: 'center',
//   },

//   statValue: { fontSize: 16, fontWeight: '700', color: '#fff' },
//   statLabel: { fontSize: 11, color: '#94a3b8', marginTop: 4 },

//   searchBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#1e293b',
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 4,
//   },

//   searchIcon: { fontSize: 16, marginRight: 6 },
//   searchInput: { flex: 1, color: '#fff', paddingVertical: 10 },

//   filters: {
//     flexDirection: 'row',
//     paddingVertical: 16,
//     paddingRight: 10,
//     marginBottom: 6,
//   },

//   filter: {
//     minHeight: 36,
//     paddingHorizontal: 18,
//     paddingVertical: 8,
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: '#1e293b',
//     marginRight: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   activeFilter: {
//     backgroundColor: '#2563eb',
//     borderColor: '#2563eb',
//   },

//   filterText: {
//     fontSize: 13,
//     fontWeight: '500',
//     color: '#ffffff',
//   },

//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#020617',
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: '#1e293b',
//     padding: 14,
//     marginBottom: 12,
//     alignItems: 'center',
//   },

//   avatar: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     backgroundColor: '#38bdf8',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },

//   avatarText: { fontWeight: '700', color: '#020617' },
//   info: { flex: 1 },
//   nameRow: { flexDirection: 'row', alignItems: 'center' },
//   name: { color: '#fff', fontWeight: '600' },

//   badge: {
//     backgroundColor: '#1d4ed8',
//     borderRadius: 10,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     marginLeft: 6,
//   },

//   badgeText: { fontSize: 10, color: '#fff' },
//   phone: { fontSize: 12, color: '#cbd5f5' },

//   actions: { flexDirection: 'row' },
//   actionBtn: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: '#1e293b',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 6,
//   },
// });

// export default Leads;


//api call
// import React, { useState, useEffect } from 'react'; // ✅ useEffect added
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   ScrollView,
//   Pressable,
//   SafeAreaView,
//   FlatList,
// } from 'react-native';
// import CreateLeadScreen from './CreateLeadScreen';

// const Leads = () => {
//   const [screen, setScreen] = useState('list');
//   const [searchText, setSearchText] = useState('');
//   const [activeFilter, setActiveFilter] = useState('All');

//   const [leads, setLeads] = useState([
//     { id: '1', name: 'Prashant', phone: '8272957571', status: 'New', dealValue: 10 },
//     { id: '2', name: 'Ranjan', phone: '7415557107', status: 'New', dealValue: 5 },
//     { id: '3', name: 'Singh', phone: '8272957572', status: 'Qualified', dealValue: 15 },
//     { id: '4', name: 'Gyan', phone: '7415557103', status: 'Won', dealValue: 20 },
//     { id: '5', name: 'Tenmay', phone: '8272957574', status: 'New', dealValue: 0 },
//     { id: '6', name: 'Vipin', phone: '7415557105', status: 'New', dealValue: 0 },
//     { id: '7', name: 'Praveen', phone: '8272957576', status: 'Qualified', dealValue: 8 },
//     { id: '8', name: 'Akhil', phone: '7415557108', status: 'Won', dealValue: 12 },
//     { id: '9', name: 'Arbaz', phone: '8272957579', status: 'New', dealValue: 0 },
//     { id: '10', name: 'Dubey', phone: '7415557100', status: 'New', dealValue: 0 },
//   ]);

//   /* =======================
//      ✅ API INTEGRATION
//      ======================= */
//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(res => res.json())
//       .then(data => {
//         const apiLeads = data.map(item => ({
//           id: `api-${item.id}`,       // unique key
//           name: item.name,
//           phone: item.phone || 'NA',
//           status: 'New',
//           dealValue: 0,
//         }));

//         // merge API leads on top
//         setLeads(prev => [...apiLeads, ...prev]);
//       })
//       .catch(err => {
//         console.log('API ERROR', err);
//       });
//   }, []);
//   /* ======================= */

//   const filters = [
//     'All',
//     'New',
//     'Contacted',
//     'Qualified',
//     'Proposal',
//     'Negotiation',
//     'Won',
//     'Lost',
//   ];

//   const addLead = (newLead) => {
//     setLeads([
//       {
//         id: Date.now().toString(),
//         ...newLead,
//         status: newLead.status || 'New',
//         dealValue: newLead.dealValue || 0,
//       },
//       ...leads,
//     ]);
//     setScreen('list');
//   };

//   if (screen === 'CreateLeadScreen') {
//     return (
//       <CreateLeadScreen
//         onBack={() => setScreen('list')}
//         onSubmit={addLead}
//       />
//     );
//   }

//   const filteredLeads = leads.filter(l => {
//     const matchFilter = activeFilter === 'All' || l.status === activeFilter;
//     const matchSearch =
//       l.name.toLowerCase().includes(searchText.toLowerCase()) ||
//       l.phone.includes(searchText) ||
//       l.status.toLowerCase().includes(searchText.toLowerCase());
//     return matchFilter && matchSearch;
//   });

//   const newCount = leads.filter(l => l.status === 'New').length;
//   const qualifiedCount = leads.filter(l => l.status === 'Qualified').length;
//   const wonCount = leads.filter(l => l.status === 'Won').length;
//   const pipeline = leads.reduce((sum, l) => sum + Number(l.dealValue || 0), 0);

//   return (
//     <SafeAreaView style={[styles.container, { paddingTop: 40 }]}>
//       {/* HEADER */}
//       <View style={styles.headerRow}>
//         <View>
//           <Text style={styles.title}>Manage Leads</Text>
//           <Text style={styles.subtitle}>{leads.length} total leads</Text>
//         </View>

//         <Pressable
//           style={styles.addBtn}
//           onPress={() => setScreen('CreateLeadScreen')}
//         >
//           <Text style={styles.addBtnText}>+</Text>
//         </Pressable>
//       </View>

//       {/* STATS */}
//       <View style={styles.statsRow}>
//         <StatBox value={newCount} label="New" />
//         <StatBox value={qualifiedCount} label="Qualified" />
//         <StatBox value={wonCount} label="Won" />
//         <StatBox value={`$${pipeline}k`} label="Pipeline" />
//       </View>

//       {/* SEARCH */}
//       <View style={styles.searchBox}>
//         <Text style={styles.searchIcon}>🔍</Text>
//         <TextInput
//           placeholder="Search leads..."
//           placeholderTextColor="#64748b"
//           style={styles.searchInput}
//           value={searchText}
//           onChangeText={setSearchText}
//         />
//       </View>

//       {/* FILTERS */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.filters}
//       >
//         {filters.map(item => (
//           <Pressable
//             key={item}
//             onPress={() => setActiveFilter(item)}
//             style={[
//               styles.filter,
//               activeFilter === item && styles.activeFilter,
//             ]}
//           >
//             <Text style={styles.filterText}>{item}</Text>
//           </Pressable>
//         ))}
//       </ScrollView>

//       {/* LIST */}
//       <FlatList
//         data={filteredLeads}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => <LeadCard lead={item} />}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />
//     </SafeAreaView>
//   );
// };

// /* ---------- COMPONENTS ---------- */

// const StatBox = ({ label, value }) => (
//   <View style={styles.statBox}>
//     <Text style={styles.statValue}>{value}</Text>
//     <Text style={styles.statLabel}>{label}</Text>
//   </View>
// );

// const LeadCard = ({ lead }) => (
//   <View style={styles.card}>
//     <View style={styles.avatar}>
//       <Text style={styles.avatarText}>{lead.name[0]}</Text>
//     </View>

//     <View style={styles.info}>
//       <View style={styles.nameRow}>
//         <Text style={styles.name}>{lead.name}</Text>
//         <View style={styles.badge}>
//           <Text style={styles.badgeText}>{lead.status}</Text>
//         </View>
//       </View>

//       <Text style={styles.phone}>{lead.phone}</Text>
//     </View>

//     <View style={styles.actions}>
//       <ActionBtn label="📞" />
//       <ActionBtn label="💬" />
//       <ActionBtn label="✏️" />
//       <ActionBtn label="🗑" />
//     </View>
//   </View>
// );

// const ActionBtn = ({ label }) => (
//   <Pressable style={styles.actionBtn}>
//     <Text>{label}</Text>
//   </Pressable>
// );

// /* ---------- STYLES ---------- */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#020617',
//     paddingHorizontal: 16,
//   },
//   headerRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   title: { fontSize: 22, fontWeight: '600', color: '#fff' },
//   subtitle: { color: '#94a3b8', fontSize: 12 },
//   addBtn: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: '#2563eb',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   addBtnText: { color: '#fff', fontSize: 26 },
//   statsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 12,
//   },
//   statBox: {
//     width: '23%',
//     backgroundColor: '#020617',
//     borderRadius: 12,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#1e293b',
//     alignItems: 'center',
//   },
//   statValue: { fontSize: 16, fontWeight: '700', color: '#fff' },
//   statLabel: { fontSize: 11, color: '#94a3b8', marginTop: 4 },
//   searchBox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#1e293b',
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 4,
//   },
//   searchIcon: { fontSize: 16, marginRight: 6 },
//   searchInput: { flex: 1, color: '#fff', paddingVertical: 10 },
//   filters: {
//     flexDirection: 'row',
//     paddingVertical: 16,
//     paddingRight: 10,
//     marginBottom: 6,
//   },
//   filter: {
//     minHeight: 36,
//     paddingHorizontal: 18,
//     paddingVertical: 8,
//     borderRadius: 22,
//     borderWidth: 1,
//     borderColor: '#1e293b',
//     marginRight: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   activeFilter: {
//     backgroundColor: '#2563eb',
//     borderColor: '#2563eb',
//   },
//   filterText: {
//     fontSize: 13,
//     fontWeight: '500',
//     color: '#ffffff',
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#020617',
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: '#1e293b',
//     padding: 14,
//     marginBottom: 12,
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     backgroundColor: '#38bdf8',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 12,
//   },
//   avatarText: { fontWeight: '700', color: '#020617' },
//   info: { flex: 1 },
//   nameRow: { flexDirection: 'row', alignItems: 'center' },
//   name: { color: '#fff', fontWeight: '600' },
//   badge: {
//     backgroundColor: '#1d4ed8',
//     borderRadius: 10,
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     marginLeft: 6,
//   },
//   badgeText: { fontSize: 10, color: '#fff' },
//   phone: { fontSize: 12, color: '#cbd5f5' },
//   actions: { flexDirection: 'row' },
//   actionBtn: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: '#1e293b',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 6,
//   },
// });

// export default Leads;
import React, { useState } from 'react'; // removed useEffect since no API
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  SafeAreaView,
  FlatList,
} from 'react-native';
import CreateLeadScreen from './CreateLeadScreen';

const Leads = () => {
  const [screen, setScreen] = useState('list');
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const [leads, setLeads] = useState([
    { id: '1', name: 'Prashant', phone: '8272957571', status: 'New', dealValue: 10 },
    { id: '2', name: 'Ranjan', phone: '7415557107', status: 'New', dealValue: 5 },
    { id: '3', name: 'Singh', phone: '8272957572', status: 'Qualified', dealValue: 15 },
    { id: '4', name: 'Gyan', phone: '7415557103', status: 'Won', dealValue: 20 },
    { id: '5', name: 'Tenmay', phone: '8272957574', status: 'New', dealValue: 0 },
    { id: '6', name: 'Vipin', phone: '7415557105', status: 'New', dealValue: 0 },
    { id: '7', name: 'Praveen', phone: '8272957576', status: 'Qualified', dealValue: 8 },
    { id: '8', name: 'Akhil', phone: '7415557108', status: 'Won', dealValue: 12 },
    { id: '9', name: 'Arbaz', phone: '8272957579', status: 'New', dealValue: 0 },
    { id: '10', name: 'Dubey', phone: '7415557100', status: 'New', dealValue: 0 },
  ]);

  const filters = [
    'All',
    'New',
    'Contacted',
    'Qualified',
    'Proposal',
    'Negotiation',
    'Won',
    'Lost',
  ];

  const addLead = (newLead) => {
    setLeads([
      {
        id: Date.now().toString(),
        ...newLead,
        status: newLead.status || 'New',
        dealValue: newLead.dealValue || 0,
      },
      ...leads,
    ]);
    setScreen('list');
  };

  if (screen === 'CreateLeadScreen') {
    return (
      <CreateLeadScreen
        onBack={() => setScreen('list')}
        onSubmit={addLead}
      />
    );
  }

  const filteredLeads = leads.filter(l => {
    const matchFilter = activeFilter === 'All' || l.status === activeFilter;
    const matchSearch =
      l.name.toLowerCase().includes(searchText.toLowerCase()) ||
      l.phone.includes(searchText) ||
      l.status.toLowerCase().includes(searchText.toLowerCase());
    return matchFilter && matchSearch;
  });

  const newCount = leads.filter(l => l.status === 'New').length;
  const qualifiedCount = leads.filter(l => l.status === 'Qualified').length;
  const wonCount = leads.filter(l => l.status === 'Won').length;
  const pipeline = leads.reduce((sum, l) => sum + Number(l.dealValue || 0), 0);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: 40 }]}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Manage Leads</Text>
          <Text style={styles.subtitle}>{leads.length} total leads</Text>
        </View>

        <Pressable
          style={styles.addBtn}
          onPress={() => setScreen('CreateLeadScreen')}
        >
          <Text style={styles.addBtnText}>+</Text>
        </Pressable>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <StatBox value={newCount} label="New" />
        <StatBox value={qualifiedCount} label="Qualified" />
        <StatBox value={wonCount} label="Won" />
        <StatBox value={`$${pipeline}k`} label="Pipeline" />
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder="Search leads..."
          placeholderTextColor="#64748b"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* FILTERS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        {filters.map(item => (
          <Pressable
            key={item}
            onPress={() => setActiveFilter(item)}
            style={[
              styles.filter,
              activeFilter === item && styles.activeFilter,
            ]}
          >
            <Text style={styles.filterText}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* LIST */}
      <FlatList
        data={filteredLeads}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <LeadCard lead={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

/* ---------- COMPONENTS ---------- */

const StatBox = ({ label, value }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const LeadCard = ({ lead }) => (
  <View style={styles.card}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{lead.name[0]}</Text>
    </View>

    <View style={styles.info}>
      <View style={styles.nameRow}>
        <Text style={styles.name}>{lead.name}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{lead.status}</Text>
        </View>
      </View>

      <Text style={styles.phone}>{lead.phone}</Text>
    </View>

    <View style={styles.actions}>
      <ActionBtn label="📞" />
      <ActionBtn label="💬" />
      <ActionBtn label="✏️" />
      <ActionBtn label="🗑" />
    </View>
  </View>
);

const ActionBtn = ({ label }) => (
  <Pressable style={styles.actionBtn}>
    <Text>{label}</Text>
  </Pressable>
);

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: '600', color: '#fff' },
  subtitle: { color: '#94a3b8', fontSize: 12 },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 26 },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  statBox: {
    width: '23%',
    backgroundColor: '#020617',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#1e293b',
    alignItems: 'center',
  },
  statValue: { fontSize: 16, fontWeight: '700', color: '#fff' },
  statLabel: { fontSize: 11, color: '#94a3b8', marginTop: 4 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 4,
  },
  searchIcon: { fontSize: 16, marginRight: 6 },
  searchInput: { flex: 1, color: '#fff', paddingVertical: 10 },
  filters: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingRight: 10,
    marginBottom: 6,
  },
  filter: {
    minHeight: 36,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#1e293b',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#ffffff',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#020617',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1e293b',
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#38bdf8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: { fontWeight: '700', color: '#020617' },
  info: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  name: { color: '#fff', fontWeight: '600' },
  badge: {
    backgroundColor: '#1d4ed8',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },
  badgeText: { fontSize: 10, color: '#fff' },
  phone: { fontSize: 12, color: '#cbd5f5' },
  actions: { flexDirection: 'row' },
  actionBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
});

export default Leads;
