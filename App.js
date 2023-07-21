import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { FormRegistr } from './components/FormRegistr';
import { FormLogin } from './components/FormLogin';
import { Home } from './components/Home';
import { CommentsScreen } from './Screens/CommentsScreen';
import { MapScreen } from './Screens/MapScreen';
import { store, persistor } from './redux/store';

const MainStack = createStackNavigator();

export default function App() {
  return (
    // <Provider store={store}>
    //   <PersistGate loading="null" persistor={persistor}>
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Registration"
          component={FormRegistr}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={FormLogin}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
    //   </PersistGate>
    // </Provider>
  );
}
