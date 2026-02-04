import React, {useState } from 'react';
import { View, StyleSheet} from 'react-native';
import BottomTab from './src/BottomTab';
import Leads from './src/screens/leads/LeadScreen';
import Activity from './src/screens/activity/ActivityScreen';
import Dial from './src/screens/dial/DialScreen';
import CRMs from './src/screens/crm/CRMsScreen';
import Settings from './src/screens/setting/SettingsScreen';

const App = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Leads':
        return <Leads/>;
      case 'Activity':
        return <Activity/>;
        case 'Dial':
          return <Dial/>;
          case 'CRMs':
            return <CRMs/>;
      case 'Settings':
        return <Settings />;
      default:
        return <Leads />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
      <BottomTab activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});
