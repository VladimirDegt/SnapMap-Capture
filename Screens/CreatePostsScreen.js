import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
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
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { writeDataToFirestore } from '../utils/db';
import { selectEmail, selectLogin } from '../redux/selectors';

export const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const [nameFocus, setNameFocus] = useState(false);
  const [regionFocus, setRegionFocus] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState('');
  const [hasPermission, setHasPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationReady, setLocationReady] = useState(false);
  const login = useSelector(selectLogin);
  const email = useSelector(selectEmail);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
      setLocationReady(true);
    })();
  }, []);

  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!fontsLoaded) {
    return null;
  }

  const initialValue = {
    name: '',
    region: '',
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const handleDelete = () => {
    setPhoto('');
    setLocation(null);
    setNameFocus(false);
    setRegionFocus(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerPhoto}>
        <View style={styles.photo}>
          <Camera style={styles.camera} ref={setCamera}>
            {photo && (
              <View style={styles.takePhotoContainer}>
                <Image
                  source={{ uri: photo }}
                  style={{ height: 100, width: 100 }}
                />
              </View>
            )}
            <TouchableOpacity style={styles.containerIcon} onPress={takePhoto}>
              <FontAwesome name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
        </View>
        <Text style={styles.textUnderPhoto}>Завантажте фото</Text>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.rectangle}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <Formik
              initialValues={initialValue}
              onSubmit={async (values, { resetForm }) => {
                if (!locationReady) {
                  console.log('Location data is not ready yet');
                  return;
                }
                const nameLocation = values;
                await writeDataToFirestore(
                  nameLocation,
                  location,
                  photo,
                  login,
                  email
                );
                resetForm();
                navigation.navigate('PostsScreen', {newPost: true});
              }}
            >
              {({ handleChange, handleSubmit, values }) => (
                <View>
                  <TextInput
                    style={[styles.input, nameFocus && styles.inputFocused]}
                    value={values.name}
                    placeholder="Назва..."
                    onChangeText={handleChange('name')}
                    onFocus={() => setNameFocus(true)}
                    onBlur={() => setNameFocus(false)}
                  />
                  <View style={styles.containerInput}>
                    <TextInput
                      style={[
                        styles.inputRegion,
                        regionFocus && styles.inputFocused,
                      ]}
                      value={values.region}
                      placeholder="Місцевість..."
                      onChangeText={handleChange('region')}
                      onFocus={() => setRegionFocus(true)}
                      onBlur={() => setRegionFocus(false)}
                    />
                    <TouchableOpacity style={styles.iconLocation}>
                      <EvilIcons name="location" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      location && photo && styles.buttonActive,
                    ]}
                    onPress={handleSubmit}
                    disabled={!photo}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        location && photo && styles.buttonTextActive,
                      ]}
                    >
                      Опублікувати
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity style={styles.iconDelete} onPress={handleDelete}>
        <AntDesign name="delete" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    backgroundColor: '#FFFFFF',
  },
  containerPhoto: {
    marginBottom: 32,
  },
  photo: {
    height: 240,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    marginBottom: 8,
  },
  camera: {
    flex: 1,
  },
  containerIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
    marginBottom: 90,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
  },
  takePhotoContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderColor: '#ffffff',
    borderWidth: 1,
  },
  textUnderPhoto: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    color: '#BDBDBD',
  },
  rectanglePhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
  },
  input: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 8,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    borderRadius: 8,
  },
  inputRegion: {
    paddingTop: 16,
    paddingLeft: 28,
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
    borderRadius: 8,
  },
  inputFocused: {
    borderWidth: 1,
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF',
  },
  containerInput: {
    position: 'relative',
  },
  iconLocation: {
    position: 'absolute',
    top: 22,
  },
  button: {
    marginTop: 16,
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#F6F6F6',
  },
  buttonActive: {
    backgroundColor: '#FF6C00',
  },
  buttonText: {
    fontFamily: 'Roboto_400Regular',
    color: '#BDBDBD',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonTextActive: {
    color: '#FFFFFF',
  },
  iconDelete: {
    width: 70,
    height: 40,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 23,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
  },
});
