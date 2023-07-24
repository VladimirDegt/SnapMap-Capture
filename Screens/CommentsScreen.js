import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { getDataFromFirestore, updateDataInFirestore } from '../utils/db';
import { formatDateTime } from '../utils/formatDate';
import { useSelector } from 'react-redux';
import { selectLogin } from '../redux/selectors';

export const CommentsScreen = () => {
  const [getIDPosts, setGetIDPosts] = useState('');
  const [textAreaFocus, setTextAreaFocus] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const author = useSelector(selectLogin);
  const { id } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getDataFromFirestore();
      setGetIDPosts(posts.filter(item => item.id === id));
    };
    fetchData();
  }, []);

  useEffect(()=>{
    console.log('ререндер');
  }, [updatePage]);

  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const initialValue = {
    textArea: '',
  };
  const currentDate = new Date();
  const formattedDate = formatDateTime(currentDate);

  const handleSubmit = async (values, resetForm) => {
    if (values.textArea.length < 2) {
      console.log('довжина коментаря замала ');
      return;
    }
    try {
      const newComment = {
        author: author,
        date: formattedDate,
        text: values.textArea,
      };
      await updateDataInFirestore(id, newComment);
      setUpdatePage(prevState => !prevState);
      resetForm();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {getIDPosts && (
        <View>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Feather name="arrow-left" size={24} color="#212121" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Коментарі</Text>
          </View>
          <View style={styles.photo}>
            <Image
              source={{ uri: getIDPosts[0].photo }}
              style={{ height: '100%', width: '100%' }}
            />
          </View>
          <ScrollView style={styles.containerScroll}>
            {getIDPosts[0].comments.map(({ author, date, text }) => {
              return (
                <View style={styles.containerComment} key={date}>
                  <View style={styles.containerName}>
                    <Text>Ім'я:</Text>
                    <Text style={styles.name}>{author}</Text>
                  </View>
                  <View style={styles.containerCommentText}>
                    <Text style={styles.text}>{text}</Text>
                    <Text style={styles.date}>{date}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}

      <View style={styles.containerForm}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          >
            <Formik
              initialValues={initialValue}
              onSubmit={(values, { resetForm }) =>
                handleSubmit(values, resetForm)
              }
            >
              {({ handleChange, handleSubmit, values }) => (
                <View>
                  <TextInput
                    style={[styles.input, textAreaFocus && styles.inputFocused]}
                    value={values.textArea}
                    placeholder="Коментувати..."
                    onChangeText={handleChange('textArea')}
                    onFocus={() => setTextAreaFocus(true)}
                    onBlur={() => setTextAreaFocus(false)}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    <Feather name="arrow-up" size={14} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: screenHeight,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    backgroundColor: '#FFFFFF',
  },
  header: {
    position: 'relative',
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#212121',
  },
  backButton: {
    position: 'absolute',
    top: '50%',
    left: 0,
  },
  headerText: {
    fontFamily: 'Roboto_500Medium',
    fontSize: 17,
    color: '#212121',
  },
  photo: {
    width: '100%',
    height: 240,
    marginTop: 32,
    marginBottom: 32,
    overflow: 'hidden',
    borderRadius: 8,
  },
  containerScroll: {
    height: 350,
  },
  containerComment: {
    width: 280,
    flexDirection: 'row',
    marginBottom: 32,
  },
  containerName: {
    width: 50,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  containerCommentText: {
    width: '100%',
    flexDirection: 'column',
    marginLeft: 16,
    marginBottom: 8,
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#F7F7F7',
  },
  name: {
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
    color: '#212121',
    fontSize: 16,
    textAlign: 'center',
  },
  text: {
    marginBottom: 8,
    fontFamily: 'Roboto_400Regular',
    color: '#212121',
    fontSize: 16,
  },
  date: {
    fontFamily: 'Roboto_400Regular',
    color: '#BDBDBD',
    fontSize: 10,
    textAlign: 'right',
  },
  containerForm: {
    marginTop: 'auto',
    marginBottom: 16,
  },
  input: {
    height: 50,
    marginBottom: 16,
    borderRadius: 100,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
    fontSize: 16,
    fontFamily: 'Roboto_400Regular',
  },
  inputFocused: {
    borderWidth: 1,
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF',
  },
  button: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: '50%',
    backgroundColor: '#FF6C00',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
