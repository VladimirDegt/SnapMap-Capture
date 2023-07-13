import { useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "../Screens/PostsScreen";
import { CreatePostsScreen } from "../Screens/CreatePostsScreen";
import { ProfileScreen } from "../Screens/ProfileScreen";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export const Home = () => {
  const {
    params: { values },
  } = useRoute();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerTintColor: "#212121",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "medium",
            fontSize: 17,
          },
          tabBarLabel: () => null,
          headerRight: () => (
            <TouchableOpacity onPress={() => console.log("Logout")}>
              <Image
                source={require("../assets/log-out.png")}
                style={styles.logOutBtn}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={[
                styles.tabIconContainerPosts,
                { backgroundColor: focused ? "#FF6C00" : "#FFFFFF" },
              ]}
            >
              <AntDesign
                name="appstore-o"
                size={24}
                color={focused ? "#FFFFFF" : "#212121"}
              />
            </View>
          ),
        }}
        initialParams={{ values }}
      />
      <Tab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerTintColor: "#212121",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "medium",
            fontSize: 17,
          },
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={[
                styles.tabIconContainerCreate,
                { backgroundColor: focused ? "#FF6C00" : "#FFFFFF" },
              ]}
            >
              <AntDesign
                name="plus"
                size={13}
                color={focused ? "#FFFFFF" : "#212121"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Не зрозуміло що це за екран",
          headerTintColor: "#212121",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "medium",
            fontSize: 17,
          },
          tabBarLabel: () => null,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={[
                styles.tabIconContainerPosts,
                { backgroundColor: focused ? "#FF6C00" : "#FFFFFF" },
              ]}
            >
              <AntDesign
                name="user"
                size={24}
                color={focused ? "#FFFFFF" : "#212121"}
              />
            </View>
          ),
        }}
      />
      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logOutBtn: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  tabIconContainerPosts: {
    width: 40,
    height: 40,
    padding: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  tabIconContainerCreate: {
    width: 70,
    height: 40,
    paddingTop: 13.5,
    paddingBottom: 13.5,
    paddingLeft: 28.5,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
});
