import { Redirect } from 'expo-router';
import { View, Text } from 'react-native';

export default function Index() {
  // Redirection vers la page de connexion
  return (
    <View>
      <Redirect href="/LoginScreen" />
    </View>
  );
}