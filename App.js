import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  View,

} from "react-native";
import { FormRegistr } from "./components/FormRegistr";
import { FormLogin } from "./components/FormLogin";

export default function App() {
  return (
    <ImageBackground
      source={require("./assets/PhotoBG.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* <FormRegistr /> */}
        <FormLogin />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
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
});
