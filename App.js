import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { FormRegistr } from './components/FormRegistr';
import { FormLogin } from './components/FormLogin';
import { Home } from './components/Home';
import { CommentsScreen } from './Screens/CommentsScreen';
import { MapScreen } from './Screens/MapScreen';

const MainStack = createStackNavigator();

export default function App() {
  return (
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
  );
}
