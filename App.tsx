import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import DeatilsScreen from './src/screen/DetailsScreen';
import PaymentsScreen from './src/screen/PaymentsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'slide_from_bottom'}}
        />

        <Stack.Screen
          name="Details"
          component={DeatilsScreen}
          options={{animation: 'slide_from_bottom'}}
        />

        <Stack.Screen
          name="Payments"
          component={PaymentsScreen}
          options={{animation: 'slide_from_bottom'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
