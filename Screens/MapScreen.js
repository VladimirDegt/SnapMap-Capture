import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  useFonts,
  Roboto_500Medium,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export const MapScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { location } = route.params;

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
        <Text style={styles.headerText}>Map</Text>
      </View>

      <MapView
        style={styles.mapStyle}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log('Map is ready')}
        onRegionChange={() => console.log('Region change')}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          title="I am here"
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          description="Hello"
        />
      </MapView>
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
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
