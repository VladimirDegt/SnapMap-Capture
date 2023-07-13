import { View, Text, StyleSheet } from "react-native";
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { FontAwesome } from "@expo/vector-icons";

export const CreatePostsScreen = () => {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <View style={[styles.containerPhoto, { backgroundColor: "#F6F6F6" }]}>
      <View style={styles.photo}>
        <View style={styles.containerIcon}>
          <FontAwesome name="camera" size={24} color="#BDBDBD" />
        </View>
      </View>
      <Text>Завантажте фото</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPhoto: {
    marginTop: 32,
    marginBottom: 32,
    marginLeft: 16,
    marginRight: 16,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  photo: {
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderColor: "red",
    borderBottomWidth: 1,
  },
  containerIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 90,
    marginBottom: 90,
    marginLeft: "auto",
    marginRight: "auto",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
});