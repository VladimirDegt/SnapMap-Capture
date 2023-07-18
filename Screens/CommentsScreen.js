import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

export const CommentsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { photo } = route.params;

  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Коментарі</Text>
      </View>

      <View style={styles.photo}>
        <Image
          source={{ uri: photo }}
          style={{ height: '100%', width: '100%' }}
        />
      </View>
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
});
