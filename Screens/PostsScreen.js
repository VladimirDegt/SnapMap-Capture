import { Image, Text, View, StyleSheet } from "react-native";
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

export const PostsScreen = ({ values }) => {
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
        <Text style={styles.nameUser}>{values.login ? values.login : "Поки не відомо"}</Text>
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
    marginLeft: 16,
    marginTop: 32,
    gap: 8,
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
