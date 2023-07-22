import { useState } from 'react';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
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
  ImageBackground,
} from 'react-native';
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { registerDB } from '../utils/auth';
import { updateUserProfile } from '../utils/auth';

export const FormRegistr = () => {
  const [loginFocus, setLoginFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const initialValue = {
    login: '',
    email: '',
    password: '',
  };

  const handleVisiblePassword = () => {
    isVisiblePassword
      ? setIsVisiblePassword(false)
      : setIsVisiblePassword(true);
  };

  return (
    <ImageBackground
      source={require('../assets/PhotoBG.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.rectangle}>
            <View style={styles.framePhoto}>
              <View style={styles.rectanglePhoto} />
              <Image
                source={require('../assets/PhotoUser.jpg')}
                style={styles.photoUser}
              />
              <Image
                source={require('../assets/addDisable.png')}
                style={styles.addDisable}
              />
            </View>
            <Text style={styles.title}>Реєстрація</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
              <Formik
                initialValues={initialValue}
                onSubmit={values => {
                  registerDB(values);
                  updateUserProfile(values.login, '../assets/PhotoUser.jpg');
                  navigation.navigate('Home', { values });
                }}
              >
                {({ handleChange, handleSubmit, values }) => (
                  <View>
                    <TextInput
                      style={[styles.input, loginFocus && styles.inputFocused]}
                      value={values.login}
                      placeholder="Логін"
                      onChangeText={handleChange('login')}
                      onFocus={() => setLoginFocus(true)}
                      onBlur={() => setLoginFocus(false)}
                    />
                    <TextInput
                      style={[styles.input, emailFocus && styles.inputFocused]}
                      value={values.email}
                      placeholder="Адреса електронної пошти"
                      onChangeText={handleChange('email')}
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                    />
                    <View style={styles.containerInput}>
                      <TextInput
                        style={[
                          styles.input,
                          passwordFocus && styles.inputFocused,
                        ]}
                        value={values.password}
                        secureTextEntry={isVisiblePassword}
                        placeholder="Пароль"
                        onChangeText={handleChange('password')}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                      />
                      <TouchableOpacity
                        style={styles.textInInput}
                        onPress={handleVisiblePassword}
                      >
                        <Text>Показати</Text>
                      </TouchableOpacity>
                    </View>
                    <>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                      >
                        <Text style={styles.buttonText}>Зареєструватися</Text>
                      </TouchableOpacity>
                      <View style={styles.rowContainer}>
                        <Text style={styles.textafterbutton}>
                          Вже є акаунт?
                        </Text>
                        <TouchableOpacity
                          onPress={() => navigation.navigate('Login')}
                        >
                          <Text style={styles.linkText}>Увійти</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  </View>
                )}
              </Formik>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  framePhoto: {
    width: 132,
    height: 120,
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  rectanglePhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
  },
  addPng: {
    position: 'absolute',
    left: 107,
    top: 81,
    width: 25,
    height: 25,
  },
  addDisable: {
    position: 'absolute',
    left: 107,
    top: 81,
    width: 25,
    height: 25,
  },
  photoUser: {
    position: 'absolute',
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  rectangle: {
    width: '100%',
    position: 'relative',
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
  },
  title: {
    marginTop: 92,
    marginBottom: 32,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Roboto_500Medium',
    color: '#212121',
  },
  input: {
    height: 50,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#F6F6F6',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
  },
  inputFocused: {
    borderWidth: 1,
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF',
  },
  containerInput: {
    position: 'relative',
  },
  textInInput: {
    position: 'absolute',
    right: 16,
    top: 16,
    color: '#1B4371',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
  },
  button: {
    marginTop: 43,
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#FF6C00',
  },
  buttonText: {
    fontFamily: 'Roboto_400Regular',
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  rowContainer: {
    marginTop: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    gap: 4,
    marginTop: 16,
    marginBottom: 78,
  },
  textafterbutton: {
    color: '#1B4371',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    textAlign: 'center',
  },
  linkText: {
    textDecorationLine: 'underline',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    color: '#1B4371',
  },
});
