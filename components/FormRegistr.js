import { Formik } from "formik";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export const FormRegistr = () => {
  const initialValue = {
    login: "",
    email: "",
    password: "",
  };

  const handleSubmit = (value) => console.log(value);

  return (

    <View style={styles.rectangle}>
      <Text style={styles.title}>Реєстрація</Text>
      <Formik initialValues={initialValue} onSubmit={handleSubmit}>
        {(props) => (
          <View>
            <TextInput
              style={styles.input}
              value={props.values.login}
              placeholder="Логін"
              onChangeText={props.handleChange("login")}
            />
            <TextInput
              style={styles.input}
              value={props.values.email}
              placeholder="Адреса електронної пошти"
              onChangeText={props.handleChange("email")}
            />
            <TextInput
              style={styles.input}
              value={props.values.password}
              placeholder="Пароль"
              onChangeText={props.handleChange("password")}
            />
            <Button title="Зареєструватися" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
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
