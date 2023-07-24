import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { useSelector } from 'react-redux';
import { selectLogin } from '../redux/selectors';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { getDataFromFirestore } from '../utils/db';
import { authStateChanged } from '../utils/auth';
import { auth } from '../config';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const login = useSelector(selectLogin);
  const [getPosts, setGetPosts] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getDataFromFirestore();
      const filterPostsLogin = posts.filter(item => item.login === login);
      setGetPosts(filterPostsLogin);
    };

    fetchData();
  }, []);

  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLocation = (e, location) => {
    navigation.navigate('Map', { location });
  };

  const handleCommentAdd = (e, id) => {
    navigation.navigate('Comments', { id });
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
            <TouchableOpacity onPress={handleSignOut}>
              <Image
                source={require('../assets/log-out.png')}
                style={styles.logOutBtn}
              />
            </TouchableOpacity>
            <Text style={styles.title}>{login}</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            ></KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>

      <ScrollView style={styles.containerPost}>
        {getPosts &&
          getPosts.map(
            ({ id, location, nameLocation, photo, comments, login, email }) => {
              return (
                <View key={id}>
                  <View style={styles.photo}>
                    <Image
                      source={{ uri: photo }}
                      style={{ height: '100%', width: '100%' }}
                    />
                  </View>
                  <Text style={styles.nameLocation}>{nameLocation?.name}</Text>
                  <View style={styles.containerDetailsRow}>
                    <View style={styles.containerComments}>
                      <TouchableOpacity
                        style={styles.containerIconComment}
                        onPress={e => handleCommentAdd(e, id)}
                      >
                        <FontAwesome
                          name="comment-o"
                          size={24}
                          color={ comments && comments.length > 0 ? 'red' : '#BDBDBD'}
                        />
                      </TouchableOpacity>
                      <Text style={styles.textComment}>{comments && comments.length}</Text>
                    </View>
                    <View >
                      <TouchableOpacity
                        style={styles.containerLocation}
                        onPress={e => handleLocation(e, location)}
                      >
                        <EvilIcons name="location" size={24} color="#BDBDBD" />
                      <Text style={styles.textLocation}>
                        {nameLocation?.region}
                      </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }
          )}
      </ScrollView>
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
    marginTop: 147,
    backgroundColor: '#FFFFFF',
    // borderTopRightRadius: 25, 
    // borderTopLeftRadius: 25,
    borderRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,

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
  logOutBtn: {
    position: 'absolute',
    top: 22,
    right: 0,
    width: 24,
    height: 24,
  },
  rectangle: {
    width: '100%',
    position: 'relative',
    paddingLeft: 16,
    paddingRight: 16,
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
  user: {
    alignItems: 'flex-start',
  },
  nameUser: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Roboto_700Bold',
    color: '#212121',
  },
  emailUser: {
    fontSize: 11,
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
    color: '#212121',
  },
  containerPost: {
    height: 420,
    gap: 8,
  },
  photo: {
    width: '100%',
    height: 240,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  nameLocation: {
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
    color: '#212121',
  },
  containerDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  containerComments: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  containerIconComment: {
    width: 24,
    height: 24,
    color: 'red',
  },
  textComment: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    color: '#BDBDBD',
  },
  containerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  textLocation: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    color: '#212121',
  },
});
