import { Formik, setNestedObjectValues } from "formik";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";

export const FormRegistr = ( props) => {

  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const initialValue = {
    login: "",
    email: "",
    password: "",
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.rectangle}>
        <View style={styles.framePhoto}>
          <View style={styles.rectanglePhoto} />
          <Image source={require("../assets/add.png")} style={styles.addPng} />
        </View>
        <Text style={styles.title}>Реєстрація</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <Formik initialValues={initialValue} onSubmit={values => console.log(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <View>
                <TextInput
                  style={styles.input}
                  value={values.login}
                  placeholder="Логін"
                  onChangeText={handleChange("login")}
                />
                <TextInput
                  style={styles.input}
                  value={values.email}
                  placeholder="Адреса електронної пошти"
                  onChangeText={handleChange("email")}
                />
                <View style={styles.containerInput}>
                  <TextInput
                    style={styles.input}
                    value={values.password}
                    secureTextEntry
                    placeholder="Пароль"
                    onChangeText={handleChange("password")}
                  />
                  <Text style={styles.textInInput}>Показати</Text>
                </View>
                <>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Зареєструватися</Text>
                  </TouchableOpacity>
                  <Text style={styles.textafterbutton}>
                    Вже є акаунт? Увійти
                  </Text>
                </>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
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
  addDisable: {
    position: "absolute",
    left: 107,
    top: 81,
    width: 25,
    height: 25,
  },
  photoUser: {
    position: "absolute",
    borderRadius: 16,
    width: 120,
    height: 120,
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
    marginTop: 92,
    marginBottom: 32,
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Roboto_500Medium",
    color: "#212121",
  },
  input: {
    height: 50,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
    placeholderTextColor: "#BDBDBD",
  },
  inputActive: {
    borderWidth: 1,
    borderColor: "#FF6C00",
    backgroundColor: "FFFFFF",
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
    marginTop: 16,
    marginBottom: 78,
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
