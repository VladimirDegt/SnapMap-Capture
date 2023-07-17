import { Image, Text, View, StyleSheet } from "react-native";
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { useRoute } from "@react-navigation/native";

export const PostsScreen = () => {
  const route = useRoute();
  const { values, nameLocation, photo, location } = route.params;
  console.log('location', location);
  console.log('photo', photo);
  console.log('nameLocation', nameLocation);

  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.containerPost}>
      <Image
        source={require("../assets/PhotoUser.jpg")}
        style={styles.photoUser}
      />
      <View style={styles.containerUser}>
        <Text style={styles.nameUser}>
          {values.login ? values.login : "Ім'я прийде з бекенду"}
        </Text>
        <Text style={styles.emailUser}>{values.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPost: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: 32,
    paddingLeft: 16,
    gap: 8,
    backgroundColor: "#FFFFFF",
  },
  photoUser: {
    borderRadius: 16,
    width: 60,
    height: 60,
  },
  containerUser: {
    flex: 1,
    alignItems: "flex-start",
  },
  nameUser: {
    fontSize: 13,
    textAlign: "center",
    fontFamily: "Roboto_700Bold",
    color: "#212121",
  },
  emailUser: {
    fontSize: 11,
    textAlign: "center",
    fontFamily: "Roboto_400Regular",
    color: "#212121",
  },
});
