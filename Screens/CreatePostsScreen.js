import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
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
  ImageBackground,
} from "react-native";
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons"; 

export const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const [nameFocus, setNameFocus] = useState(false);
  const [regionFocus, setRegionFocus] = useState(false);
  
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const initialValue = {
    name: "",
    region: "",
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerPhoto}>
        <View style={styles.photo}>
          <View style={styles.containerIcon}>
            <FontAwesome name="camera" size={24} color="#BDBDBD" />
          </View>
        </View>
        <Text style={styles.textUnderPhoto}>Завантажте фото</Text>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.rectangle}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <Formik
              initialValues={initialValue}
              onSubmit={(values) => {
                navigation.navigate("Home", { values });
              }}
            >
              {({ handleChange, handleSubmit, values }) => (
                <View>
                  <TextInput
                    style={[styles.input, nameFocus && styles.inputFocused]}
                    value={values.name}
                    placeholder="Назва..."
                    onChangeText={handleChange("name")}
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                  />
                  <View style={styles.containerInput}>
                    <TextInput
                      style={[styles.input, regionFocus && styles.inputFocused]}
                      value={values.region}
                      placeholder="Місцевість..."
                      onChangeText={handleChange("region")}
                      onFocus={() => setRegionFocus(true)}
                      onBlur={() => setRegionFocus(false)}
                    />
                    <TouchableOpacity
                      style={styles.textInInput}
                      // onPress={handleVisiblePassword}
                    >
                      <EvilIcons name="location" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Опублікувати</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    backgroundColor: "#FFFFFF",
  },
  containerPhoto: {
    marginBottom: 32,
  },
  photo: {
    height: 240,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    marginBottom: 8,
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
  textUnderPhoto: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  rectanglePhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  input: {
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
    placeholderTextColor: "#BDBDBD",
  },
  inputFocused: {
    borderWidth: 1,
    borderColor: "#FF6C00",
    backgroundColor: "FFFFFF",
  },
  containerInput: {
    position: "relative",
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
});
