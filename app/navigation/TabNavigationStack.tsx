import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from 'screens/HomeScreen/HomeScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SWTabBar from 'components/blocks/TabBar/TabBar';
import {StyleSheet} from 'react-native';
import {NORMAL_TOKEN_KEY, ROLE, SCREENS, TOKEN_KEY} from 'constants/constants';

import Abonoment from 'screens/Abonoment/Abonoment';
import LadyQR from 'screens/LadyQR/LadyQR';
import ProfileScreen from 'screens/Profile';
import Clients from 'screens/Admin/screens/Clients';
import QRScreen from 'screens/Admin/screens/QRcodeScreen/QRScreen';
import TasksScreen from 'screens/Admin/screens/Tasks/TasksScreen';
import Reiting from 'screens/Admin/screens/Reiting';
import {storageReadItem} from 'utils/asyncStorage';
import {useEffect, useState} from 'react';
import Personal from 'screens/Admin/screens/Personal/Personal';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    storageReadItem(NORMAL_TOKEN_KEY).then(token => {
      setUserRole(token?.role);
    });
  }, []);

  return (
    <Tab.Navigator
      sceneContainerStyle={styles.tabBarContainerStyle}
      screenOptions={{headerShown: false, tabBarShowLabel: true}}
      tabBar={props => <SWTabBar {...props} />}>
      {userRole == 'USER' ? (
        <>
          <Tab.Screen
            name="Hometab"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Главная',
              tabBarIcon: ({color, size}) => (
                <MaterialIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="AddSecretTab"
            component={Abonoment}
            options={{
              tabBarLabel: 'Абонементы',
              tabBarIcon: ({color, size}) => (
                <MaterialIcons
                  name="fitness-center"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Contacts"
            component={LadyQR}
            options={{
              tabBarLabel: 'Lady QR',
              tabBarIcon: ({color, size}) => (
                <Ionicons name="scan" color={color} size={size} />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Clients"
            component={Clients}
            options={{
              tabBarLabel: SCREENS.ADMIN_CLIENTS,
              tabBarIcon: ({color, size}) => (
                <Ionicons
                  name="document-text-sharp"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          {userRole === 'TOP' && (
            <Tab.Screen
              name="PERSONAL"
              component={Personal}
              options={{
                tabBarLabel: SCREENS.ADMIN_PERSONAL,
                tabBarIcon: ({color, size}) => (
                  <Ionicons name="people" color={color} size={size} />
                ),
              }}
            />
          )}
          {userRole === 'MANAGER' && (
            <Tab.Screen
              name="adminqr"
              component={QRScreen}
              options={{
                tabBarLabel: SCREENS.ADMIN_QR,
                tabBarIcon: ({color, size}) => (
                  <Ionicons name="scan" color={color} size={size} />
                ),
              }}
            />
          )}
          {(userRole === 'ADMIN' || userRole === 'TRAINER') && (
            <Tab.Screen
              name="adminqr"
              component={QRScreen}
              options={{
                tabBarLabel: SCREENS.ADMIN_QR,
                tabBarIcon: ({color, size}) => (
                  <Ionicons name="scan" color={color} size={size} />
                ),
              }}
            />
          )}
          {userRole === 'TRAINER' && (
            <Tab.Screen
              name="stars"
              component={Reiting}
              options={{
                tabBarLabel: SCREENS.ADMIN_REITING,
                tabBarIcon: ({color, size}) => (
                  <Ionicons name="star" color={color} size={size} />
                ),
              }}
            />
          )}
          <Tab.Screen
            name="tasks"
            component={TasksScreen}
            options={{
              tabBarLabel: SCREENS.ADMIN_TASKS,
              tabBarIcon: ({color, size}) => (
                <Ionicons name="clipboard" color={color} size={size} />
              ),
            }}
          />
        </>
      )}
      <Tab.Screen
        name="support"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  stackStyle: {
    backgroundColor: 'transparent',
  },
  tabBarContainerStyle: {
    backgroundColor: 'transparent',
  },
});
