// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Pressable,
//   ScrollView,
//   Alert,
//   SafeAreaView,
// } from 'react-native';

// export default function CreateLeadScreen({ onBack, onSubmit }) {
//   const [focused, setFocused] = useState('');
//   const [form, setForm] = useState({
//     name: '',
//     company: '',
//     phone: '',
//     email: '',
//     source: '',
//     dealValue: '',
//     status: '',
//     notes: '',
//   });

//   const onChange = (key, value) => {
//     setForm(prev => ({ ...prev, [key]: value }));
//   };

//   const validate = () => {
//     return Object.values(form).every(v => v.trim() !== '');
//   };

//   const submit = () => {
//     if (!validate()) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     onSubmit && onSubmit(form); // send data to Leads.js
//     Alert.alert('Success', 'Lead created successfully');
//     // Reset form (optional)
//     setForm({
//       name: '',
//       company: '',
//       phone: '',
//       email: '',
//       source: '',
//       dealValue: '',
//       status: '',
//       notes: '',
//     });
//   };

//   const renderInput = (
//     label,
//     placeholder,
//     key,
//     keyboard = 'default',
//     multiline = false
//   ) => (
//     <View style={styles.field}>
//       <Text style={styles.label}>{label}</Text>
//       <TextInput
//         value={form[key]}
//         placeholder={placeholder}
//         placeholderTextColor="#64748b"
//         keyboardType={keyboard}
//         multiline={multiline}
//         onChangeText={v => onChange(key, v)}
//         onFocus={() => setFocused(key)}
//         onBlur={() => setFocused('')}
//         style={[
//           styles.input,
//           multiline && styles.textArea,
//           focused === key && styles.focused,
//         ]}
//       />
//     </View>
//   );

//   return (
//        <SafeAreaView style={[styles.safe, { paddingTop: 80 }]}>
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* HEADER */}
//         <View style={styles.headerRow}>
//           <Pressable onPress={onBack}>
//             <Text style={styles.back}>← Back</Text>
//           </Pressable>
//           <Text style={styles.header}>Create Lead</Text>
//         </View>

//         <View style={styles.row}>
//           {renderInput('Name', 'Enter name', 'name')}
//           {renderInput('Company', 'Company name', 'company')}
//         </View>

//         <View style={styles.row}>
//           {renderInput('Phone', 'Phone number', 'phone', 'numeric')}
//           {renderInput('Email', 'Email address', 'email', 'email-address')}
//         </View>

//         <View style={styles.row}>
//           {renderInput('Source', 'Lead source', 'source')}
//           {renderInput('Deal Value', 'Amount', 'dealValue', 'numeric')}
//         </View>

//         {renderInput('Status', 'Lead status', 'status')}
//         {renderInput('Notes', 'Write notes', 'notes', 'default', true)}

//         <Pressable style={styles.button} onPress={submit}>
//           <Text style={styles.btnText}>Create Lead</Text>
//         </Pressable>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

/* ---------- STYLES ---------- */

//using api calls
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';

export default function CreateLeadScreen({ onBack, onSubmit }) {
  const [focused, setFocused] = useState('');
  const [loading, setLoading] = useState(false); // ✅ ADDED

  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    source: '',
    dealValue: '',
    status: '',
    notes: '',
  });

  const onChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    return Object.values(form).every(v => v.trim() !== '');
  };

  // ✅ ADDED: API FUNCTION
  const createLeadAPI = async (payload) => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts', // replace with real API
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error('API failed');
    }

    return response.json();
  };

  const submit = async () => {
    if (!validate()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      setLoading(true); // ✅ ADDED

      // ✅ ADDED: API CALL
      await createLeadAPI(form);

      onSubmit && onSubmit(form); // EXISTING
      Alert.alert('Success', 'Lead created successfully');

      setForm({
        name: '',
        company: '',
        phone: '',
        email: '',
        source: '',
        dealValue: '',
        status: '',
        notes: '',
      });
    } catch (e) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false); // ✅ ADDED
    }
  };

  const renderInput = (
    label,
    placeholder,
    key,
    keyboard = 'default',
    multiline = false
  ) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={form[key]}
        placeholder={placeholder}
        placeholderTextColor="#64748b"
        keyboardType={keyboard}
        multiline={multiline}
        onChangeText={v => onChange(key, v)}
        onFocus={() => setFocused(key)}
        onBlur={() => setFocused('')}
        style={[
          styles.input,
          multiline && styles.textArea,
          focused === key && styles.focused,
        ]}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.safe, { paddingTop: 80 }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Pressable onPress={onBack}>
            <Text style={styles.back}>← Back</Text>
          </Pressable>
          <Text style={styles.header}>Create Lead</Text>
        </View>

        <View style={styles.row}>
          {renderInput('Name', 'Enter name', 'name')}
          {renderInput('Company', 'Company name', 'company')}
        </View>

        <View style={styles.row}>
          {renderInput('Phone', 'Phone number', 'phone', 'numeric')}
          {renderInput('Email', 'Email address', 'email', 'email-address')}
        </View>

        <View style={styles.row}>
          {renderInput('Source', 'Lead source', 'source')}
          {renderInput('Deal Value', 'Amount', 'dealValue', 'numeric')}
        </View>

        {renderInput('Status', 'Lead status', 'status')}
        {renderInput('Notes', 'Write notes', 'notes', 'default', true)}

        <Pressable style={styles.button} onPress={submit} disabled={loading}>
          <Text style={styles.btnText}>
            {loading ? 'Creating...' : 'Create Lead'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

/* STYLES — UNCHANGED */


const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#020617',
  },
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  headerRow: {
    marginBottom: 20,
  },
  back: {
    color: '#60a5fa',
    marginBottom: 6,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  field: {
    flex: 1,
    marginBottom: 14,
  },
  label: {
    marginBottom: 6,
    color: '#94a3b8',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#1e293b',
    backgroundColor: '#020617',
    padding: 12,
    borderRadius: 10,
    color: '#fff',
  },
  focused: {
    borderColor: '#2563eb',
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
});
