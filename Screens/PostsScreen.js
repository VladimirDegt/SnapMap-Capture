import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { FontAwesome } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { getDataFromFirestore } from '../utils/db';

export const PostsScreen = () => {
  const [getPosts, setGetPosts] = useState('');
  const [getNewPost, setGetNewPost] = useState(false);
  const [getNewComment, setGetNewComment] = useState(false);
  const navigation = useNavigation();

  const {
    params: { newPost, newComment },
  } = useRoute();

  useEffect(() => {
    if (!newPost) {
      return;
    }
    setGetNewPost(true);
  });

  useEffect(() => {
    if (!newComment) {
      return;
    }
    setGetNewComment(newComment);
  });

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getDataFromFirestore();
      setGetPosts(posts);
    };

    fetchData();
  }, [getNewPost, getNewComment]);

  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleLocation = (e, location) => {
    navigation.navigate('Map', { location });
  };

  const handleCommentAdd = (e, id) => {
    navigation.navigate('Comments', { id });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.containerPost}>
        {getPosts &&
          getPosts.map(
            ({ id, location, nameLocation, photo, comments, login, email }) => {
              return (
                <View key={id}>
                  <View style={styles.containerUser}>
                    <Image
                      source={require('../assets/PhotoUser.jpg')}
                      style={styles.photoUser}
                    />
                    <View style={styles.user}>
                      <Text style={styles.nameUser}>{login}</Text>
                      <Text style={styles.emailUser}>{email}</Text>
                    </View>
                  </View>
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
                          color={
                            comments && comments.length > 0 ? 'red' : '#BDBDBD'
                          }
                        />
                      </TouchableOpacity>
                      <Text style={styles.textComment}>
                        {comments && comments.length}
                      </Text>
                    </View>
                    <View>
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
  containerUser: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  photoUser: {
    borderRadius: 16,
    width: 60,
    height: 60,
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
