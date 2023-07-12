import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { FormRegistr } from "./components/FormRegistr";
import { FormLogin } from "./components/FormLogin";
import { Home } from "./components/Home";
import { Button } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen name="Registration" component={FormRegistr} />
        <MainStack.Screen name="Login" component={FormLogin} />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Публікації",
            headerTintColor: "#212121",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "medium",
              fontSize: 17,
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => console.log("Logout")}>
                <Image
                  source={require("./assets/log-out.png")}
                  style={styles.logOutBtn}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  logOutBtn: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});
