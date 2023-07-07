import { useState } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

const LoginScreen = () => {
  const [inputValueEmail, setInputValueEmail] = useState("");
  const [inputValuePassword, setInputValuePassword] = useState("");
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleRegisterPress = () => {
    Linking.openURL("https://your-registration-page.com");
  };

  const handleTextInputEmailChange = (e) => {
    setInputValueEmail(e);
  };
  const handleTextInputPasswordChange = (e) => {
    setInputValuePassword(e);
  };
  return (
    
    <View style={styles.rectangle}>
      <Text style={styles.title}>Увійти</Text>

      <TextInput
        style={styles.input}
        placeholder="Адреса електронної пошти"
        onChangeText={handleTextInputEmailChange}
      />
      <View style={styles.containerInput}>
        <TextInput
          style={styles.inputDot}
          secureTextEntry
          onChangeText={handleTextInputPasswordChange}
        />
        <Text style={styles.textInInput}>Показати</Text>
      </View>

      {inputValueEmail === "" && inputValuePassword === "" && (
        <>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Увійти</Text>
          </TouchableOpacity>
          <View style={styles.rowContainer}>
            <Text style={styles.textafterbutton}>Немає акаунту?</Text>
            <TouchableOpacity onPress={handleRegisterPress}>
              <Text style={styles.linkText}>Зареєструватися</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={styles.line} />
    </View>

  );
};

const styles = StyleSheet.create({
  framePhoto: {
    width: 132,
    height: 120,
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  rectanglePhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  addPng: {
    position: "absolute",
    left: 107,
    top: 81,
    width: 25,
    height: 25,
  },
  rectangle: {
    width: "100%",
    position: "relative",
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "white",
  },
  title: {
    marginTop: 32,
    marginBottom: 32,
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Roboto_500Medium",
    color: "#212121",
  },
  input: {
    height: 50,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
    placeholderTextColor: "#BDBDBD",
  },
  inputDot: {
    height: 50,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    fontSize: 15,
    fontFamily: "Roboto_400Regular",
    placeholderTextColor: "#212121",
  },
  containerInput: {
    position: "relative",
  },
  textInInput: {
    position: "absolute",
    right: 16,
    top: 16,
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
  },
  button: {
    marginTop: 43,
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    fontFamily: "Roboto_400Regular",
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  textafterbutton: {
    color: "#1B4371",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    textAlign: "center",
  },
  linkText: {
    textDecorationLine: "underline",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#1B4371",
  },
  rowContainer: {
    marginTop: 16,
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    gap: 4,
  },
  line: {
    width: 134,
    height: 5,
    marginTop: 66,
    marginBottom: 8,
    backgroundColor: "#212121",
    borderColor: "#979797",
    borderRadius: 100,
    marginLeft: 121,
  },
});

export default LoginScreen;
