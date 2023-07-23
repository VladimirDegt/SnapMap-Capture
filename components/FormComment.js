import { useState } from 'react';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { TextInput } from 'react-native-gesture-handler';
import { auth } from '../config';
import { EvilIcons } from '@expo/vector-icons';
import { updateDataInFirestore } from '../utils/db';
import { formatDateTime } from '../utils/formatDate';

export const FormComment = ({ closeModal, idPost }) => {
  const navigation = useNavigation();
  const [textAreaFocus, setTextAreaFocus] = useState(false);

  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const user = auth.currentUser;

  const initialValue = {
    textArea: '',
  };

  const currentDate = new Date();
  const formattedDate = formatDateTime(currentDate);

  const handleSubmit = async values => {
    try {
      const newComment = {
        author: user.displayName,
        date: formattedDate,
        text: values.textArea,
      };
      await updateDataInFirestore(idPost, newComment);
      navigation.navigate('Comments', { idPost });
      closeModal();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.rectangle}>
          <Text style={styles.title}>Коментар</Text>
          <TouchableOpacity
            style={styles.iconClose}
            onPress={() => closeModal()}
          >
            <EvilIcons name="close-o" size={32} color="black" />
          </TouchableOpacity>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <Formik
              initialValues={initialValue}
              onSubmit={values => handleSubmit(values)}
            >
              {({ handleChange, handleSubmit, values }) => (
                <View>
                  <TextInput
                    style={[
                      styles.input,
                      textAreaFocus && styles.inputFocused,
                      { height: 3 * 20 },
                    ]}
                    value={values.textArea}
                    placeholder="Залишити коментар"
                    onChangeText={handleChange('textArea')}
                    onFocus={() => setTextAreaFocus(true)}
                    onBlur={() => setTextAreaFocus(false)}
                    multiline={true}
                    numberOfLines={3}
                  />
                  <>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSubmit}
                    >
                      <Text style={styles.buttonText}>Відправити</Text>
                    </TouchableOpacity>
                  </>
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
    position: 'absolute',
    top: '35%',
    transform: [{ translateY: -50 }],
    width: '100%',
    marginLeft: 16,
  },
  framePhoto: {
    width: 132,
    height: 120,
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
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
    borderRadius: 25,
    backgroundColor: '#E5E5E5',
  },
  title: {
    marginTop: 32,
    marginBottom: 32,
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Roboto_500Medium',
    color: '#212121',
  },
  iconClose: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  input: {
    height: 50,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#F6F6F6',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    overflow: 'scroll',
  },
  inputFocused: {
    borderWidth: 1,
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF',
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
    marginBottom: 24,
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
});
